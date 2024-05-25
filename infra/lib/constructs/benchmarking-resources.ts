import { Construct } from 'constructs';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as events from 'aws-cdk-lib/aws-events'
import { Duration } from 'aws-cdk-lib';

export interface BenchmarkingResourcesProps {
  prefix?: string;
}

export class BenchmarkingResources extends Construct {
  constructor(scope: Construct, id: string, props: BenchmarkingResourcesProps) {
    super(scope, id);
		
		const queue = new sqs.Queue(this, 'BenchmarkQueue', {
      visibilityTimeout: Duration.seconds(300),
			queueName: `${props.prefix}-benchmark-queue`
    });

		const event_bus = new events.EventBus(this, 'BenchMarkEventBus', {
			eventBusName: `${props.prefix}-benchmark-event-bus`
		});

    const topic = new sns.Topic(this, 'BenchmarkTopic', {
			topicName: `${props.prefix}-benchmark-topic`
		});
  }
}
