import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';

import { Duration } from 'aws-cdk-lib';

export interface BenchmarkingResourcesProps {
  prefix?: string;
}

export class BenchmarkingResources extends Construct {
  constructor(scope: Construct, id: string, props: BenchmarkingResourcesProps) {
    super(scope, id);
		
		const queue = new sqs.Queue(this, 'InfraQueue', {
      visibilityTimeout: Duration.seconds(300),
			queueName: `${props.prefix}-benchmark-queue`
    });

    const topic = new sns.Topic(this, 'InfraTopic', {
			topicName: `${props.prefix}-benchmark-topic`
		});
  }
}
