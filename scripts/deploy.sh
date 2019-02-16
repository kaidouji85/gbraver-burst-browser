#!/bin/sh

npm run build:production
aws s3 rm s3://${S3_BUCKET}/ --recursive
aws s3 cp ./build/production s3://${S3_BUCKET} --recursive