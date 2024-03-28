import { APIGatewayProxyResultV2, Handler } from 'aws-lambda';

import { headers } from '@/functions/headers';
import { ProductTable } from '@/functions/product.table';

export const handler: Handler = async (): Promise<APIGatewayProxyResultV2<string>> => {
  try {
    const product = new ProductTable();
    const products = await product.scan();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Products found', payload: products }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'bob', error }),
    };
  }
};
