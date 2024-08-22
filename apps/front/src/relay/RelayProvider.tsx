import type { ReactNode } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';

import { environment } from './environment';

type RelayProviderProps = {
  children: ReactNode;
};

const RelayProvider = ({ children }: RelayProviderProps) => {
  return <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>;
};

export default RelayProvider;