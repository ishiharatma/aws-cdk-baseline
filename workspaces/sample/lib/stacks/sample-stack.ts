import * as cdk from "aws-cdk-lib";
import { StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
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

    arr.forEach((element) => {
      console.log(element);
    });

    // SQS Queue
    new cdk.aws_sqs.Queue(this, "SampleQueue", {
      queueName: `${props.pjName}-${props.envName}-queue`,
      retentionPeriod: cdk.Duration.days(14),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
    new cdk.aws_sqs.Queue(this, "FifoQueue", {
      queueName: `${props.pjName}-${props.envName}-queue.fifo`,
      fifo: true,
      retentionPeriod: cdk.Duration.days(14),
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });
  }
}
