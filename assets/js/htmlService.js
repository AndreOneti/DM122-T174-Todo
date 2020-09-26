export default class HtmlService {

  constructor() {
    this.logger("Html service instantiated");
    this.bindingFormEvent();
  }

  logger(...message) {
    console.log("[Html Service] ", ...message);
  }

  bindingFormEvent() {
    const form = document.querySelector('form');
    form.addEventListener('submit', event => {
      event.preventDefault();
      this.logger(form.item.value);
      form.reset();
    });
  }
}
