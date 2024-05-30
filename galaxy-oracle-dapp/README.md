# galaxy oracle app

## non TEE image

### build

```sh
docker build . -t pierreiexec/galaxy-oracle-dapp:0.0.1
```

### test

```sh
docker run -v $PWD/iexec_out:/iexec_out -e IEXEC_OUT=/iexec_out -e IEXEC_APP_DEVELOPER_SECRET='{"oracleCid":"QmUavzJrXy5TdykA6mZaH1eKQNtpfB8DQv1DTX17PJvwFW","signer":"0x564a9db84969c8159f7aa3d5393c5ecd014fce6a375842a45b12af6677b12407"}' --rm pierreiexec/galaxy-oracle-dapp:0.0.1
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
docker run -v $PWD/iexec_out:/iexec_out -e IEXEC_OUT=/iexec_out -e IEXEC_APP_DEVELOPER_SECRET='{"oracleCid":"QmUavzJrXy5TdykA6mZaH1eKQNtpfB8DQv1DTX17PJvwFW","signer":"0x564a9db84969c8159f7aa3d5393c5ecd014fce6a375842a45b12af6677b12407"}' --rm pierreiexec/galaxy-oracle-dapp:0.0.1
```

## deployed

docker

- image: "pierreiexec/galaxy-oracle-dapp:0.0.1-scone-5.7.6-v15-debug"
- checksum: "0x0e264fd15d5bc0e478873c1ae79110fb931f1fc6eb2976b1f7a6f29f59d24e56"
- mrenclave.fingerprint: "21249ffc08c379a3c5f950fd009f51de3c10896ccdaa079291a270db6eac2d7f"
- entrypoint: "node /app/src/oracle.js"

deployed apps

- app: 0x26c0e4bb2f52c6650f07ea16f0022bbe2c0938c9
