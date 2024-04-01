import { TransactWriteCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoClient } from './dynamodb';

import { Product, ProductStock, ProductTable } from './product.table';
import { StockDto, StockTable } from './stock.table';

type ProductWithStock = { stock: StockDto; product: Product };

export class ProductStockTable extends DynamoClient {
  constructor(
    private productTable: ProductTable,
    private stockTable: StockTable
  ) {
    super();
  }

  async scan() {
    const productScan = await this.productTable.scan();
    const products: ProductStock[] = [];

    for (const product of productScan) {
      const stock = await this.stockTable.getOne(product.id);
      products.push({ ...product, count: stock.count });
    }

    return products;
  }

  async getOne(id: string) {
    const productResponse = await this.productTable.getOne(id);
    const stockResponse = await this.stockTable.getOne(id);
    console.log(stockResponse);
    return { ...productResponse, count: stockResponse.count };
  }

  async create({ product, stock }: ProductWithStock): Promise<ProductStock> {
    await this.productTable.create(product);
    await this.stockTable.create(stock);

    return this.getOne(product.id);
  }

  async createWithTransaction({ product, stock }: ProductWithStock) {
    const stockCommand = this.stockTable.generatePlainCreateCommand(stock);
    const productCommand = this.productTable.generatePlainPutCommand(product);

    const command = new TransactWriteCommand({
      TransactItems: [{ Put: productCommand }, { Put: stockCommand }],
    });

    await this.documentClient.send(command);

    return this.getOne(product.id);
  }
}
