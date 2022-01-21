import { compareAsc, format, parse } from 'date-fns';
import {Todo, List, parsePriority} from './todolists.js';
import * as UI from './ui.js';

export const lists = (() => {
  let count = 0;
  let lastDisplayedList = null;
  const arr = []; 
  let currentList = null;

  const addList = (list) => {
    arr.push(list);
    list.dataKey = count;
    count++;
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
    currentList,
  }
})();

window.showTodoList = function(dataKey) {
  lists.currentList = lists.getList(dataKey);
  UI.displayTodoList(lists.currentList)
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
  UI.displayTodoList(lists.currentList);
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
  lists.currentList = lists.arr[lists.arr.length-1];
  UI.displayTodoList(lists.arr[lists.arr.length-1]);
}

window.submitTodoForm = function(e, form) {
  e.preventDefault();
  const currentList = lists.getList(form.getAttribute('data-key'));
  currentList.addTodo(new Todo(form.title.value, form.description.value, form['due-date'].value, form.priority.value));
  UI.hideTodoForm();
  UI.displayTodoList(currentList);
  UI.clearTodoForm();
}

window.createNewTodo = function(dataKey) {
  UI.setFormDataKey(dataKey);
  UI.displayTodoForm();
}

window.cancelNewTodo = function() {
  UI.hideTodoForm();
}

window.updatePrio = function (slider) {
  document.getElementById('prio-label').textContent = `Priority: ${parsePriority(slider.value)}`;
}

window.clickTodo = function (dataKey) {
  console.log(lists.getTodo(dataKey).priority);
}



let item1 = new Todo('Wash Car', 'dont forget to wax', '01/01/1999', '1')
let item2 = new Todo('Make dinner', 'Lasagna', '01/01/1999', '2')
let item3 = new Todo('Mow the lawn', '', '01/01/1999', '3')
let item4 = new Todo('Work Out', 'leg day', '01/01/1999', '1')

let defaultList = new List('Default List', 'This is where the description goes...');
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