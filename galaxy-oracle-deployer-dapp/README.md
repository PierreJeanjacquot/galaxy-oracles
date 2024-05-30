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
- checksum: "0x3a090590720baac37c21d5641b5c29e9981244f6d4e9a0f5a7761beff52b1115"
- mrenclave.fingerprint: "4fd1222882036ac08c2f734b41fdfa3649e608836e8c4f742243a1ee9d9e9ae3"
- entrypoint: "node /app/src/deployer.js"

deployed app

- app: [galaxy-oracle-deployer.apps.iexec.eth](https://explorer.iex.ec/bellecour/search/galaxy-oracle-deployer.apps.iexec.eth)
