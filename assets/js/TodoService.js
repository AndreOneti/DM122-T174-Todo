// const db = new Dexie("indexDB");

// db.version(1).stores({
//   tasks: '++id,description,done'
// });

// db.on('populate', async () => {
//   logger("Creating data only once");
//   await db.tasks.bulkPut([
//     { description: "learn JavaScript", done: false },
//     { description: "learn TypeScript", done: false },
//     { description: "learn PWA", done: false },
//     { description: "learn Java", done: false },
//   ]);
// });

// async function list() {
//   db.tasks.each(task => logger(task));

//   const taskTypeScript = await db.tasks.get(2);
//   taskTypeScript.done = true;
//   db.tasks.put(taskTypeScript);

//   // const tasksDone = await db.tasks
//   //   .filter(task => task.done).toArray();

//   const tasksDone = await db.tasks
//     .where("description").equals("learn Java").toArray();

//   logger(tasksDone);
// }

// list();

var db;

export default class TodoService {

  constructor() {
    this.logger("Initialize Class");
    this.initializeDb();
  }

  logger(...message) {
    console.log("[Todo Service] ", ...message);
  }

  initializeDb() {
    db = new Dexie("todoDB");

    db.version(1).stores({
      tasks: '++id,description'
    });

    db.on('populate', async () => {
      this.logger("Creating data only once");
      await db.tasks.bulkPut([
        { description: "learn JavaScript", done: true },
        { description: "learn TypeScript", done: false },
        { description: "learn PWA", done: false },
        { description: "learn Java", done: true },
      ]);
    });
  }

  getAll() {
    return db.tasks.toArray();
  }

  get(id) {
    return db.tasks.get(id);
  }

  save(task) {
    return db.tasks.put(task);
  }

  delete(id) {
    return db.tasks.delete(id);
  }
}
