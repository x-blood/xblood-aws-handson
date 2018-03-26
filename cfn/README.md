## cfn実行コマンド
```
# 環境変数の設定
# ディレクトリ
DIR_CONF=~/tech/xblood-aws-handson/cfn

# ファイル
CFN_TEMPLATE_NAME=vpc

# パス
FILE_INPUT="${DIR_CONF}/${CFN_TEMPLATE_NAME}.yml"

# プロファイル
AWS_CLI_PROFILE=handson20180323

# 変数の確認
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

# 検証実行
aws cloudformation validate-template \
  --template-body file://${FILE_INPUT}
  --profile ${AWS_CLI_PROFILE}

# スタックの作成
aws cloudformation create-stack \
  --stack-name "vpc" \
  --template-body file://${FILE_INPUT} \
  --profile ${AWS_CLI_PROFILE}
```
