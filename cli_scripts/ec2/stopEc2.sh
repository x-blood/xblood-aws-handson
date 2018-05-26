#!/bin/sh

## stopEc2.sh
## author : xblood
## description :
## 指定したEC2インスタンスを停止する。
##

#Get Environment Variables
INSTANCE_ID=${XB_AWS_CLI_EC2_INSTANCE_ID}
PROFILE_NAME=${XB_AWS_CLI_PROFILE_NAME}

ec2_status_code=''

#Check status of ec2 instance
ec2_status_code=$( \
  aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query Reservations[].Instances[].State[].Code \
  --output text --profile $PROFILE_NAME \
  )

if [ "16" != $ec2_status_code ]; then
  echo "EC2 already stopped. Exit the shell script."
  exit 1
else
  echo "Now stopping EC2 instance..."
  aws ec2 stop-instances \
    --instance-ids $INSTANCE_ID \
    --profile $PROFILE_NAME \
    && aws ec2 wait instance-stopped \
    --instance-ids $INSTANCE_ID \
    --profile $PROFILE_NAME
  echo "Done. Exit the shell script."
fi

exit 1

