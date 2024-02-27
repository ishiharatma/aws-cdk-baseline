
# CDK のインストール

CDK をインストールするには、次を実行します。

```sh
npm install -g aws-cdk
```

インストールされたことを確認します。

```sh
cdk --version
```

https://docs.aws.amazon.com/cdk/api/v2/

CDK コマンドを実行する際に、新しいバージョンの通知があった場合は、次を実行します。

![cdk_upgrade_recommend](/images/cdk_upgrade_recommend.JPG)

```sh
npm install -g aws-cdk
# update
npm update -g aws-cdk
```

パッケージのアップデートは、最新バージョンを確認してから実行します。

最新バージョンの確認

```sh
npm info aws-cdk version
npm info aws-cdk-lib version
```

アップデート実行

```sh
npm update
OR
npm update aws-cdk
npm update aws-cdk-lib
```



## トラブルシューティング

- Unable to parse config file: AWS
  - connfig または、credentials の定義が不正です。定義を見直してください。
