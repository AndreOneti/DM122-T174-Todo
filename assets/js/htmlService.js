export default class HtmlService {

  constructor(todoService) {
    this.logger("Html service instantiated");
    this.todoService = todoService;
    this.bindingFormEvent();
    this.listTasks();
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

  async listTasks() {
    const tasks = await this.todoService.getAll();
    this.logger(tasks);
  }
}
