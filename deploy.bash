#!/bin/bash
set -Ceu
cd "$(dirname "${0}")"

if [ $# != 3 ]; then
  echo 'invalid param'
  exit 1
fi

S3_BUCKET=$1
DISTRIBUTION_ID=$2
ASSETLINKS_JSON_URI=$3

npm run build:production
npm run build:sw
npm run build:clear-sw
npm run generate-icons
npm run scale-down-mobile-images
npm run add-csp
aws s3 cp "${ASSETLINKS_JSON_URI}" ./build/production/.well-known/assetlinks.json
./upload-module.bash "${S3_BUCKET}"
./clear-cdn.bash "${DISTRIBUTION_ID}"
