const { utils } = require("ethers");
const fetch = require("node-fetch");

const { keccak256, arrayify } = utils;

const SMS_URL = "https://sms.scone-debug.v8-bellecour.iex.ec";

const concatenateAndHash = (...hexaStringArray) => {
  const buffer = Buffer.concat(
    hexaStringArray.map((hexString) => Buffer.from(arrayify(hexString)))
  );
  return keccak256(buffer);
};

const getChallenge = (ownerAddress, secretKey, secretValue) =>
  concatenateAndHash(
    keccak256(Buffer.from("IEXEC_SMS_DOMAIN", "utf8")),
    ownerAddress,
    keccak256(Buffer.from(secretKey, "utf8")),
    keccak256(Buffer.from(secretValue, "utf8"))
  );

const pushAppSecret = async ({ ownerWallet, appAddress, appSecret }) => {
  try {
    const challenge = getChallenge(appAddress, "1", appSecret);
    const auth = await ownerWallet.signMessage(arrayify(challenge));

    await fetch(`${SMS_URL}/apps/${appAddress}/secrets/1`, {
      method: "POST",
      headers: {
        Authorization: auth,
      },
      body: appSecret,
    })
      .catch((e) => {
        console.error(`Failed to reach SMS at ${SMS_URL}`);
        throw e;
      })
      .then((res) => {
        if (!res.ok) {
          throw Error("Push secret rejected");
        }
      });
    console.log(`secret pushed for app ${appAddress}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { pushAppSecret };
