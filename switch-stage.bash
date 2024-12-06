#!/bin/bash

set -Ceu
readonly USAGE="Usage: $0 <DISTRIBUTION_ID> <STAGE>"
readonly DISTRIBUTION_ID="${1?"${USAGE}"}"
readonly STAGE="${2?"${USAGE}"}"
readonly ORIGIN_DESTINATION_CONFIG="origin-destination-config.json"
readonly UPDATE_DISTRIBUTION_CONFIG="update-distribution-config.json"

aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" >"${ORIGIN_DESTINATION_CONFIG}"
jq .DistributionConfig "${ORIGIN_DESTINATION_CONFIG}" >"${UPDATE_DISTRIBUTION_CONFIG}"
