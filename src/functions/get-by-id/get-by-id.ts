import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { products } from '../constants';
import { headers } from '../headers';

export const handler: Handler = async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2<string>> => {
  const foundProduct = products.find(product => {
    return product.id === event.pathParameters?.id;
  });

  if (!foundProduct) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ message: 'Not found', payload: null }),
    };
  }

  return {
    statusCode: 200,
    headers,

    body: JSON.stringify({ message: `Product ${foundProduct.id} found`, payload: foundProduct }),
  };
};
