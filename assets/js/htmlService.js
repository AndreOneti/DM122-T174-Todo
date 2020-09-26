const DONE = "done";
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
    tasks.forEach(task => this.addToHtmlList(task));
  }

  async saveTask(taskId, isDone) {
    const task = await this.todoService.get(taskId);
    task.done = isDone;
    this.todoService.save(task);
  }

  toggleTask(li) {
    const taskId = +li.getAttribute("data-item-id");
    li.classList.toggle(DONE);
    const isDone = li.classList.contains(DONE);
    this.saveTask(taskId, isDone);
  }

  addToHtmlList(task) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    li.setAttribute("data-item-id", task.id);
    li.addEventListener("click", () => this.toggleTask(li));

    span.textContent = task.description;

    button.textContent = "X";

    if (task.done) {
      li.classList.add(DONE);
    }

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }
}
