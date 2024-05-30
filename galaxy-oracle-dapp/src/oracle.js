const { writeFile } = require("fs/promises");
const { join } = require("path");
const { Wallet, utils } = require("ethers");
const vm = require("vm");
const fetch = require("node-fetch");

async function main() {
  const appSecret = process.env.IEXEC_APP_DEVELOPER_SECRET || "{}";

  const { oracleCid, signer } = JSON.parse(appSecret);

  if (!oracleCid) {
    throw Error("Missing oracleId in app secret");
  }
  if (!signer) {
    throw Error("Missing signer in app secret");
  }

  console.log(`loading oracle code from ${oracleCid}`);
  // fetch oracle code
  const code = await fetch(`http://ipfs.io/ipfs/${oracleCid}`).then((res) =>
    res.text()
  );

  console.log(`running oracle script`);
  // create script
  const script = new vm.Script(code);
  // run in isolated context with fetch
  const context = vm.createContext({ fetch });
  const value = await script.runInContext(context);

  console.log(`got value "${value}" type ${typeof value}`);

  // create signed EIP712 payload from value
  const signerWallet = new Wallet(signer);
  console.log(`signing value with ${signerWallet.address}`);

  let payload = {
    timestamp: Math.floor(Date.now() / 1000), // blockchain timestamp
    payloadType: typeof value,
    value: "", // placeholder to be replaced
    salt: utils.hexlify(utils.randomBytes(32)),
  };

  switch (payload.payloadType) {
    case "boolean":
      payload.value = value ? "0x01" : "0x00";
      break;
    case "string":
      payload.value = utils.hexlify(Buffer.from(value, "utf8"));
      break;
    case "number":
      payload.value = utils.hexlify(Buffer.from(value.toString(), "utf8"));
      break;
    case "bigint":
      payload.value = utils.hexlify(value);
      break;
    default:
      throw Error(`Unsupported oracle value type ${payload.payloadType}`);
  }

  const domain = {
    name: "Galaxy Oracle",
    version: "0.0.1",
  };

  const primaryType = "Payload";

  const types = {
    [primaryType]: [
      { name: "timestamp", type: "uint256" },
      { name: "payloadType", type: "string" },
      { name: "value", type: "bytes" },
      { name: "salt", type: "bytes32" },
    ],
  };

  const sign = await signerWallet._signTypedData(domain, types, payload);

  console.log(`payload ${JSON.stringify(payload, null, 2)}`);

  console.log(`payload sign ${sign}`);

  const { IEXEC_OUT } = process.env;

  const resultPath = join(IEXEC_OUT, "oracle.json");

  await writeFile(
    resultPath,
    JSON.stringify(
      {
        oracleCid,
        value: typeof value === "bigint" ? `${value}n` : value,
        proof: {
          domain,
          payload,
          sign,
        },
        signer: signerWallet.address,
      },
      null,
      2
    )
  );

  await writeFile(
    join(IEXEC_OUT, "computed.json"),
    JSON.stringify({
      "deterministic-output-path": resultPath,
    })
  );
}

main().catch((err) => {
  console.log(err);
  process.exit(1);
});
