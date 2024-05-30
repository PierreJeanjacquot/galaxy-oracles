const { providers, Contract } = require("ethers");

const { JsonRpcProvider } = providers;

const createVerifierContract = async ({
  deployerWallet,
  oracleSignerAddress,
}) => {
  console.log(`Creating verifier for oracle signer ${oracleSignerAddress}`);

  const verifierFactory = new Contract(
    "0x80a0c36fDcDe3Bf13dbbD8c1317F439D52c6E743",
    [
      {
        inputs: [
          {
            internalType: "address",
            name: "_oracleSigner",
            type: "address",
          },
        ],
        name: "createVerifier",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "verifierAddress",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "oracleSigner",
            type: "address",
          },
        ],
        name: "VerifierDeployed",
        type: "event",
      },
    ],
    deployerWallet.connect(new JsonRpcProvider("https://bellecour.iex.ec"))
  );

  const tx = await verifierFactory.createVerifier(oracleSignerAddress, {
    gasPrice: 0,
  });

  const receipt = await tx.wait();
  const transferEvent = receipt.events.find(
    (event) => event.event === "VerifierDeployed"
  );
  const { verifierAddress } = transferEvent.args;

  console.log(
    `Verifier deployed at address ${verifierAddress} (tx: ${tx.hash})`
  );

  return {
    address: verifierAddress,
    txHash: tx.hash,
  };
};

module.exports = {
  createVerifierContract,
};
