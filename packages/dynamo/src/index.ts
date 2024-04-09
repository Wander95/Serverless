import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import 'dotenv/config';

const clientOptions: DynamoDBClientConfig = {};

if (process.env.ENV === 'dev') {
  if (process.env.DYNAMO_DB_ENDPOINT) {
    clientOptions.endpoint = process.env.DYNAMO_DB_ENDPOINT;
  }


}

export const client = new DynamoDBClient(clientOptions);

export class DynamoClient {
  protected documentClient: DynamoDBDocumentClient;

  constructor() {
    this.documentClient = DynamoDBDocumentClient.from(client);
  }
}
