# セットアップ
## 必要な外部ライブラリのインストール
```
cd src/handlers
# alexa-sdk
npm install --save alexa-sdk
# node-rest-client
npm install node-rest-client
```
## よく使うコマンド
```
# 検証実行
aws cloudformation validate-template \
  --template-body file://s3package.yml \
  --profile handson20180323

# スタックの作成
aws cloudformation create-stack \
  --stack-name s3package \
  --template-body file://s3package.yml \
  --profile handson20180323

# スタックの更新
aws cloudformation update-stack \
  --stack-name s3package \
  --template-body file://s3package.yml \
  --profile handson20180323

# スタックの削除
aws cloudformation delete-stack \
  --stack-name s3package \
  --profile handson20180323
```
## デプロイコマンド
```
# パッケージ
aws cloudformation package \
  --template-file deploy.yml \
  --output-template-file deploy-output.yml \
  --s3-bucket alexa-booking-meeting-room-package \
  --profile handson20180323
# デプロイ
aws cloudformation deploy \
  --template-file deploy-output.yml \
  --stack-name alexa-booking-meeting-room-sam \
  --capabilities CAPABILITY_IAM \
  --profile handson20180323
```
