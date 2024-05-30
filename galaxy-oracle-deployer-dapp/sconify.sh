#!/bin/bash

IMG_NAME=pierreiexec/galaxy-oracle-deployer-dapp
APP_VERSION="0.0.1"
SCONIFY_VERSION="5.7.6-v15"

# Declare the app entrypoint
ENTRYPOINT="node /app/src/deployer.js"

# Declare image related variables
IMG_FROM=${IMG_NAME}:${APP_VERSION}
IMG_TO=${IMG_NAME}:${APP_VERSION}-scone-${SCONIFY_VERSION}-debug

docker pull registry.scontain.com/sconecuratedimages/node:14.4.0-alpine3.11

# Run the sconifier to build the TEE image based on the non-TEE image
docker run -it --rm \
            -v /var/run/docker.sock:/var/run/docker.sock \
            registry.scontain.com/scone-production/iexec-sconify-image:${SCONIFY_VERSION} \
            sconify_iexec \
            --name=${IMG_NAME} \
            --from=${IMG_FROM} \
            --to=${IMG_TO} \
            --binary-fs \
            --fs-dir=/app \
            --host-path=/etc/hosts \
            --host-path=/etc/resolv.conf \
            --binary=/usr/local/bin/node \
            --heap=1G \
            --dlopen=1 \
            --no-color \
            --verbose \
            --command=${ENTRYPOINT} \
            && echo -e "\n------------------\n" \
            && echo "successfully built TEE docker image => ${IMG_TO}" \
            && echo "application mrenclave.fingerprint is $(docker run --rm -e SCONE_HASH=1 ${IMG_TO})"
