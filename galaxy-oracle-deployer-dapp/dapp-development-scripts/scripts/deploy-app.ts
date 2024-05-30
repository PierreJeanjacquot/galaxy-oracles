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
      "4fd1222882036ac08c2f734b41fdfa3649e608836e8c4f742243a1ee9d9e9ae3", // scone fingerprint (from `docker run --rm -e SCONE_HASH=1 <app-image>`)
  },
  checksum:
    "0x3a090590720baac37c21d5641b5c29e9981244f6d4e9a0f5a7761beff52b1115", // docker image digest (from `docker pull <app-image> | grep "Digest: sha256:" | sed 's/.*sha256:/0x/'`)
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
