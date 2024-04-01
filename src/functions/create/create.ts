import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';

import { ProductStockTable } from '@/functions/product-stock';
import { ProductTable } from '@/functions/product.table';
import { StockTable } from '@/functions/stock.table';

export const handler: Handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2<string>> => {
  try {
    if (!event.body)
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `Validation error` }),
      };

    const body = JSON.parse(event.body);
    console.log(body);

    const productTable = new ProductTable();
    const stockTable = new StockTable();

    const productStockTable = new ProductStockTable(productTable, stockTable);
    const product = await productStockTable.createWithTransaction({ product: body, stock: body });

    return {
      statusCode: 201,
      body: JSON.stringify({
        payload: product,
        message: `Product Created`,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'bobo', error }),
    };
  }
};
