#!/bin/sh

DISTRIBUTION_ID=$1
BUILD_PATH="./build/production"

for file_name in `ls -F ${BUILD_PATH} | grep -v / `; do
  aws cloudfront create-invalidation --distribution-id ${DISTRIBUTION_ID} --paths "/${file_name}"
done
