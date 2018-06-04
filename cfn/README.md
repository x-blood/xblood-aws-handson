## cfn実行方法
### 環境変数の設定
```
# 作業ディレクトリ(作業環境に合わせて変更すること)
DIR_CONF=~/tech/xblood-aws-handson/cfn

# ymlファイルの指定
# vcp
CFN_TEMPLATE_NAME=vpc
# ec2
CFN_TEMPLATE_NAME=ec2

# 入力パスの指定
FILE_INPUT="${DIR_CONF}/${CFN_TEMPLATE_NAME}.yml"

# プロファイルの指定
AWS_CLI_PROFILE=handson20180323

# 環境変数の確認
cat << ETX
  # ディレクトリ
  DIR_CONF=${DIR_CONF}
  # ファイル
  CFN_TEMPLATE_NAME=${CFN_TEMPLATE_NAME}
  # パス
  FILE_INPUT=${FILE_INPUT}
  # プロファイル
  AWS_CLI_PROFILE=${AWS_CLI_PROFILE}
ETX
```

### Cfn実行
```
# 検証
aws cloudformation validate-template \
  --template-body file://${FILE_INPUT} \
  --profile ${AWS_CLI_PROFILE}

# スタックの作成
aws cloudformation create-stack \
  --stack-name ${CFN_TEMPLATE_NAME} \
  --template-body file://${FILE_INPUT} \
  --profile ${AWS_CLI_PROFILE}

# スタックの更新(よく使う)
aws cloudformation update-stack \
  --stack-name ${CFN_TEMPLATE_NAME} \
  --template-body file://${FILE_INPUT} \
  --profile ${AWS_CLI_PROFILE}

# スタックの削除
aws cloudformation delete-stack \
  --stack-name ${CFN_TEMPLATE_NAME} \
  --profile ${AWS_CLI_PROFILE}
```
