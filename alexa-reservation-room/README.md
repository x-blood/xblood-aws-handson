# セットアップ
## node.jsのセットアップ(Linux)
```
# nvmのインストール
git clone https://github.com/creationix/nvm.git ~/.nvm
source ~/.nvm/nvm.sh

# nvmのバージョン確認
nvm --version

# Node.jsのインストール
nvm install 6.14.1

# Node.jsのバージョン確認
node -v
```

## 推奨：nvmの設定(Linux)
```
# デフォルトのNode.jsのバージョン指定
nvm alias default v6.14.1

# ターミナル起動時の指定
vi ~/.bashrc

# 下記情報を入力
if [[ -s ~/.nvm/nvm.sh ]];
 then source ~/.nvm/nvm.sh
fi
```

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
  --parameter-overrides LambdaFunctionVersion=0.02 \
  --capabilities CAPABILITY_IAM \
  --profile handson20180323
```
