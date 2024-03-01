import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { App } from 'aws-cdk-lib';

// テストするスタックをインポート
//import { VPCStack } from '../lib/stacks/vpc-stack';
//import { SnsStack } from '../lib/stacks/sns-stack';

// スタックのリージョン指定に使用する
const defaultEnv = {
    account: '123456789012',
    region: 'ap-northeast-1',
};
const useast1Env = {
  account: "12456789012",
  region: "us-east-1",
};

// 環境変数など
const projectName: string = 'snapshot';
const envName: string = 'test';

const app = new App();

test('snapshot validation test',() =>{

    // テスト用にダミーのARNを設定したい場合に作成
    //const snsApplicationTopicArn =  'arn:aws:sns:ap-northeast-1:123456789012:TestTopic';

    // テストするスタックを作成
    /*
    const vpcStack = new VPCStack(app, 'VPCStack', {
        :
        env: defaultEnv,
    });
    const snsStack = new SnsStack(app, 'SnsStack', {
        :
        env: defaultEnv,
    });
    */
    
    // タグを付与する
    cdk.Tags.of(app).add('Project', projectName);
    cdk.Tags.of(app).add('Environment', envName);

    // test with snapshot
    //expect(Template.fromStack(vpcStack)).toMatchSnapshot();
    //expect(Template.fromStack(snsStack)).toMatchSnapshot();

})