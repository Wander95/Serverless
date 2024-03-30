import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';

import { headers } from '@/functions/headers';
import { ProductStockTable } from '@/functions/product-stock';
import { ProductTable } from '@/functions/product.table';
import { StockTable } from '@/functions/stock.table';

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
        message: `Product ${product.id} found`,
        payload: product,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'bob', error }),
    };
  }
};
