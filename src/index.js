import { parseISO, addDays, format, startOfWeek } from 'date-fns';
import {Todo, List, parsePriority} from './todolists.js';
import * as UI from './ui.js';

export const lists = (() => {
  let count = 0;
  let lastDisplayedList = null;
  const arr = []; 
  let currentList = null;
  let todayList = null;
  let weekList = null;

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

  const getWeekList = () => {
    let currentView = false;
    if(lists.weekList) currentView = lists.weekList.detailedView;
    const week = new List('This Week', '', currentView);
    week.dataKey = 'week';
    arr.forEach((list) => {
      list.todoList.forEach((todo) => {
        if (format(startOfWeek(todo.dueDate), 'MM/dd/yyyy') == format(startOfWeek(new Date()), 'MM/dd/yyyy')) {
          week.addTodo(todo);
        }
      })
    });
    return week;
  }

  const saveLists = () => {
    localStorage.clear();
    lists.arr.forEach((list, index) => {
      localStorage.setItem(index, JSON.stringify(list));
    })
  }

  const loadLists = () => {
    Object.keys(localStorage).forEach((key) => {
      const listJSON = JSON.parse(localStorage.getItem(key));
      const list = new List(listJSON["title"], listJSON["description"]);
      lists.addList(list);
      listJSON["todoList"].forEach((todo) => {
        let prio = '2';
        if (todo["priority"] == 'High') {
          prio = '3';
        } else if (todo["priority"] == 'Low') {
          prio = '1';
        }
        const newTodo = new Todo(todo["title"], todo["description"], new Date(todo["dueDate"]), prio);
        newTodo.complete = (todo["complete"] === true);
        list.addTodo(newTodo);
      })
    })
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
    weekList,
    getWeekList,
    saveLists,
    loadLists,
  }
})();

window.sortByPrio = function(listDataKey) {
  if (listDataKey == 'today') {
    lists.currentList = lists.todayList;
  } else if (listDataKey == 'week') {
    lists.currentList = lists.weekList;
  } else {
    lists.currentList = lists.getList(listDataKey);
  }
  
  lists.currentList.sortByPrio();
  UI.displayTodoList(lists.currentList, true);
}

window.sortByDate = function(listDataKey) {
  if (listDataKey == 'week') {
    lists.currentList = lists.weekList;
  } else {
    lists.currentList = lists.getList(listDataKey);
  }
  
  lists.currentList.sortByDate();
  UI.displayTodoList(lists.currentList, true);
}

window.showTodoList = function(dataKey) {
  if (dataKey == 'today') {
    lists.todayList = lists.getTodayList();
    lists.currentList = lists.todayList;
  } else if (dataKey == 'week') {
    lists.weekList = lists.getWeekList();
    lists.currentList = lists.weekList;
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
  lists.saveLists();
}

window.clickTodo = function(todoDataKey) {
  clickCheckbox(todoDataKey);
}

window.deleteList = function(e, dataKey) {
  e.stopPropagation();
  lists.deleteList(dataKey);
  lists.todayList = lists.getTodayList();
  lists.weekList = lists.getWeekList();
  UI.displayLists(lists);
  if(lists.lastDisplayedList == dataKey) {
    UI.clearTodoArea();
  }
  lists.saveLists();
}

window.submitListForm = function(e, form) {
  e.preventDefault();
  lists.addList(new List(form.title.value, form.description.value));
  UI.displayLists(lists);
  UI.hideNewListForm();
  UI.clearListForm();
  lists.currentList = lists.arr[lists.arr.length-1];
  UI.displayTodoList(lists.arr[lists.arr.length-1]);
  lists.saveLists();
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
  lists.saveLists();
}

window.submitTodoForm = function(e, form) {
  e.preventDefault();
  const currentList = lists.getList(form.getAttribute('data-key'));
  currentList.addTodo(new Todo(form.title.value, form.description.value, parseISO(form['due-date'].value), form.priority.value));
  UI.hideTodoForm();
  UI.displayTodoList(currentList);
  UI.clearTodoForm();
  lists.todayList = lists.getTodayList();
  lists.weekList = lists.getWeekList();
  UI.displayLists(lists);
  lists.saveLists();
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
  lists.weekList = lists.getWeekList();
  if(lists.currentList.dataKey == 'today') {
    lists.currentList = lists.todayList;
  } else if (lists.currentList.dataKey == 'week') {
    lists.currentList = lists.weekList;
  }
  UI.displayTodoList(lists.currentList);
  UI.displayLists(lists);
  lists.saveLists();
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
  lists.weekList = lists.getWeekList();
  if(lists.currentList.dataKey == 'today') {
    lists.currentList = lists.todayList;
  } else if (lists.currentList.dataKey == 'week') {
    lists.currentList = lists.weekList;
  }
  UI.displayTodoList(lists.currentList);
  UI.displayLists(lists);
  lists.saveLists();
}

window.updateEditPrio = function (slider) {
  document.getElementById('edit-prio-label').textContent = `Priority: ${parsePriority(slider.value)}`;
}


window.toggleDetails = function (listDataKey, currentView) {
  let list = null;
  if (listDataKey == 'today') {
    list = lists.todayList;
  } else if (listDataKey == 'week') {
    list = lists.weekList;
  } else {
    list = lists.getList(listDataKey)
  }
  list.detailedView = !(currentView === 'true');
  UI.displayTodoList(list);
}

function loadDefaultTodos() {
  let item1 = new Todo('Wash Car', 'Don\'t forget to wax!', new Date(), '1')
  let item2 = new Todo('Get oil changed', '', addDays(new Date(), 3), '2')
  let item3 = new Todo('Mow the lawn', '', new Date(), '3')
  let item4 = new Todo('Work Out', 'Cardio', addDays(new Date(), 2), '1')
  let item5 = new Todo('Set Dentist Appt', 'Make a new appointment with Dr. Crentist.', addDays(new Date(), 22), '3')
  
  let defaultList = new List('Default List', 'Welcome to my Todo List app.  Click the >> arrows to show more details for your todo list.  Click the Priority button to sort by the highest priority.  Click the Due Date button to sort by date.  Click on a todo to cross it off the list.  Delete all lists and refresh to bring back the default list.');
  lists.addList(defaultList);
  
  defaultList.addTodo(item1);
  defaultList.addTodo(item2);
  defaultList.addTodo(item3);
  defaultList.addTodo(item4);
  defaultList.addTodo(item5);
  defaultList.checkCompletion();
  
  item2.toggleComplete();
  item4.toggleComplete();
  defaultList.checkCompletion();
  lists.currentList = defaultList;
  UI.displayTodoList(defaultList);
}


//local storage stuff
function localStorageTest(){
  var test = 'test';
  try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
  } catch(e) {
      return false;
  }
}

function checkLocalStorage() {
  if(localStorageTest()) {
    if(localStorage.getItem('0')) {
      console.log('Lists loaded from localStorage');
      lists.loadLists();
    } else {
      loadDefaultTodos();
    }
  } else {
    loadDefaultTodos();
  }
}



checkLocalStorage();

lists.todayList = lists.getTodayList();
lists.weekList = lists.getWeekList();

UI.displayLists(lists);