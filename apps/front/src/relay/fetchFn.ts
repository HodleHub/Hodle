import { createClient } from 'graphql-http';
import { type RequestParameters, type Variables, Observable, type GraphQLResponse } from 'relay-runtime';
import config from '../config';

const client = createClient({
  url: config.GRAPHQL_URL,
  credentials: 'include',
});


console.log(config)

export const fetchFn = (operation: RequestParameters, variables: Variables) => {
  const observable = Observable.create<unknown>((sink) => {
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
      sink,
    );
  }) as Observable<GraphQLResponse>;

  return observable.map((result) => {
    if ('errors' in result) {
      const [error] = result.errors || [];

      if (error) {
        throw new Error(error.message);
      }
    }

    return result;
  });
};