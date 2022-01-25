import { parseISO, addDays, format } from 'date-fns';
import {Todo, List, parsePriority} from './todolists.js';
import * as UI from './ui.js';

export const lists = (() => {
  let count = 0;
  let lastDisplayedList = null;
  const arr = []; 
  let currentList = null;
  let todayList = null;

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

  const getTodayList = () => {
    let currentView = false;
    if(lists.todayList) currentView = lists.todayList.detailedView;
    const today = new List('Today', '', currentView);
    today.dataKey = 'today';
    arr.forEach((list) => {
      list.todoList.forEach((todo) => {
        if (format(todo.dueDate, 'MM/dd/yyyy') == format(new Date(), 'MM/dd/yyyy')) {
          today.addTodo(todo);
        }
      })
    });
    return today;
  }

  const getWeeksTodos = () => {

  }

  return {
    arr,
    addList,
    getList,
    getTodo,
    deleteList,
    lastDisplayedList,
    currentList,
    getTodayList,
    todayList,
    getWeeksTodos,
  }
})();

window.sortByPrio = function(listDataKey) {
  if (listDataKey == 'today') {
    lists.currentList = lists.todayList;
  } else {
    lists.currentList = lists.getList(listDataKey);
  }
  
  lists.currentList.sortByPrio();
  UI.displayTodoList(lists.currentList, true);
}

window.sortByDate = function(listDataKey) {
  lists.currentList = lists.getList(listDataKey);
  lists.currentList.sortByDate();
  UI.displayTodoList(lists.currentList, true);
}

window.showTodoList = function(dataKey) {
  if (dataKey == 'today') {
    lists.todayList = lists.getTodayList();
    lists.currentList = lists.todayList;
  } else {
    lists.currentList = lists.getList(dataKey);
  }
  UI.displayTodoList(lists.currentList)
}

window.createNewList = function() {
  UI.displayNewListForm();
}

window.cancelNewList = function() {
  UI.hideNewListForm();
}

window.clickCheckbox = function(todoDataKey) {
  const currentTodo = lists.getTodo(todoDataKey);
  currentTodo.toggleComplete();
  UI.displayTodoList(lists.currentList);
  UI.displayLists(lists);
}

window.clickTodo = function(todoDataKey) {
  clickCheckbox(todoDataKey);
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

window.submitEditListForm = function(e, form) {
  e.preventDefault();
  const currentList = lists.getList(form.getAttribute('data-key'));
  currentList.title = form.title.value;
  currentList.description = form.description.value;
  UI.hideEditListForm();
  UI.displayTodoList(currentList);
  UI.clearListForm();
  UI.displayLists(lists);
}

window.submitTodoForm = function(e, form) {
  e.preventDefault();
  const currentList = lists.getList(form.getAttribute('data-key'));
  currentList.addTodo(new Todo(form.title.value, form.description.value, parseISO(form['due-date'].value), form.priority.value));
  UI.hideTodoForm();
  UI.displayTodoList(currentList);
  UI.clearTodoForm();
  lists.todayList = lists.getTodayList();
  UI.displayLists(lists);
}

window.submitEditTodoForm = function(e, form) {
  e.preventDefault();
  const currentTodo = lists.getTodo(form.getAttribute('data-key'));
  currentTodo.title = form.title.value;
  currentTodo.description = form.description.value;
  currentTodo.dueDate = parseISO(form['due-date'].value);
  currentTodo.priority = parsePriority(form.priority.value);
  UI.hideEditTodoForm();
  lists.todayList = lists.getTodayList();
  if(lists.currentList.dataKey == 'today') {
    lists.currentList = lists.todayList;
  }
  UI.displayTodoList(lists.currentList);
  UI.displayLists(lists);
}

window.createNewTodo = function(dataKey) {
  UI.setFormDataKey(dataKey);
  UI.displayTodoForm();
}

window.cancelNewTodo = function() {
  UI.hideTodoForm();
}

window.cancelEditTodo = function() {
  UI.hideEditTodoForm();
}

window.updatePrio = function (slider) {
  document.getElementById('prio-label').textContent = `Priority: ${parsePriority(slider.value)}`;
}

window.editTodo = function (dataKey) {
  UI.setEditFormDataKey(dataKey);
  UI.displayEditTodoForm(lists.getTodo(dataKey));
}

window.editList = function (dataKey) {
  UI.setEditListFormDataKey(dataKey);
  UI.displayEditListForm(lists.getList(dataKey));
}

window.cancelEditList = function () {
  UI.hideEditListForm();
}

window.deleteTodo = function (dataKey) {
  lists.getList(lists.getTodo(dataKey).listDataKey).deleteTodo(dataKey);
  lists.todayList = lists.getTodayList();
  if(lists.currentList.dataKey == 'today') {
    lists.currentList = lists.todayList;
  }
  UI.displayTodoList(lists.currentList);
  UI.displayLists(lists);
}

window.updateEditPrio = function (slider) {
  document.getElementById('edit-prio-label').textContent = `Priority: ${parsePriority(slider.value)}`;
}


window.toggleDetails = function (listDataKey, currentView) {
  let list = null;
  if (listDataKey == 'today') {
    list = lists.todayList;
  } else {
    list = lists.getList(listDataKey)
  }
  list.detailedView = !(currentView === 'true');
  UI.displayTodoList(list);
}


let item1 = new Todo('Wash Car', 'Don\'t forget to wax!', new Date(), '1')
let item2 = new Todo('Get oil changed', '', addDays(new Date(), 3), '2')
let item3 = new Todo('Mow the lawn', '', new Date(), '3')
let item4 = new Todo('Work Out', 'Cardio', addDays(new Date(), 2), '1')

let defaultList = new List('Default List', 'Welcome to my Todo List app.  Click the >> arrows to show more details for your todo list.  Click the Priority button to sort by the highest priority.  Click the Due Date button to sort by date.  Click on a todo to cross it off the list.');
lists.addList(defaultList);

console.log(defaultList);

defaultList.addTodo(item1);
defaultList.addTodo(item2);
defaultList.addTodo(item3);
defaultList.addTodo(item4);
defaultList.checkCompletion();
console.log(item1);

item2.toggleComplete();
item4.toggleComplete();

defaultList.checkCompletion();

lists.todayList = lists.getTodayList();

UI.displayLists(lists);
UI.displayTodoList(defaultList);


