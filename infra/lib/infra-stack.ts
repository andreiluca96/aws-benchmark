import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { BenchmarkingResources } from './constructs/benchmarking-resources'
import { Backend } from './constructs/backend'

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

		new BenchmarkingResources(this, 'BenchmarkingResources', {
			 prefix: 'eu-central-1'
		})

		new Backend(this, 'BackendStack', {
			prefix: `eu-central-1`
		})
  }
}
