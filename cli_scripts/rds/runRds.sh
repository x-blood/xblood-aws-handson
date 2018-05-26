#!/bin/sh

## runRds.sh
## author : xblood
## description :
## 指定したRDSインスタンスを起動する。
##
## 備考
## ・RDSインスタンスは自動で起動される可能性があるため、本Scriptの実用することはあまりない。

#Get Environment Variables
RDS_INSTANCE_IDENTIFIER=${XB_AWS_CLI_RDS_IDENTIFIER}
PROFILE_NAME=${XB_AWS_CLI_PROFILE_NAME}

rds_status=''

#Check status of rds instance
rds_status=$( \
  aws rds describe-db-instances \
  --db-instance-identifier $RDS_INSTANCE_IDENTIFIER \
  --query DBInstances[].DBInstanceStatus \
  --output text --profile $PROFILE_NAME \
  )

if [ "available" != $rds_status ]; then
  echo "RDS is stopped. Would you like to start?(Y/n)"
  read answer
  case $answer in
    Y)
      # Run RDS db instance
      aws rds start-db-instance \
        --db-instance-identifier $RDS_INSTANCE_IDENTIFIER \
        --profile $PROFILE_NAME \
        && aws rds wait db-instance-available \
        --db-instance-identifier $RDS_INSTANCE_IDENTIFIER \
        --profile $PROFILE_NAME
      ;;
    n)
      exit 1
      ;;
    *)
      exit 1
      ;;
  esac
fi

