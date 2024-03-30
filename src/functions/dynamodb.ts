import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import 'dotenv/config';

const clientOptions: DynamoDBClientConfig = {};

if (process.env.ENV === 'dev') {
  clientOptions.endpoint = process.env.DYNAMO_DB_ENDPOINT;
}

const client = new DynamoDBClient(clientOptions);

export class DynamoClient {
  protected documentClient: DynamoDBDocumentClient;

  constructor() {
    this.documentClient = DynamoDBDocumentClient.from(client);
  }
}
