import { App, Stack } from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';


const defaultEnv = {
    account: '123456789012',
    region: 'ap-northeast-1',
};
test('sample test.', () => {
    console.log('complete.');
    // GIVEN
    const app = new App({
        context : {}
    });
    const stack = new Stack(app, 'testing-stack', {
        env: defaultEnv
    });
    // ここにテストするスタックを記述
    /*
    new VPC(stack, 'vpc', {
        :
    });
    */

    // WHEN
    const template = Template.fromStack(stack);

    // リソースの数を確認する 
    //template.resourceCountIs('AWS::EC2::VPC', 1);

    // リソースのプロパティを確認する
    /*
    template.hasResourceProperties('AWS::EC2::VPC', {
        CidrBlock: '10.195.0.0/16',
    });
    */

    // Properties以外を確認したい場合はhasResource()
    /*
    template.hasResource('AWS::DynamoDB::Table', {
        'UpdateReplacePolicy': 'Delete'
    })
    */

    // リソースを表示する
    //console.log(template.findResources('AWS::IAM::Role'))

    // パターンマッチ
    /*
    template.hasResourceProperties('AWS::IAM::Policy', {
        "PolicyDocument":  {
            "Statement": Match.arrayWith([Match.objectLike({
                "Condition": Match.objectLike(
                    {
                        "NotIpAddress": {
                            "aws:SourceIp": Match.anyValue()
                        }
                    },
                ),
            })])
        },
        "PolicyName": Match.stringLikeRegexp('AdminRole'),
    });
    */

    //  存在しないことを確認
    /*
    try {
        template.resourceCountIs('AWS::IAM::Policy',4);
        fail('It should not have come here!');
    } catch (error){
        console.log('It came here, and so will pass!'+ error);
    }
    */

});
