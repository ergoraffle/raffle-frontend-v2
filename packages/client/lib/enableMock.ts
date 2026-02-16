import { setupServer } from 'msw/node';

import { getRaffleServiceAPIMock } from './api';

let serverStarted = false;

export const enableMock = async () => {
  if (serverStarted) return;
  const server = setupServer(...getRaffleServiceAPIMock());
  server.listen({ onUnhandledRequest: 'bypass' });
  serverStarted = true;
};
