#!/bin/sh

if [ $# != 1 ]; then
  echo 'invalid param'
  exit 1
fi

S3_BUCKET=$1
OWN_PATH=`cd $(dirname ${0}) && pwd`
BUILD_PATH="${OWN_PATH}/build/production"

for fileName in `ls -F "${BUILD_PATH}" | grep -v / `; do
  aws s3 cp --cache-control "no-store" "${BUILD_PATH}/${fileName}" "s3://${S3_BUCKET}/${fileName}"
done
aws s3 sync --delete --exact-timestamps "${BUILD_PATH}" "s3://${S3_BUCKET}"
