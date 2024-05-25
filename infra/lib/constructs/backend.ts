import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import * as lambda from  'aws-cdk-lib/aws-lambda';


export interface BackendProps {
  prefix?: string;
}


export class Backend extends Construct {
	constructor(scope: Construct, id: string, props: BackendProps) {
		super(scope, id);

		const benchmarkRunner = new lambda.Function(this, 'BenchmarkRunner', {
			code: lambda.Code.fromAsset(path.join(__dirname, '..', '..', '..', 'backend/benchmark-runner/target/lambda/benchmark-runner')),
			runtime: lambda.Runtime.PROVIDED_AL2023,
			handler: "bootstrap",
			functionName: `${props.prefix}-benchmark-runner-lambda` 
		})

		const fnUrl = benchmarkRunner.addFunctionUrl({
			authType: lambda.FunctionUrlAuthType.NONE,
		});

		new cdk.CfnOutput(this, 'TheUrl', {
			// The .url attributes will return the unique Function URL
			value: fnUrl.url,
		});
		}
}
