import { compareAsc } from 'date-fns';

let todoCount = 0;

class Todo {
  
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = parsePriority(priority)
    this.complete = false;
    this.dataKey = todoCount;
    this.listDataKey = null;
    todoCount++;
  }

  toggleComplete() {
    this.complete = !this.complete;
  }

  get prioToNum() {
    const key = { 'Low': 1, 'Medium': 2, 'High': 3 };
    return key[this.priority];
  }
  
}

function parsePriority(num) {
  let currentPrio = null;
  switch (num) {
    case '1':
      currentPrio = 'Low';
      break;
    case '2':
      currentPrio = 'Medium';
      break;
    case '3':
      currentPrio = 'High';
      break;
  }
  return currentPrio || 'Medium';
}


class List {
  constructor(title, description, detailedView = false) {
    this.title = title;
    this.description = description;
    this.complete = false;
    this.todoList = [];
    this.dataKey = null;
    this.detailedView = detailedView;
  }

  deleteTodo(dataKey) {
    let index = this.todoList.findIndex((todo) => todo.dataKey == dataKey)
    this.todoList.splice(index, 1)
  }

  checkCompletion(){
    this.complete =  this.todoList.every((todo) => todo.complete);
  }

  addTodo(todo) {
    if(todo.listDataKey === null) {
      todo.listDataKey = this.dataKey;
    }
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

  sortByPrio() {
    this.todoList.sort((a, b) => b.prioToNum - a.prioToNum)
  }

  sortByDate() {
    this.todoList.sort((a, b) => compareAsc(a.dueDate, b.dueDate));
  }
}

export {Todo, List, parsePriority};