#!/bin/bash

set -Ceu
readonly USAGE="Usage: $0 <S3_BUCKET> <STAGE> <ASSETLINKS_JSON_URI>"
readonly S3_BUCKET="${1?"${USAGE}"}"
readonly STAGE="${2?"${USAGE}"}"
readonly ASSETLINKS_JSON_URI="${3?"${USAGE}"}"

cd "$(dirname "${0}")"
npm run build:production
npm run build:sw
npm run build:clear-sw
npm run generate-icons
npm run scale-down-mobile-images
npm run add-csp
aws s3 cp "${ASSETLINKS_JSON_URI}" ./build/production/.well-known/assetlinks.json
./upload-module.bash "${S3_BUCKET}" "${STAGE}"
