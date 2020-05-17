#!/bin/sh

S3_BUCKET=$1
DISTRIBUTION_ID=$2

npm run build:production
./shell/upload-module.sh "${S3_BUCKET}"
./shell/clear-cdn.sh "${DISTRIBUTION_ID}"
