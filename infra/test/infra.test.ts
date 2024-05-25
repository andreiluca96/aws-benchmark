import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Infra from '../lib/infra-stack';

test('matches the snapshot', () => {
  
	const app = new cdk.App();
  
	// WHEN
  const stack = new Infra.InfraStack(app, 'MyTestStack');
  
	// THEN
  const template = Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});
