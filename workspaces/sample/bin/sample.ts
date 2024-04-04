#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { SampleStack } from '../lib/stacks/sample-stack';

const app = new cdk.App();

// 文字色
const color_red: string = '\u001b[31m';
const color_green: string = '\u001b[32m';
const color_yellow: string = '\u001b[33m';
const color_white: string = '\u001b[37m';
const color_reset: string = '\u001b[0m';

// 環境識別子の指定
const envname: string = app.node.tryGetContext('env');

console.log();
console.log(`${color_yellow}##########################################${color_reset}`);
console.log(`${color_yellow}  sample プロジェクト${color_reset}`);
console.log(`${color_yellow}  リリース環境：${color_reset} ${color_red}${envname}${color_reset}`);
console.log(`${color_yellow}##########################################${color_reset}`);
console.log();

// 環境識別子のチェック
if (!envname.match(/^(dev|test|stage|prod|jump)$/)) {
  console.warn('Invalid context. envname must be [dev , test, stage, prod, jump].');
  process.exit(1);
}

const isProduction:boolean = envname.match(/^(prod)$/) ? true: false;
if (isProduction) {
  console.log(`${color_red}!!!!!!!!!! CAUTION !!!!!!!!!!${color_reset}`);
  console.log(`${color_red}   本番環境へのリリースです。${color_reset}`);
  console.log(`${color_red}!!!!!!!!!! CAUTION !!!!!!!!!!${color_reset}`);
};


new SampleStack(app, 'SampleStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});