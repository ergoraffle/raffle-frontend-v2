import { setupServer } from 'msw/node';

import { getRaffleServiceAPIMock } from './api';

const server = setupServer(...getRaffleServiceAPIMock());

export const withMock = async <T>(fn: () => Promise<T>) => {
  server.listen({ onUnhandledRequest: 'bypass' });
  try {
    return await fn();
  } finally {
    server.close();
  }
};
