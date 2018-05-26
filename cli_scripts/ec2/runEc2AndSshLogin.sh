#!/bin/sh

## runEc2AndSshLogin.sh
## author : xblood
## description :
## 指定したEC2インスタンスを起動し、起動に成功した場合パブリックIPを取得しSSH接続する。
##
## 備考
## ・keyファイル指定によるSSHアクセスはコメントアウトされている。
## ・アプリケーションサーバのURLを記載したhtmlファイルも生成している。(あまり使ってない)
## ・不用意なインスタンス操作をしないように、必ずプロファイルを指定している。

ec2_status_code=''

#Get Environment Variables
INSTANCE_ID=${XB_AWS_CLI_EC2_INSTANCE_ID}
PROFILE_NAME=${XB_AWS_CLI_PROFILE_NAME}
KEY_FILE_PATH=${XB_AWS_CLI_EC2_KEY_FILE_PATH}
SSH_USER_ID=${XB_AWS_CLI_EC2_SSH_USER_ID}

#Check status of ec2 instance
ec2_status_code=$( \
aws ec2 describe-instances \
  --instance-ids $INSTANCE_ID \
  --query Reservations[].Instances[].State[].Code \
  --output text --profile $PROFILE_NAME \
  )

if [ "16" != $ec2_status_code ]; then
  echo "EC2 is stopped. Would you like to start?(Y/n)"
  read answer
  case $answer in
    Y)
      # Run EC2 instance
      aws ec2 start-instances \
        --instance-ids $INSTANCE_ID \
        --profile $PROFILE_NAME \
        && aws ec2 wait instance-running \
        --instance-ids $INSTANCE_ID \
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

#Get Public IP
public_ip=''
public_ip=$( \
  aws ec2 describe-instances \
  --query Reservations[].Instances[].PublicIpAddress \
  --output text --profile $PROFILE_NAME \
  )
echo "public_ip:" $public_ip

# modify index.html
sed -e "s/{PUBLIC_IP}/$public_ip/g" index.html.temp > index.html
echo "Successfule to generate menu html file!"

#Connecting by SSH
#ssh -i $KEY_FILE_PATH $SSH_USER_ID@$public_ip
ssh $SSH_USER_ID@$public_ip
