#!/bin/bash

set -Ceu
readonly USAGE="Usage: $0 <DISTRIBUTION_ID> <ORIGIN_ID> <STAGE>"
readonly DISTRIBUTION_ID="${1?"${USAGE}"}"
readonly ORIGIN_ID="${2?"${USAGE}"}"
readonly STAGE="${3?"${USAGE}"}"
readonly ORIGIN="origin.json"
readonly DISTRIBUTION_CONFIG="distribution-config.json"
readonly UPDATED_ORIGIN_PATH="updated-origin-path.json"

aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" >"${ORIGIN}"
jq .DistributionConfig "${ORIGIN}" >"${DISTRIBUTION_CONFIG}"
jq "(.Origins.Items[] | select(.Id == \"${ORIGIN_ID}\") | .OriginPath) |= \"/${STAGE}\"" "${UPDATE_DISTRIBUTION_CONFIG}" >"${UPDATED_ORIGIN_PATH}"
