#!/bin/sh

## stopRds.sh
## author : xblood
## description :
## 指定したRDSインスタンスを停止する。
##
## 備考
## ・RDSインスタンスは自動で起動されるため、本Scriptの実用性は低い。
## ・RDSはwaitオプションに"db-instance-stopped"が指定できないため、シェルスクリプトは停止コマンドを発行した後即座に終了する。(停止状態になるのを待たない)
##

#Get Environment Variables
RDS_INSTANCE_IDENTIFIER=${XB_AWS_CLI_RDS_IDENTIFIER}
PROFILE_NAME=${XB_AWS_CLI_PROFILE_NAME}

rds_status=''

#Check status of RDS instance
rds_status=$( \
  aws rds describe-db-instances \
  --db-instance-identifier $RDS_INSTANCE_IDENTIFIER \
  --query DBInstances[].DBInstanceStatus \
  --output text --profile $PROFILE_NAME \
  )

if [ "available" != $rds_status ]; then
  echo "RDS already stopped. Exit the shell script."
  exit 1
else
  echo "Now stopping RDS instance..."
  aws rds stop-db-instance \
    --db-instance-identifier $RDS_INSTANCE_IDENTIFIER \
# AWS CLI not support "wait db-instance-stopped" option
#    --profile $PROFILE_NAME \
#    && aws rds wait db-instance-stopped \
#    --db-instance-identifier $RDS_INSTANCE_IDENTIFIER \
    --profile $PROFILE_NAME
  echo "Done. Exit the shell script."
fi

exit 1

