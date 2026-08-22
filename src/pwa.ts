import { registerSW } from 'virtual:pwa-register';

import { logger } from './utils';

if (import.meta.env.PROD) {
  registerSW({
    immediate: true,
    onRegistered: () => logger.info('PWA service worker registered'),
    onRegisterError: (err: unknown) => logger.error('PWA registration failed', { err }),
  });
}
