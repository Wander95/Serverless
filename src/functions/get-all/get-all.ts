import { APIGatewayProxyResultV2, Handler } from 'aws-lambda';

import { products } from '../constants';
import { headers } from '../headers';

export const handler: Handler = async (): Promise<APIGatewayProxyResultV2<string>> => {
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ message: 'Products found', payload: products }),
  };
};
