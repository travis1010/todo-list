import { compareAsc, format } from 'date-fns';
import {Todo, List} from './todolists.js';
import * as UI from './ui.js';

export const lists = (() => {
  let count = 0;
  let lastDisplayedList = null;
  const arr = []; 
  const addList = (list) => {
    arr.push(list);
    list.dataKey = count;
    count++;
    console.table(list);
  }
  const getList = (dataKey) => {
    const index = arr.findIndex((list) => {
      return list.dataKey == dataKey;
    })
    return arr[index];
  }

  const deleteList = (dataKey) => {
    const index = arr.findIndex((list) => {
      return list.dataKey == dataKey;
    })
    arr.splice(index, 1);
  }

  const getTodo = (dataKey) => {
    let currentTodo = null;
    arr.forEach((list) => {
      list.todoList.forEach((todo) => {
        if (todo.dataKey == dataKey) {
          currentTodo = todo;
        }
      })
    })
    return currentTodo;
  }
  return {
    arr,
    addList,
    getList,
    getTodo,
    deleteList,
    lastDisplayedList,
  }
})();

window.showTodoList = function(dataKey) {
  const currentList = lists.getList(dataKey);
  UI.displayTodoList(currentList)
}

window.createNewList = function() {
  UI.displayNewListForm();
}

window.cancelNewList = function() {
  UI.hideNewListForm();
}

window.clickCheckbox = function(todoDataKey) {
  console.log('todo data key:');
  console.log(todoDataKey);
  const currentTodo = lists.getTodo(todoDataKey);
  currentTodo.toggleComplete();
  UI.displayLists(lists);
}

window.deleteList = function(e, dataKey) {
  e.stopPropagation();
  lists.deleteList(dataKey);
  UI.displayLists(lists);
  if(lists.lastDisplayedList == dataKey) {
    UI.clearTodoArea();
  }
  
}

window.submitListForm = function(e, form) {
  e.preventDefault();
  lists.addList(new List(form.title.value, form.description.value));
  UI.displayLists(lists);
  UI.hideNewListForm();
  UI.clearListForm();
}

window.submitTodoForm = function(e, form) {
  e.preventDefault();
  const currentList = lists.getList(form.getAttribute('data-key'));
  currentList.addTodo(new Todo(form.title.value, form.description.value, 'test', 'test'));
  UI.hideTodoForm();
  UI.displayTodoList(currentList);
  UI.clearTodoForm();
}

window.createNewTodo = function(dataKey) {
  UI.setFormDataKey(dataKey);
  UI.displayTodoForm();
  console.log(dataKey);
  
}

window.cancelNewTodo = function() {
  UI.hideTodoForm();
}



let item1 = new Todo('Wash Car', 'dont forget to wax', 'date', 4)
let item2 = new Todo('Make dinner', 'Lasagna', 'date', 4)
let item3 = new Todo('Mow the lawn', '', 'date', 4)
let item4 = new Todo('Work Out', 'leg day', 'date', 4)



let defaultList = new List('Default', 'This is where the description goes...');
defaultList.addTodo(item1);
defaultList.addTodo(item2);
defaultList.addTodo(item3);
defaultList.addTodo(item4);
defaultList.checkCompletion();

item2.toggleComplete();
item4.toggleComplete();

defaultList.checkCompletion();

lists.addList(defaultList);
UI.displayLists(lists);