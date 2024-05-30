# galaxy oracle deployer app

Deploy galaxy-oracle TEE dapps with secretly generated oracle value signer.

## non TEE image

### build

```sh
docker build . -t pierreiexec/galaxy-oracle-deployer-dapp:0.0.1
```

### test

```sh
docker run -v $PWD/iexec_out:/iexec_out -e IEXEC_OUT=/iexec_out --rm pierreiexec/galaxy-oracle-deployer-dapp:0.0.1 <oracleCid> <ownerAddress>
```

### some example of oracleCid

- Math.random() : QmZaSDeni45cfqMc9V8VzJcKtPxp1LMGDysRQdN9wEjAJm
- random boolean : QmdHDQZ7jbyysgPs4SUmn6v4nJwUR3JRLsBncoKuhjT5Xk
- hello-world : QmNt92EUUGHKFsBg58BQGNJ8WSDSdsvKmySSmVvCvX4WAt
- Bigint(42) : QmdHDQZ7jbyysgPs4SUmn6v4nJwUR3JRLsBncoKuhjT5Xk

## TEE image

### build

```sh
sh sconify.sh
```

### test TEE

```sh
docker run -v $PWD/iexec_out:/iexec_out -e IEXEC_OUT=/iexec_out --rm pierreiexec/galaxy-oracle-deployer-dapp:0.0.1 <oracleCid> <ownerAddress>
```

## deployed

docker

- image: "pierreiexec/galaxy-oracle-deployer-dapp:0.0.1-scone-5.7.6-v15-debug"
- checksum: "0xb8da3268d7853034addbecc6125e354068bb20c0e30d38cac3f4cc4158e089ac"
- mrenclave.fingerprint: "9b0fc40be18e56cd3d73be6e8fa765ee1738eed346266a1989ecc17a74b88713"
- entrypoint: "node /app/src/deployer.js"

deployed apps

- app:
