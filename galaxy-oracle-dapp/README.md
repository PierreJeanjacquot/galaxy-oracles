# galaxy oracle app

## non TEE image

### build

```sh
docker build . -t pierreiexec/galaxy-oracle-dapp:0.0.1
```

### test

```sh
docker run -v $PWD/iexec_out:/iexec_out -e IEXEC_OUT=/iexec_out -e IEXEC_APP_DEVELOPER_SECRET='{"oracleCid":"QmZaSDeni45cfqMc9V8VzJcKtPxp1LMGDysRQdN9wEjAJm","signer":"0x564a9db84969c8159f7aa3d5393c5ecd014fce6a375842a45b12af6677b12407"}' --rm pierreiexec/galaxy-oracle-dapp:0.0.1
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
docker run -v $PWD/iexec_out:/iexec_out -e IEXEC_OUT=/iexec_out -e IEXEC_APP_DEVELOPER_SECRET='{"oracleCid":"QmZaSDeni45cfqMc9V8VzJcKtPxp1LMGDysRQdN9wEjAJm","signer":"0x564a9db84969c8159f7aa3d5393c5ecd014fce6a375842a45b12af6677b12407"}' --rm pierreiexec/galaxy-oracle-dapp:0.0.1
```

## deployed

docker

- image: "pierreiexec/galaxy-oracle-dapp:0.0.1-scone-5.7.6-v15-debug"
- checksum: "0x1d7060abb1baebac2f389d40afbc39a956b66371615e5f4efa1ef683f84da7ff"
- mrenclave.fingerprint: "3248c7fd2740b527da7f8d3854878b88c534b35b9e2b3507893a3fdc1dffd997"
- entrypoint: "node /app/src/oracle.js"

deployed apps

- 0x341D6f0F9a529A9B254AD956f199995B796FEc87
