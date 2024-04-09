import { GetCommand, PutCommand, ScanCommand, ScanCommandInput } from '@aws-sdk/lib-dynamodb';
import { DynamoClient } from '@wanderdev/dynamodb';
import { Stock } from '@wanderdev/stock';


export const PRODUCT_TABLE = 'product_table';

export type Product = {
  id: string;
  description: string;
  title: string;
  price: number;
};

export type ProductStock = Product & Pick<Stock, 'count'>;

export class ProductTable extends DynamoClient {
  async getOne(id: string): Promise<Product> {
    const command = new GetCommand({
      TableName: PRODUCT_TABLE,
      Key: { id },
    });

    const response = await this.documentClient.send(command);
    return response.Item as Product;
  }

  async scan(options?: ScanCommandInput): Promise<Product[]> {
    const command = new ScanCommand({
      // ProjectionExpression: "#Name, Color, AvgLifeSpan",
      // ExpressionAttributeNames: { "#Name": "Name" },
      ...options,
      TableName: PRODUCT_TABLE,
    });

    const response = await this.documentClient.send(command);
    return response.Items as Product[];
  }

  async create(item: Product) {
    const command = this.generatePutCommand(item);

    await this.documentClient.send(command);
    return await this.getOne(item.id);
  }

  generatePutCommand(item: Product) {
    return new PutCommand(this.generatePlainPutCommand(item));
  }

  generatePlainPutCommand(item: Product) {
    return {
      TableName: PRODUCT_TABLE,
      Item: {
        id: item.id,
        description: item.description,
        title: item.title,
        price: item.price,
      },
    };
  }
}
