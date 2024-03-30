import { APIGatewayProxyResultV2, Handler } from 'aws-lambda';

import { headers } from '@/functions/headers';
import { ProductStockTable } from '@/functions/product-stock';
import { ProductTable } from '@/functions/product.table';
import { StockTable } from '@/functions/stock.table';

export const handler: Handler = async (): Promise<APIGatewayProxyResultV2<string>> => {
  try {
    const productTable = new ProductTable();
    const stockTable = new StockTable();

    const productStockTable = new ProductStockTable(productTable, stockTable);
    const products = await productStockTable.scan();

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
