import { GetCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoClient } from './dynamodb';
import { PRODUCT_TABLE } from './tables';

export type Product = {
  id: string;
  description: string;
  title: string;
  price: number;
};

export class ProductTable extends DynamoClient {
  async getOne(id: string): Promise<Product> {
    const command = new GetCommand({
      TableName: PRODUCT_TABLE,
      Key: { id },
    });

    const response = await this.documentClient.send(command);
    return response.Item as Product;
  }

  async scan(): Promise<Product[]> {
    const command = new ScanCommand({
      // ProjectionExpression: "#Name, Color, AvgLifeSpan",
      // ExpressionAttributeNames: { "#Name": "Name" },
      TableName: PRODUCT_TABLE,
    });

    const response = await this.documentClient.send(command);
    return response.Items as Product[];
  }

  async create(item: Product) {
    const command = new PutCommand({
      TableName: PRODUCT_TABLE,
      Item: {
        id: item.id,
        description: item.description,
        title: item.title,
        price: item.price,
      },
    });

    await this.documentClient.send(command);
    return await this.getOne(item.id);
  }
}
