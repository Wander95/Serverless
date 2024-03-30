import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import 'dotenv/config';

const clientOptions: DynamoDBClientConfig = {};

if (process.env.ENV === 'dev') {
  if (process.env.DYNAMO_DB_ENDPOINT) {
    clientOptions.endpoint = process.env.DYNAMO_DB_ENDPOINT;
  }

  clientOptions.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  };
}

const client = new DynamoDBClient(clientOptions);

export class DynamoClient {
  protected documentClient: DynamoDBDocumentClient;

  constructor() {
    this.documentClient = DynamoDBDocumentClient.from(client);
  }
}
