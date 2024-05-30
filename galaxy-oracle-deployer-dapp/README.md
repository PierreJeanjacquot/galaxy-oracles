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
- checksum: "0xfb5f878941e46781d0e8e7c840c2984c64fceefeca4861a1987b6a65adba378d"
- mrenclave.fingerprint: "0840b3373aff4d937dcc2d556bfb3a8f0d9afe9ebf4f5fc09e223da86122490d"
- entrypoint: "node /app/src/deployer.js"

deployed app

- app: [galaxy-oracle-deployer.apps.iexec.eth](https://explorer.iex.ec/bellecour/search/galaxy-oracle-deployer.apps.iexec.eth)
