import { Wallet } from "ethers";
import { iexec } from "./config.js";

const ownerAddress = await iexec.wallet.getAddress();

const signer =
  "0x564a9db84969c8159f7aa3d5393c5ecd014fce6a375842a45b12af6677b12407";
const oracleCid = "QmZaSDeni45cfqMc9V8VzJcKtPxp1LMGDysRQdN9wEjAJm";

const signerWallet = new Wallet(signer);

const app = {
  name: `${oracleCid}-${signerWallet.address}-test-oracle`,
  type: "DOCKER", // always "DOCKER"
  owner: ownerAddress,
  multiaddr:
    "docker.io/pierreiexec/galaxy-oracle-dapp:0.0.1-scone-5.7.6-v15-debug",
  mrenclave: {
    framework: "SCONE",
    version: "v5",
    entrypoint: "node /app/src/oracle.js",
    heapSize: 1073741824,
    fingerprint:
      "21249ffc08c379a3c5f950fd009f51de3c10896ccdaa079291a270db6eac2d7f", // scone fingerprint (from `docker run --rm -e SCONE_HASH=1 <app-image>`)
  },
  checksum:
    "0x0e264fd15d5bc0e478873c1ae79110fb931f1fc6eb2976b1f7a6f29f59d24e56", // docker image digest (from `docker pull <app-image> | grep "Digest: sha256:" | sed 's/.*sha256:/0x/'`)
};

console.log(`Deploying app: ${JSON.stringify(app, null, 2)}`);

const { address, txHash } = await iexec.app.deployApp(app);

console.log(`Deployed app address: ${address} (tx: ${txHash})`);

// Inject a secret value in the app TEE runtime (this is a one time operation!)

const secret = JSON.stringify({
  oracleCid,
  signer,
});

const isSecretPushed = await iexec.app.pushAppSecret(address, secret);

console.log(`App secret pushed: ${isSecretPushed}`);
