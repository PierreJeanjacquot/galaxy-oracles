import { iexec } from "./config.js";

const ownerAddress = await iexec.wallet.getAddress();

const app = {
  name: "galaxy-oracle-deployer",
  type: "DOCKER", // always "DOCKER"
  owner: ownerAddress,
  multiaddr:
    "docker.io/pierreiexec/galaxy-oracle-deployer-dapp:0.0.1-scone-5.7.6-v15-debug",
  mrenclave: {
    framework: "SCONE",
    version: "v5",
    entrypoint: "node /app/src/deployer.js",
    heapSize: 1073741824,
    fingerprint:
      "0840b3373aff4d937dcc2d556bfb3a8f0d9afe9ebf4f5fc09e223da86122490d", // scone fingerprint (from `docker run --rm -e SCONE_HASH=1 <app-image>`)
  },
  checksum:
    "0xfb5f878941e46781d0e8e7c840c2984c64fceefeca4861a1987b6a65adba378d", // docker image digest (from `docker pull <app-image> | grep "Digest: sha256:" | sed 's/.*sha256:/0x/'`)
};

console.log(`Deploying app: ${JSON.stringify(app, null, 2)}`);

const { address, txHash } = await iexec.app.deployApp(app);

console.log(`Deployed app address: ${address} (tx: ${txHash})`);

await iexec.ens.claimName("galaxy-oracle-deployer", "apps.iexec.eth");

console.log("Configuring ENS");

await iexec.ens.configureResolution(
  "galaxy-oracle-deployer.apps.iexec.eth",
  address
);

console.log("ENS configured");
