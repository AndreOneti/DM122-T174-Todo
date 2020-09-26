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
      this.addTask(form.item.value);
      form.reset();
    });
  }

  async addTask(description) {
    const task = { description, done: false };
    const taskId = await this.todoService.save(task);
    task.id = taskId;
    this.addToHtmlList(task);
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

  getId(li) {
    return +li.getAttribute("data-item-id");
  }

  toggleTask(li) {
    const taskId = this.getId(li);
    li.classList.toggle(DONE);
    const isDone = li.classList.contains(DONE);
    this.saveTask(taskId, isDone);
  }

  async deleteTask(li) {
    const taskId = this.getId(li);
    await this.todoService.delete(taskId);
    li.remove();
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
    button.addEventListener('click', event => {
      event.stopPropagation();
      this.deleteTask(li);
    });

    if (task.done) {
      li.classList.add(DONE);
    }

    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
  }
}
