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
}

export {Todo, List};