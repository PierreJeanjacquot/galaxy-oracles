const { writeFile } = require("fs/promises");
const { join } = require("path");
const fetch = require("node-fetch");
const { Wallet, utils } = require("ethers");
const { deployApp, transferApp } = require("./iexec-contracts-utils");
const { pushAppSecret } = require("./sms-utils");

async function main() {
  const { IEXEC_OUT } = process.env;

  const oracleCid = process.argv[2];
  const targetOwner = process.argv[3];

  const resultPath = join(IEXEC_OUT, "deployed.json");
  const computedJsonObj = {
    "deterministic-output-path": resultPath,
  };
  await writeFile(
    join(IEXEC_OUT, "computed.json"),
    JSON.stringify(computedJsonObj)
  );

  try {
    if (!oracleCid || !targetOwner) {
      throw Error('Missing required iexec_arg: "<oracleCid> <targetOwner>"');
    }

    const newOwner = utils.getAddress(targetOwner);

    console.log(`Checking content ${oracleCid} on IPFS`);

    await fetch(`https://ipfs.io/ipfs/${oracleCid}`, {
      method: "HEAD",
    })
      .catch((e) => {
        console.error(e);
        throw Error(`Network error while connecting to IPFS`);
      })
      .then((res) => {
        if (!res.ok) {
          throw Error(`Failed to find content ${oracleCid} on IPFS`);
        }
      });

    console.log(`Deploying oracle for ${oracleCid}`);

    const deployerWallet = Wallet.createRandom();
    const signerWallet = Wallet.createRandom(); // secret wallet

    const app = {
      name: `${oracleCid}-${signerWallet.address}`,
      type: "DOCKER",
      owner: deployerWallet.address,
      multiaddr:
        "docker.io/pierreiexec/galaxy-oracle-dapp:0.0.1-scone-5.7.6-v15-debug",
      checksum:
        "0x45c5706c8bec1c23728fe15db32965539706b8488114d0293c2c5a25d094b0a5",
      mrenclave: {
        framework: "SCONE",
        version: "v5",
        entrypoint: "node /app/src/oracle.js",
        heapSize: 1073741824,
        fingerprint:
          "ec9bfb70ea35451e94f4de8d092f2042a712721d3dbc3fa449c8d5d8bd38240e",
      },
    };

    const deployment = await deployApp({ deployerWallet, app }).catch((e) => {
      console.error(e);
      throw Error(`Failed to deploy app: ${e.toString()}`);
    });

    const secret = JSON.stringify({
      oracleCid: oracleCid,
      signer: signerWallet.privateKey,
    });

    await pushAppSecret({
      ownerWallet: deployerWallet,
      appAddress: deployment.address,
      appSecret: secret,
    }).catch((e) => {
      console.error(e);
      throw Error(`Failed to push app secret: ${e.toString()}`);
    });

    const transfer = await transferApp({
      ownerWallet: deployerWallet,
      newOwner,
      appAddress: deployment.address,
    }).catch((e) => {
      console.error(e);
      throw Error(`Failed to transfer app to new owner: ${e.toString()}`);
    });

    const deployed = JSON.stringify(
      {
        deployTx: deployment.txHash,
        transferTx: transfer.txHash,
        address: deployment.address,
        oracleCid: oracleCid,
        deployer: deployment.deployer,
        signer: signerWallet.address,
      },
      null,
      2
    );

    await writeFile(resultPath, deployed);
  } catch (e) {
    console.error(e);
    await writeFile(
      resultPath,
      JSON.stringify(
        {
          error: e.toString(),
        },
        null,
        2
      )
    );
  }
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
