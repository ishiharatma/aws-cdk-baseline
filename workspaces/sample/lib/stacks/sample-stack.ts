import * as cdk from 'aws-cdk-lib';
import { StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export interface myStackProps extends StackProps {
  // Define any properties required for your stack here
  readonly pjName: string;
  readonly envName: string;
  readonly list?: string[];
  readonly isAutoDeleteObject?: boolean;
}
export class SampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: myStackProps) {
    super(scope, id, props);

    console.log(`${props.pjName} ${props.envName}`);
    const arr = props.list ?? [];

    arr.forEach(element => {
      console.log(element);
    });

  }
}
