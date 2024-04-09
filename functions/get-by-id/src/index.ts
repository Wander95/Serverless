import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';


import { ProductTable } from '@wanderdev/product';
import { ProductStockTable } from '@wanderdev/product-stock';
import { StockTable } from '@wanderdev/stock';

export const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};




export const handler: Handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2<string>> => {
  try {
    if (!event.pathParameters?.id) return {};

    const productTable = new ProductTable();
    const stockTable = new StockTable();

    const productStockTable = new ProductStockTable(productTable, stockTable);
    const product = await productStockTable.getOne(event.pathParameters.id);

    if (!product) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ message: 'Not found', payload: null }),
      };
    }

    return {
      statusCode: 200,
      headers,

      body: JSON.stringify({
        message: `${product.title} product  found`,
        payload: product,
      }),
    };
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'bob', error }),
    };
  }
};
