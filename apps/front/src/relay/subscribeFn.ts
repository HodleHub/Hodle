import { createClient, type Sink } from 'graphql-ws';
import { type GraphQLResponse, Observable, type RequestParameters, type Variables } from 'relay-runtime';
import config from '../config';

const client = createClient({
  url: config.GRAPHQL_SUBSCRIPTION_URL,
});

export const subscribeFn = (operation: RequestParameters, variables: Variables) => {
  return Observable.create<GraphQLResponse>((sink) => {
    if (!operation.text) {
      sink.error(new Error('Operation text cannot be empty'));
      return;
    }

    return client.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
        variables,
      },
      sink as Sink,
    );
  });
};