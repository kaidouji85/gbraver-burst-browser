#!/bin/bash

set -Ceu
readonly USAGE="Usage: $0 <DISTRIBUTION_ID> <ORIGIN_NAME> <STAGE>"
readonly DISTRIBUTION_ID="${1?"${USAGE}"}"
readonly ORIGIN_NAME="${2?"${USAGE}"}"
readonly STAGE="${3?"${USAGE}"}"
readonly ORIGIN="switch-stage__origin.json"
readonly DISTRIBUTION_CONFIG="switch-stage__distribution-config.json"
readonly UPDATED_ORIGIN_PATH="switch-stage__updated-origin-path.json"

aws cloudfront get-distribution-config --id "${DISTRIBUTION_ID}" >"${ORIGIN}"
jq .DistributionConfig "${ORIGIN}" >"${DISTRIBUTION_CONFIG}"
jq "(.Origins.Items[] | select(.Id == \"${ORIGIN_NAME}\") | .OriginPath) |= \"/${STAGE}\"" "${DISTRIBUTION_CONFIG}" >"${UPDATED_ORIGIN_PATH}"
ETAG=$(jq -r '.ETag' "${ORIGIN}")
aws cloudfront update-distribution --id "${DISTRIBUTION_ID}" --distribution-config "file://${UPDATED_ORIGIN_PATH}" --if-match "${ETAG}" --no-cli-pager --no-cli-auto-prompt
rm "${ORIGIN}" "${DISTRIBUTION_CONFIG}" "${UPDATED_ORIGIN_PATH}"
