const { Wallet } = require("ethers");
const { pushAppSecret } = require("./sms-utils");

const main = async () => {
  try {
    const wallet = new Wallet(
      "0x7dcc004c052f8aeee7e80249c3cca61a80d53f713692a6688633f15cd54e64f9"
    );
    const app = "0xb97B89c0443BbB1cB4EfAB479eB0eFf758E741B9";

    await pushAppSecret({
      ownerWallet: wallet,
      appSecret: "foo",
      appAddress: app,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

main();
