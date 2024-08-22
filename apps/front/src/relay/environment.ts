import { Environment, Store, RecordSource } from 'relay-runtime';

import { createNetwork } from './network';

const network = createNetwork();

export const environment = new Environment({
  network,
  store: new Store(new RecordSource(), {}),
});