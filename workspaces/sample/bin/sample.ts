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
const projectName: string = app.node.tryGetContext('project');
const envName: string = app.node.tryGetContext('env');
const list: string[] = app.node.tryGetContext('list').split(',');

// env
const defaultEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};
// Whether to force delete an S3 bucket even if objects exist
// Determine by environment identifier
//const isAutoDeleteObject:boolean = envName.match(/^(dev|test|stage)$/) ? true: false;
// Since it is a test, it can be deleted
const isAutoDeleteObject = true;

// Before you can use cdk destroy to delete a deletion-protected stack, you must disable deletion protection for the stack in the management console.
// const isTerminationProtection:boolean = envName.match(/^(dev|test)$/) ? false: true;
// Since it is a test, it can be deleted
const isTerminationProtection=false;

console.log();
console.log(`${color_yellow}##########################################${color_reset}`);
console.log(`${color_yellow}  ${projectName} プロジェクト${color_reset}`);
console.log(`${color_yellow}  リリース環境：${color_reset} ${color_red}${envName}${color_reset}`);
console.log(`${color_yellow}##########################################${color_reset}`);
console.log();

// 環境識別子のチェック
if (!envName.match(/^(dev|test|stage|prod|jump)$/)) {
  console.warn('Invalid context. envName must be [dev , test, stage, prod, jump].');
  process.exit(1);
}

const isProduction:boolean = envName.match(/^(prod)$/) ? true: false;
if (isProduction) {
  console.log(`${color_red}!!!!!!!!!! CAUTION !!!!!!!!!!${color_reset}`);
  console.log(`${color_red}   本番環境へのリリースです。${color_reset}`);
  console.log(`${color_red}!!!!!!!!!! CAUTION !!!!!!!!!!${color_reset}`);
};

new SampleStack(app, 'SampleStack', {
  description: 'Sample Stack.',
  pjName: projectName,
  envName: envName,
  list: list,
  isAutoDeleteObject: isAutoDeleteObject,
  env: defaultEnv,
  terminationProtection: isTerminationProtection, // Enabling deletion protection
});
