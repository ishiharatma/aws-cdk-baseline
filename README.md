# aws-cdk-baseline

This is a cdk-baseline project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute.

## README

- [aws-cdk-baseline](#aws-cdk-baseline)
  - [README](#readme)
  - [Useful commands](#useful-commands)
  - [開始方法](#開始方法)
    - [Node.js のインストール](#nodejs-のインストール)
    - [プロキシの設定](#プロキシの設定)
  - [AWS CDK v2 の前提条件を確認](#aws-cdk-v2-の前提条件を確認)
    - [AWS CLI のインストール](#aws-cli-のインストール)
    - [TypeScriptのインストール](#typescriptのインストール)
  - [AWS CDK のインストール](#aws-cdk-のインストール)
  - [IDE の設定](#ide-の設定)
    - [.vscode/setting.json](#vscodesettingjson)
  - [workspace の作成](#workspace-の作成)
  - [tsconfig.json の作成](#tsconfigjson-の作成)
    - [workspace の追加](#workspace-の追加)
    - [依存パッケージを追加する](#依存パッケージを追加する)
    - [モジュールのインストール](#モジュールのインストール)
  - [workspace で定義された npm script を実行する](#workspace-で定義された-npm-script-を実行する)
  - [アップデート実行](#アップデート実行)
  - [CDK 初期化](#cdk-初期化)
  - [トラブルシューティング](#トラブルシューティング)

## Useful commands

- `npm run build`              compile typescript to js
- `npm run watch`              watch for changes and compile
- `npm run test`               perform the jest unit tests
- `cdk deploy [STACKS..]`      deploy this stack to your default AWS account/region
- `cdk diff [STACKS..]`        compare deployed stack with current state
- `cdk synth [STACKS..]`       emits the synthesized CloudFormation template
- `cdk list [STACKS..]`        Lists all stacks in the app      [aliases: ls]
- `cdk watch [STACKS..]`       Shortcut for 'deploy --watch'
- `cdk destroy [STACKS..]`     Destroy the stack(s) named STACKS

e.g.,

```sh

cdk diff <スタック名> -c env=<環境識別子> -c project=<プロジェクト名> --profile <projectname>-<環境識別子> --version-reporting false --path-metadata false --asset-metadata false
```

npm run では次のように実行します。

```sh
# 差分チェック
npm run cdk:diff:all --env=<環境識別子> --project=<プロジェクト名>
# 全てデプロイ
npm run cdk:deploy:all --env=<環境識別子> --project=<プロジェクト名>
# 特定のスタックのみデプロイ
npm run cdk:deploy --env=<環境識別子> --project=<プロジェクト名> --s=<スタック名>
```

![cdk_diff](/images/cdk_diff.JPG)

## 開始方法

### Node.js のインストール

node.js ウェブサイトの公式の手順に従い、特定のオペレーションシステムの手順に従ってインストールします。

https://nodejs.org/en/

### プロキシの設定

社内LANなどプロキシを使用している場合は、プロキシの認証情報を登録します。
次の項目には、各自の情報を設定してください。

- ユーザー名
- パスワード
- プロキシのアドレス
- プロキシのポート

コマンドプロンプトで次のコマンドを実行します。

```sh
npm -g config set proxy http://<ユーザー名>:<パスワード>@<プロキシのアドレス>:<プロキシのポート>
npm -g config set https-proxy http://<ユーザー名>:<パスワード>@<プロキシのアドレス>:<プロキシのポート>
```

設定されていることを確認します。

```sh
npm -g config list
```

## AWS CDK v2 の前提条件を確認

[AWS CDK v2 前提条件](https://docs.aws.amazon.com/ja_jp/cdk/v2/guide/getting_started.html#getting_started_prerequisites)

### AWS CLI のインストール

[AWS-CLI-Install](/docs/AWS-CLI-Install.md)

### TypeScriptのインストール

TypeScriptがインストールされていない場合はインストールしてください。

```sh
npm install -g typescript
# update
npm update -g typescript
```

## AWS CDK のインストール

[AWS-CDK-Install](/docs/AWS-CDK-Install.md)

## IDE の設定

好みの開発環境を使用します。

- VSCode
- AWS Cloud9
- Atom
- emacs

ここでは、VSCode を利用する想定とします。

### .vscode/setting.json

npm run build で、１つの xxx.ts に対して xxx.d.ts と xxx.js の 2ファイル作成されるため、以下を記述して非表示にします。

```json
{
    "files.exclude": {
        "**/*.d.ts": {"when": "$(basename).ts"},
        "**/*.js": {"when": "$(basename).ts"}
    }
}
```

## workspace の作成

workspace 機能を使うことによって、package-a, package-b のような複数のパッケージをトップレベルの npm プロジェクト (トップレベルの package.json) から管理・操作することができます。

```text
.
├── package.json
└── packages
    ├── a
    │   └── package.json
    └── b
        └── package.json
```

まずはルートとなるトップレベルの npm プロジェクトを作成します。

```sh
npm init
```

ルートの npm プロジェクトは workspace の管理用なので公開されることはありません。
生成された package.json を編集して private フィールド を true にしておきます。
またワークスペースの定義を作成します。

```package.json
{
  "name": "xxxxx",
  // ...
  "private": true,
  "workspaces": [
    "workspaces\\*"
  ],
}
```

## tsconfig.json の作成

`tsconfig.base.json` を作成します。

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "commonjs",
    "lib": [
      "es2018",
      "dom"
    ],
    "declaration": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": false,
    "inlineSourceMap": true,
    "inlineSources": true,
    "experimentalDecorators": true,
    "strictPropertyInitialization": false,
    "typeRoots": [
      "./node_modules/@types"
    ]
  }
}
```

```sh
npx tsc --init
```

作成された tsconfig.json を以下で置き換えます。

```json
{
  "extends": "./tsconfig.base.json",
  "exclude": [
    "node_modules",
    "cdk.out"
  ]
}
```

この設定を行わず、cdk コマンドを実行すると `TypeError: Class constructor Stack cannot be invoked without 'new'` といったエラーが発生します。

### workspace の追加

workspace を追加するには -w オプションをつけて npm init を呼び出します。

├── package.json
└── workspaces
    └── sample
        └── package.json

```sh
npm init -w workspaces/sample
```

AWS CDK プロジェクトの初期化を行います。
ディレクトリが空でないと、`cdk init` コマンドは失敗します。そのため、作成された `package.json` は手動で削除します。

```sh
cd  workspaces/sample
rm package.json  # 次のコマンドを実行するために、ディレクトリを空にしておく。
cdk init app --language typescript
mkdir .\lib\resources
mkdir .\lib\stacks
mkdir .\lib\utils
mkdir .\parameters
mkdir .\src
```

tsconfig.json を以下で置き換えます。

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": "./"
  },
  "include": ["bin/**/*.ts", "lib/**/*.ts", "test/**/*.ts"]
}
```

これ以降、CDK プロジェクト を追加する場合も同様に実施します。

### 依存パッケージを追加する

- 開発用の依存パッケージ (devDependencies) はルートパッケージの package.json で管理します
- サブパッケージのアプリケーションコードが参照する依存パッケージはサブパッケージ内の package.json で管理します。

eslint のような lint ツールは開発用の依存パッケージなので単純にルート側で npm install を行います。

```sh
npm install --save-dev eslint
```

workspace のコードが依存するパッケージは、次のように -w をつけて ルート側 で npm install を実行して追加します。

```sh
npm install -w workspaces/sample --save aws-cdk-lib constructs
```

こうすることにより、workspace が依存するパッケージもルートの package-lock.json によって管理されるようになります。
これにより新規に clone したリポジトリでセットアップを行う場合でも、ルート側で npm install を実行するだけで全ての workspace の依存パッケージを取得することができます。

バージョンが競合する場合は workspace 内の node_modules にインストールされる仕組みです。

workspace 内で単純に npm install を実行してはいけないことに注意してください。
この方法だと workspaces/sample が workspace ではなく単一のパッケージとみなされてしまうため、新規に packages/a/package-lock.json が生成され、ルートの package-lock.json で管理することができなくなってしまいます。

```sh
cd workspaces/sample
npm install --save node-fetch
```

### モジュールのインストール

VSCode を開き、ルートのディレクトリで以下のコマンドを実行します。

```sh
npm install
or
npm update
```

インストールされたパッケージのバージョン確認

ローカル

```sh
npm list --depth=0
```

グローバル

```sh
npm list --depth=0 -g
```

## workspace で定義された npm script を実行する

以下のように workspace a に print という npm script を定義したとします。

```json
{
  "name": "a",
  "version": "1.0.0",
  // ...
  "scripts": {
    "print": "echo \"workspace sample\""
  }
}
```

この npm script はルート側から次のように実行できます。

```sh
npm run print -w workspaces/sample
```

## アップデート実行

```sh
npm update
```


## CDK 初期化

(初回のみ、アカウント初期化をCDKで実施している場合は不要)

1. 次のコマンドを実行します。CloudFormation スタック「CDKToolkit」が作成されます。作成されたことを確認したら、削除保護を確認します。無効になっていたら有効にておきます。（--termination-protectionのオプションで有効になっているはずです。）

```sh
npm run cdk:bootstrap --env=<環境識別子> --project=<プロジェクト名> -w workspaces/sample
```

## トラブルシューティング

- インストールが進まない、失敗する
  - プロキシ設定を見直してください。

以上
