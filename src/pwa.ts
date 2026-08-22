import { registerSW } from 'virtual:pwa-register';

import { logger } from './utils';

// Unregister stale CRA service worker left from pre-migration deployment
if ('serviceWorker' in navigator) {
  void navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const reg of registrations) {
      if (reg.active?.scriptURL.includes('service-worker.ts')) {
        void reg.unregister();
        logger.info('Unregistered stale CRA service worker');
      }
    }
  });
}

if (import.meta.env.PROD) {
  registerSW({
    immediate: true,
    onRegistered: () => logger.info('PWA service worker registered'),
    onRegisterError: (err: unknown) => logger.error('PWA registration failed', { err }),
  });
}
