import * as cdk from 'aws-cdk-lib';
import { CfnOutput } from 'aws-cdk-lib';
import { Distribution, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export interface FrontendConstructProps {
	prefix?: string;
}

const path = '../frontend/benchmark-viewer/build'

export class FrontendConstruct extends Construct {
	constructor(scope: Construct, id: string, props: FrontendConstructProps) {
		super(scope, id);

		const hostingBucket = new Bucket(this, 'WebsiteBucket', {
			autoDeleteObjects: true,
			blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
			removalPolicy: cdk.RemovalPolicy.DESTROY
		});

		const distribution = new Distribution(this, 'CloudfrontDistribution', {
			defaultBehavior: {
				origin: new S3Origin(hostingBucket),
				viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS
			},
			defaultRootObject: "index.html",
			errorResponses: [
				{
					httpStatus: 404,
					responseHttpStatus: 200,
					responsePagePath: '/index.html'
				}
			]
		});

		new BucketDeployment(this, 'WebsiteBucketDeployment', {
			sources: [Source.asset(path)],
			destinationBucket: hostingBucket,
			distribution,
			distributionPaths: ["/*"]
		})

		new CfnOutput(this, 'CloudFrontURL', {
				value: distribution.domainName,
				description: 'The distribution URL',
				exportName: 'CloudfrontURL',
		});

		new CfnOutput(this, 'BucketName', {
				value: hostingBucket.bucketName,
				description: 'The name of the S3 bucket',
				exportName: 'BucketName',
		});

	}
}

