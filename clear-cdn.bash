#!/bin/bash

set -Ceu
readonly USAGE="Usage: $0 <DISTRIBUTION_ID>"
readonly DISTRIBUTION_ID="${1?"${USAGE}"}"

cd "$(dirname "${0}")"
aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"
