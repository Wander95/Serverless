import { APIGatewayProxyEventV2, Callback, Context } from 'aws-lambda';
import assert from 'node:assert';
import { handler } from './get-all';

process.env.CUSTOM_VAR = 'test_value';
describe('RoleService', () => {
  it('synchronous passing test', async () => {
    const testEvent = {} as APIGatewayProxyEventV2;
    const testContext = {} as Context;
    const testCallback = {} as Callback;
    const response = await handler(testEvent, testContext, testCallback);
    assert.strictEqual(response.statusCode, 200);
  });
});
