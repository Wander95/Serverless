import { APIGatewayProxyEventV2, APIGatewayProxyResultV2, Handler } from 'aws-lambda';
import { headers } from '../headers';
import { StockTable } from '../stock.table';

export const handler: Handler = async (
  event: APIGatewayProxyEventV2
): Promise<APIGatewayProxyResultV2<string>> => {
  const stockTable = new StockTable();

  if (!event.pathParameters?.id) return {};

  const stock = await stockTable.getOne(event.pathParameters.id);

  if (!stock) {
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
      message: `Product ${stock.product_id} found`,
      payload: stock,
    }),
  };
};
