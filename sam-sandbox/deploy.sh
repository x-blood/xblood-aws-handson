#!/bin/sh

# Deploy
go build ./src/handlers/sandbox.go

# Create Package
aws cloudformation package \
  --template-file template.yml \
  --output-template-file deploy-output.yml \
  --s3-bucket sam-sandbox-package \
  --profile xblood

# Deploy
aws cloudformation deploy \
  --template-file deploy-output.yml \
  --stack-name sam-sandbox \
  --capabilities CAPABILITY_IAM \
  --profile xblood
