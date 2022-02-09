#!/bin/sh

if [ $# != 3 ]; then
  echo 'invalid param'
  exit 1
fi

S3_BUCKET=$1
DISTRIBUTION_ID=$2
ASSETLINKS_JSON_URI=$3
OWN_PATH=`cd $(dirname ${0}) && pwd`

npm run build:production
aws s3 cp "${ASSETLINKS_JSON_URI}" "${OWN_PATH}/build/production/.well-known/assetlinks.json"
"${OWN_PATH}/upload-module.sh" "${S3_BUCKET}"
"${OWN_PATH}/clear-cdn.sh" "${DISTRIBUTION_ID}"
