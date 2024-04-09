import { APIGatewayProxyResultV2, Handler } from 'aws-lambda';


import { ProductTable } from '@wanderdev/product';
import { ProductStockTable } from '@wanderdev/product-stock';
import { StockTable } from '@wanderdev/stock';

export const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};


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
    console.log('error', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ message: 'bob', error }),
    };
  }
};
