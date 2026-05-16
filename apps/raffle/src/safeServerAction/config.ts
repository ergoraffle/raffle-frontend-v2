import * as Sentry from '@sentry/nextjs';

import { createSafeAction } from './safeServerAction';

export const { wrap, unwrap } = createSafeAction({
  errors: {},
  async onError(error, traceKey, args) {
    if (typeof window !== 'undefined') return;

    Sentry.withScope((scope) => {
      scope.setTag('layer', 'server-action');

      scope.setTag('action', traceKey);

      scope.setContext('data', { traceKey, args });

      scope.setLevel('error');

      Sentry.captureException(error);
    });
  }
});
