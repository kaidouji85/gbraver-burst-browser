#!/bin/sh

S3_BUCKET=$1

npm run build:production
./shell/upload-module.sh "${S3_BUCKET}"