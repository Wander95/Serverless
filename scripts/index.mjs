import { faker } from '@faker-js/faker';
import { ESLint } from 'eslint';
import fs from 'node:fs/promises';
import path from 'node:path';

function createESLintInstance() {
  return new ESLint({ useEslintrc: true, fix: true });
}

async function lintAndFix(eslint, filePaths) {
  const results = await eslint.lintFiles(filePaths);

  // Apply automatic fixes and output fixed code
  await ESLint.outputFixes(results);

  return results;
}

function outputLintingResults(results) {
  // Identify the number of problems found
  const problems = results.reduce((acc, result) => acc + result.errorCount + result.warningCount, 0);

  if (problems > 0) {
    console.log('Linting errors found!');
    console.log(results);
  } else {
    console.log('No linting errors found.');
  }
  return results;
}

const generateProducts = productAmount => {
  const _products = [];

  for (let index = 1; index <= productAmount; index++) {
    _products.push({
      count: index,
      id: faker.string.uuid(),
      title: faker.commerce.product(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
    });
  }

  return _products;
};

/**
 * @param {string} somebody
 */
async function executeEslintOnCreatedFile(filePath) {
  const eslint = createESLintInstance();
  const results = await lintAndFix(eslint, filePath);
  outputLintingResults(results);
}

async function main() {
  const products = generateProducts(50);

  const filePath = path.resolve('../src/functions/products.ts');

  await fs.writeFile(filePath, `export const products = ${JSON.stringify(products)}`);

  // * if no eslint installed remove this
  await executeEslintOnCreatedFile(filePath);
}

main();
