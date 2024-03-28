import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import 'dotenv/config';

let clientOptions: DynamoDBClientConfig = {};

if (process.env.ENV === 'dev') {
  clientOptions.endpoint = 'http://192.168.0.4:8000';
}

console.log(process.env.ENV)

const client = new DynamoDBClient(clientOptions);

export class DynamoClient {
  protected documentClient: DynamoDBDocumentClient;

  constructor() {
    this.documentClient = DynamoDBDocumentClient.from(client);
  }
}
