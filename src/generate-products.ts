import { faker } from '@faker-js/faker';

import { ProductStockTable } from './functions/product-stock';
import { ProductStock, ProductTable } from './functions/product.table';
import { StockTable } from './functions/stock.table';

const generateProducts = (productAmount: number) => {
  const products: ProductStock[] = [];

  for (let index = 1; index <= productAmount; index++) {
    products.push({
      count: index,
      id: faker.string.uuid(),
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
    });
  }

  return products;
};

async function main() {
  const products = generateProducts(50);

  const productTable = new ProductTable();
  const stockTable = new StockTable();

  const productStockTable = new ProductStockTable(productTable, stockTable);

  for (const product of products) {
    await productStockTable.createWithTransaction({
      product,
      stock: { count: product.count, id: product.id },
    });
  }
}

main();
