import { QueryResponseCache, Network, type RequestParameters, type Variables, type CacheConfig } from 'relay-runtime';

import { fetchFn } from './fetchFn';
import { subscribeFn } from './subscribeFn';

const ONE_MINUTE_IN_MS = 60 * 1000;

export const createNetwork = () => {
  const responseCache = new QueryResponseCache({
    size: 100,
    ttl: ONE_MINUTE_IN_MS,
  });

  const fetch = (operation: RequestParameters, variables: Variables, cacheConfig: CacheConfig) => {
    const isQuery = operation.operationKind === 'query';
    const forceFetch = cacheConfig.force;

    if (operation.id && isQuery && !forceFetch) {
      const fromCache = responseCache.get(operation.id, variables);

      if (fromCache !== null) {
        return Promise.resolve(fromCache);
      }
    }

    return fetchFn(operation, variables);
  };

  const network = Network.create(fetch, subscribeFn);

  return network;
};