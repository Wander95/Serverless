import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';

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
    console.log(body.id);

    const productTable = new ProductTable();
    const stockTable = new StockTable();

    const productItem = await productTable.create(body);
    const stockItem = await stockTable.create(body);

    return {
      statusCode: 201,
      body: JSON.stringify({
        payload: { ...stockItem, ...productItem },
        message: `Product Created`,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'bobo',
    };
  }
};
