import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import { Construct } from 'constructs';
import { BenchmarkingResources } from './constructs/benchmarking-resources'
import { Backend } from './constructs/backend'
import { FrontendConstruct } from './constructs/frontend';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

		const region = 'eu-central-1';

		new BenchmarkingResources(this, 'BenchmarkingResources', {
			 prefix: region
	  })

		new Backend(this, 'BackendResources', {
			prefix: region 
		})

		new FrontendConstruct(this, 'FrontendConstruct', {
			prefix: region
		});
  }
}
