import HtmlService from './HtmlService.js';
import TodoService from './TodoService.js';

class App {

  constructor() {
    this.logger("Initialized!")
    this.registerServiceWorker();
    this.start();
  }

  logger(...message) {
    console.log("[App] ", ...message);
  }

  start() {
    const todoservice = new TodoService();
    new HtmlService(todoservice);
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
