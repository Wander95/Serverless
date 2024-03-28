import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoClient } from './dynamodb';
import { STOCK_TABLE } from './tables';

export type Stock = {
  product_id: string;
  count: number;
};

type StockDto = Pick<Stock,'count'> & {
  id: string
}

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
    const command = new PutCommand({
      TableName: STOCK_TABLE,
      Item: { product_id: item.id, count: item.count },
    });

    await this.documentClient.send(command);
  
    return this.getOne(item.id);
  }
}
