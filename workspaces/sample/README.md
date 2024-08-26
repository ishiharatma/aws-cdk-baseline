# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

## Usage

```sh
npm run cdk:diff:all --project=<プロジェクト名> --env=<環境識別子> --list="one,two,three"
npm run cdk:diff --project=<プロジェクト名> --env=<環境識別子> --list="one,two,three" --s=<スタック名>
npm run cdk:deploy:all --project=<プロジェクト名> --env=<環境識別子> --list="one,two,three"
npm run cdk:deploy --project=<プロジェクト名> --env=<環境識別子> --s=<スタック名>
```
