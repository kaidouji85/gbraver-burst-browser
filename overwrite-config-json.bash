#!/bin/bash

set -Ceu
touch config.json
cat <<EOT > config.json
{
  "isBackendServerAvailable": ${IS_BACKEND_SERVER_AVAILABLE:-true}
}
EOT
aws s3 cp --cache-control no-store config.json "s3://${S3_BUCKET:?}/${STAGE:?}/config.json"
rm config.json