// error when importing the full ethers package
const { providers, Contract, utils } = require("ethers");

const { getAddress, hexZeroPad } = utils;
const { JsonRpcProvider } = providers;

const deployApp = async ({ deployerWallet, app }) => {
  console.log(`deploying app ${JSON.stringify(app, null, 2)}`);

  const appRegistry = new Contract(
    "0xB1C52075b276f87b1834919167312221d50c9D16", // AppRegistry
    [
      {
        inputs: [
          { internalType: "address", name: "_appOwner", type: "address" },
          { internalType: "string", name: "_appName", type: "string" },
          { internalType: "string", name: "_appType", type: "string" },
          { internalType: "bytes", name: "_appMultiaddr", type: "bytes" },
          { internalType: "bytes32", name: "_appChecksum", type: "bytes32" },
          { internalType: "bytes", name: "_appMREnclave", type: "bytes" },
        ],
        name: "createApp",
        outputs: [{ internalType: "contract App", name: "", type: "address" }],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
    ],
    deployerWallet.connect(new JsonRpcProvider("https://bellecour.iex.ec"))
  );

  const tx = await appRegistry.createApp(
    app.owner,
    app.name,
    app.type,
    Buffer.from(app.multiaddr),
    app.checksum,
    Buffer.from(JSON.stringify(app.mrenclave)),
    { gasPrice: 0 }
  );

  const receipt = await tx.wait();
  const transferEvent = receipt.events.find(
    (event) => event.event === "Transfer"
  );
  const { tokenId } = transferEvent.args;

  const address = getAddress(hexZeroPad(tokenId, 20));

  console.log(`app deployed at address ${address} (tx: ${tx.hash})`);

  return {
    address,
    owner: app.owner,
    deployer: deployApp.address,
    txHash: tx.hash,
  };
};

const transferApp = async ({ ownerWallet, appAddress, newOwner }) => {
  console.log(`transferring app ${appAddress}`);

  const appRegistry = new Contract(
    "0xB1C52075b276f87b1834919167312221d50c9D16", // AppRegistry
    [
      {
        inputs: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "tokenId", type: "uint256" },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    ownerWallet.connect(new JsonRpcProvider("https://bellecour.iex.ec"))
  );

  const tx = await appRegistry.safeTransferFrom(
    ownerWallet.address,
    newOwner,
    appAddress,
    { gasPrice: 0 }
  );

  await tx.wait();

  console.log(`app ${appAddress} transferred to ${newOwner} (tx: ${tx.hash})`);

  return {
    txHash: tx.hash,
  };
};

module.exports = { deployApp, transferApp };
