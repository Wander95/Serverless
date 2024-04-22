import { APIGatewayAuthorizerResult, APIGatewayTokenAuthorizerEvent } from 'aws-lambda';
import 'dotenv/config';

const generateForbiddenResponse = (event: APIGatewayTokenAuthorizerEvent) => {
  return {
    principalId: 'user',
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: 'Deny',
          Resource: event.methodArn,
        },
      ],
    },
  };
};

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  try {
    const authHeader = event.authorizationToken;
    const methodArn = event.methodArn;
    const token = authHeader.split(' ')[1]!;
    if (token !== process.env.AUTHORIZATION_TOKEN) return generateForbiddenResponse(event);

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: methodArn,
          },
        ],
      },
    };
  } catch (error) {
    return generateForbiddenResponse(event);
  }
};
