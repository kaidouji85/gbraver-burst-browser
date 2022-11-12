#!/bin/bash
set -Ceu
cd "$(dirname "${0}")"

if [ $# != 1 ]; then
  echo 'invalid param'
  exit 1
fi

S3_BUCKET=$1
BUILD_PATH=./build/production

find "${BUILD_PATH}" -maxdepth 1 -type f -print0 | while IFS= read -r -d '' filePath; do
  s3FileName=$(basename "${filePath}")
  aws s3 cp --cache-control no-store "${filePath}" "s3://${S3_BUCKET}/${s3FileName}"
done
aws s3 sync --delete --exact-timestamps "${BUILD_PATH}" "s3://${S3_BUCKET}"
