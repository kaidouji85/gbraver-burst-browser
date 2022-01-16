#!/bin/sh

if [ $# != 2 ]; then
  echo 'invalid param'
  exit 1
fi

S3_BUCKET=$1
DISTRIBUTION_ID=$2
OWN_PATH=`cd $(dirname ${0}) && pwd`

npm run build:production
"${OWN_PATH}/upload-module.sh" "${S3_BUCKET}"
"${OWN_PATH}/clear-cdn.sh" "${DISTRIBUTION_ID}"
