import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoClient } from '@wanderdev/dynamodb';

export const STOCK_TABLE = 'stock_table';

export type Stock = {
  product_id: string;
  count: number;
};

export type StockDto = Pick<Stock, 'count'> & {
  id: string;
};

export class StockTable extends DynamoClient {
  async getOne(id: string): Promise<Stock> {
    const command = new GetCommand({
      TableName: STOCK_TABLE,
      Key: { product_id: id },
    });

    const response = await this.documentClient.send(command);
    return response.Item as Stock;
  }

  async create(item: StockDto) {
    const command = this.generatePutCommand(item);

    await this.documentClient.send(command);

    return this.getOne(item.id);
  }

  generatePutCommand(item: StockDto) {
    return new PutCommand({
      TableName: STOCK_TABLE,
      Item: { product_id: item.id, count: item.count },
    });
  }

  generatePlainCreateCommand(item: StockDto) {
    return {
      TableName: STOCK_TABLE,
      Item: { product_id: item.id, count: item.count },
    };
  }
}
