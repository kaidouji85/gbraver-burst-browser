#!/bin/bash

set -Ceu
readonly USAGE="Usage: $0 <S3_BUCKET>"
readonly S3_BUCKET="${1?"${USAGE}"}"
readonly STAGE="${2?"${USAGE}"}"
readonly BUILD_PATH=./build/production

if [ -z "${S3_BUCKET}" ] || [ -z "${STAGE}" ]; then
  echo "Error: One or more required variables are empty."
  echo "${USAGE}"
  exit 1
fi

cd "$(dirname "${0}")"
find "${BUILD_PATH}" -maxdepth 1 -type f -print0 | while IFS= read -r -d '' filePath; do
  s3FileName=$(basename "${filePath}")
  aws s3 cp --cache-control no-store "${filePath}" "s3://${S3_BUCKET}/${STAGE}/${s3FileName}"
done
aws s3 sync --delete --exact-timestamps "${BUILD_PATH}" "s3://${S3_BUCKET}/${STAGE}"
