import { IExec, IExecConfigOptions, utils } from "iexec";
// load .env
import "dotenv/config";

const { PRIVATE_KEY, TEE_DEBUG } = process.env;

const options: IExecConfigOptions = {};
let defaultWorkerpool = "prod-v8-bellecour.main.pools.iexec.eth";

if (TEE_DEBUG) {
  console.warn("Using TEE DEBUG mode");
  options.smsURL = "https://sms.scone-debug.v8-bellecour.iex.ec";
  defaultWorkerpool = "debug-v8-bellecour.main.pools.iexec.eth";
}

export const iexec = new IExec(
  {
    ethProvider: utils.getSignerFromPrivateKey(
      "bellecour",
      PRIVATE_KEY as string
    ),
  },
  options
);

export const workerpool = defaultWorkerpool;

// export const app = "0xd4CA56e248CEB2f5DA05ED6dbE8625A87D3c60f6";
// export const app = "0x301f045be906860b8273e4a97bd621d504e92926";
export const app = "0x26c0e4bb2F52C6650F07eA16F0022Bbe2c0938c9";
