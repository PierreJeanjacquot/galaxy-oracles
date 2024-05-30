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

- image: pierreiexec/galaxy-oracle-dapp:0.0.1-scone-5.7.6-v15-debug
- checksum: 0x06518c7dbcf39287725a373e857674934e69577966caf6971e8829dea27c1158
- mrenclave.fingerprint: 46d1fda755e003c5232d5f3d8e577c06f2b283ad36fd2e35d234e08b8ca905da
