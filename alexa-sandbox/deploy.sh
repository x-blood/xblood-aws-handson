#!/bin/sh

# Create Package
aws cloudformation package \
  --template-file template.yml \
  --output-template-file template-output.yml \
  --s3-bucket sam-sandbox-package \
  --profile xblood

# Deploy
aws cloudformation deploy \
  --template-file template-output.yml \
  --stack-name alexa-sandbox-sam \
  --parameter-overrides \
  Stage=${ALEXA_SANDBOX_STAGE} \
  --capabilities CAPABILITY_IAM \
  --profile xblood
