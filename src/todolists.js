import { compareAsc, format } from 'date-fns';

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }
}

class List {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.complete = false;
    this.todoList = [];
    this.dataKey = null;
  }

  checkCompletion(){
    this.complete =  this.todoList.every((todo) => todo.complete);
  }

  addTodo(todo) {
    this.todoList.push(todo);
  }

  printList() {
    this.todoList.forEach((todo) => console.table(todo));
  }

  get length() {
    return this.todoList.length;
  }

  get numCompleted() {
    let count = 0;
    this.todoList.forEach((todo) => {
      if (todo.complete) {
        count++;
      }
    });
    return count;
  }
}

export {Todo, List};