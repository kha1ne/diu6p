// Kill switch: unregisters this stale CRA service worker then reloads
self.addEventListener('install', () => {
  void self.skipWaiting();
});
self.addEventListener('activate', () => {
  void self.registration
    .unregister()
    .then(() => self.clients.matchAll())
    .then(clients => {
      clients.forEach(client => void client.navigate(client.url));
    });
});
