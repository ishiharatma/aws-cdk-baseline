import * as cdk from "aws-cdk-lib";
import { App } from "aws-cdk-lib";
import { Template } from 'aws-cdk-lib/assertions';

// テストするスタックをインポート
import { SampleStack } from "../lib/stacks/sample-stack";
import { Queue } from "aws-cdk-lib/aws-sqs";

// スタックのリージョン指定に使用する
const defaultEnv = {
  account: "123456789012",
  region: "ap-northeast-1",
};
const useast1Env = {
  account: "12456789012",
  region: "us-east-1",
};

// 環境変数など
const projectName = "snapshot";
const envName = "test";
const list: string[] = ["test1", "test2", "test3"];
const app = new App();

describe('SampleStack', () => {
  let app: cdk.App;
  let template: Template;
  let stack: SampleStack;

  beforeEach(() => {
    // テスト毎に新しいアプリを作成
    app = new cdk.App();
    // スタックを作成
    // ESLintルール「cdk/require-passing-this」を無視する
    stack = new SampleStack(app, "SampleStack", {
      stackName: "SampleStack",
      description: "Sample Stack.",
      pjName: projectName,
      envName: envName,
      list: list,
      isAutoDeleteObject: true,
      env: defaultEnv,
      terminationProtection: true, // Enabling deletion protection
    });
    // タグを付与する
    cdk.Tags.of(app).add("Project", projectName);
    cdk.Tags.of(app).add("Environment", envName);
    // 作成したスタックをテスト対象に設定
    template = Template.fromStack(stack);

    });

    test('OK', () => {    
      // テストOKを返す
      expect(true).toBe(true);
    });

    test('スタックのリソース数を確認', () => {
      // SQSキューが1つ存在することを確認
      template.resourceCountIs('AWS::SQS::Queue', 2);
    });

    test('SQSキューの設定が正しいこと', () => {
      template.hasResourceProperties('AWS::SQS::Queue', {
        QueueName: `${projectName}-${envName}-queue`,
        MessageRetentionPeriod: 1209600 // 14日間（秒単位）
      });
    });

    test('SQSキューのFIFOが正しいこと', () => { 
      template.hasResourceProperties('AWS::SQS::Queue', {
        QueueName: `${projectName}-${envName}-queue.fifo`,
        FifoQueue: true,
      });
    });

    test('SQSキューの削除ポリシーが正しいこと', () => {
      template.hasResource('AWS::SQS::Queue', {
        DeletionPolicy: 'Delete'
      });
    });

    test('SQSキューの名前が環境変数から正しく構成されていること', () => {
      template.hasResourceProperties('AWS::SQS::Queue', {
        QueueName: `${projectName}-${envName}-queue`
      });
    });

    test('SQSキューの更新置換ポリシーが正しいこと', () => {
      template.hasResource('AWS::SQS::Queue', {
        UpdateReplacePolicy: 'Delete'
      });
    });

    test('タグが両方とも付与されていること', () => {
      const resources = template.findResources('AWS::SQS::Queue');
      const queue = Object.values(resources)[0];
      const tags = queue.Properties.Tags;
      
      // タグの存在確認（順序に依存しない方法）
      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ Key: 'Environment', Value: envName }),
          expect.objectContaining({ Key: 'Project', Value: projectName })
        ])
      );
    });

    // S3バケットが作成されていないことを確認
    test('S3バケットが作成されていないこと', () => {
      template.resourceCountIs('AWS::S3::Bucket', 0);
    });

    test('スナップショットテスト', () => {
      // スタック全体のスナップショットを作成し、今後の変更を検出
      expect(template.toJSON()).toMatchSnapshot();
    });

});