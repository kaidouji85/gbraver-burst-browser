#!/bin/sh

if [ $# != 1 ]; then
  echo 'invalid param'
  exit 1
fi

DISTRIBUTION_ID=$1
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"