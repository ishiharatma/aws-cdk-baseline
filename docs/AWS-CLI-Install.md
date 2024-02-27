# AWS CLI のインストール

オペレーションシステムに合わせて、次のドキュメントに従いインストールします。

https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/getting-started-install.html

## .aws/config と .aws/credentials

複数の環境に接続できるようにプロファイルを設定します。これにより、--profile my-profile フラグを使用して、指定したアカウントを使って特定のコマンドを実行できるようになります。

本プロジェクトでは、以下のプロファイルを定義するものとします。

- <projectname>-dev
- <projectname>-test
- <projectname>-stage
- <projectname>-prod

config と credentials ファイルには以下のように記述します。

- config

    ```config
    [profile <projectname>-dev]
    region = ap-northeast-1
    output = json
    ```

- credentials

    123456789012 には Jump アカウントの ID を、888888888888 にはリソースアカウントの ID をそれぞれ設定します。Jump アカウントを利用していない場合は、どちらも同じ アカウント ID 　となります。

    ```credentials
    [<projectname>-dev-accesskey]
    # xxxxxx には、IAMユーザー名の一部など、識別できる名称を設定します。
    aws_access_key_id  = zzzzzzz
    aws_secret_access_key = zzzzzzzzzzzzzz

    [<projectname>-dev]
    region  =  ap-northeast-1
    mfa_serial = arn:aws:iam::123456789012:mfa/<IAMユーザー名>
    role_arn = arn:aws:iam::888888888888:role/<IAMロール名>
    account  = 888888888888
    source_profile = <projectname>-dev-accesskey
    ```

コマンドプロンプトで環境変数に登録します。（以下はWindowsの場合）

```sh
SETX HTTP_PROXY http://<ユーザー名>:<パスワード>@<プロキシのアドレス>:<プロキシのポート>
SETX HTTPS_PROXY http://<ユーザー名>:<パスワード>@<プロキシのアドレス>:<プロキシのポート>
```

設定を確認します。

```sh
aws configure list
aws configure list-profiles
```
