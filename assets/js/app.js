import HtmlService from './HtmlService.js';

class App {

  constructor() {
    this.logger("Initialized!")
    this.registerServiceWorker();
    new HtmlService();
  }

  logger(...message) {
    console.log("[App] ", ...message);
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      const onsuccess = () => console.log('[Service Worker] Registered');
      const onfailure = () => console.log('[Service Worker] Failed');

      navigator.serviceWorker
        .register('sw.js')
        .then(onsuccess)
        .catch(onfailure);
    }
  }
}

new App();
