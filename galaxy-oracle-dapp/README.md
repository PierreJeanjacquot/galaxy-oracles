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
- checksum: "0x45c5706c8bec1c23728fe15db32965539706b8488114d0293c2c5a25d094b0a5"
- mrenclave.fingerprint: "ec9bfb70ea35451e94f4de8d092f2042a712721d3dbc3fa449c8d5d8bd38240e"
- entrypoint: "node /app/src/oracle.js"

deployed apps

- app:
