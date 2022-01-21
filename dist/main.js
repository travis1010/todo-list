/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lists": () => (/* binding */ lists)
/* harmony export */ });
/* harmony import */ var _todolists_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todolists.js */ "./src/todolists.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");




const lists = (() => {
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
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayTodoList(lists.currentList)
}

window.createNewList = function() {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayNewListForm();
}

window.cancelNewList = function() {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.hideNewListForm();
}

window.clickCheckbox = function(todoDataKey) {
  console.log('todo data key:');
  console.log(todoDataKey);
  const currentTodo = lists.getTodo(todoDataKey);
  currentTodo.toggleComplete();
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayTodoList(lists.currentList);
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayLists(lists);
}

window.deleteList = function(e, dataKey) {
  e.stopPropagation();
  lists.deleteList(dataKey);
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayLists(lists);
  if(lists.lastDisplayedList == dataKey) {
    _ui_js__WEBPACK_IMPORTED_MODULE_1__.clearTodoArea();
  }
  
}

window.submitListForm = function(e, form) {
  e.preventDefault();
  lists.addList(new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.List(form.title.value, form.description.value));
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayLists(lists);
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.hideNewListForm();
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.clearListForm();
  lists.currentList = lists.arr[lists.arr.length-1];
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayTodoList(lists.arr[lists.arr.length-1]);
}

window.submitTodoForm = function(e, form) {
  e.preventDefault();
  const currentList = lists.getList(form.getAttribute('data-key'));
  currentList.addTodo(new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo(form.title.value, form.description.value, form['due-date'].value, form.priority.value));
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.hideTodoForm();
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayTodoList(currentList);
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.clearTodoForm();
}

window.createNewTodo = function(dataKey) {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.setFormDataKey(dataKey);
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayTodoForm();
}

window.cancelNewTodo = function() {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.hideTodoForm();
}

window.updatePrio = function (slider) {
  document.getElementById('prio-label').textContent = `Priority: ${(0,_todolists_js__WEBPACK_IMPORTED_MODULE_0__.parsePriority)(slider.value)}`;
}

window.clickTodo = function (dataKey) {
  console.log(lists.getTodo(dataKey).priority);
}



let item1 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('Wash Car', 'dont forget to wax', '01/01/1999', '1')
let item2 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('Make dinner', 'Lasagna', '01/01/1999', '2')
let item3 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('Mow the lawn', '', '01/01/1999', '3')
let item4 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('Work Out', 'leg day', '01/01/1999', '1')

let defaultList = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.List('Default List', 'This is where the description goes...');
defaultList.addTodo(item1);
defaultList.addTodo(item2);
defaultList.addTodo(item3);
defaultList.addTodo(item4);
defaultList.checkCompletion();

item2.toggleComplete();
item4.toggleComplete();

defaultList.checkCompletion();

lists.addList(defaultList);
_ui_js__WEBPACK_IMPORTED_MODULE_1__.displayLists(lists);

/***/ }),

/***/ "./src/todolists.js":
/*!**************************!*\
  !*** ./src/todolists.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Todo": () => (/* binding */ Todo),
/* harmony export */   "List": () => (/* binding */ List),
/* harmony export */   "parsePriority": () => (/* binding */ parsePriority)
/* harmony export */ });


let todoCount = 0;

class Todo {
  
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = parsePriority(priority)
    this.complete = false;
    this.dataKey = todoCount;
    todoCount++;
  }

  toggleComplete() {
    this.complete = !this.complete;
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



/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayNewListForm": () => (/* binding */ displayNewListForm),
/* harmony export */   "hideNewListForm": () => (/* binding */ hideNewListForm),
/* harmony export */   "displayLists": () => (/* binding */ displayLists),
/* harmony export */   "clearListForm": () => (/* binding */ clearListForm),
/* harmony export */   "displayTodoList": () => (/* binding */ displayTodoList),
/* harmony export */   "displayTodoForm": () => (/* binding */ displayTodoForm),
/* harmony export */   "hideTodoForm": () => (/* binding */ hideTodoForm),
/* harmony export */   "setFormDataKey": () => (/* binding */ setFormDataKey),
/* harmony export */   "clearTodoArea": () => (/* binding */ clearTodoArea),
/* harmony export */   "clearTodoForm": () => (/* binding */ clearTodoForm)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! . */ "./src/index.js");


function displayNewListForm() {
  document.getElementById('list-form-container').style.display = 'flex';
}

function hideNewListForm() {
  document.getElementById('list-form-container').style.display = 'none';
}

function displayTodoForm() {
  document.getElementById('todo-form-container').style.display = 'flex';
}

function hideTodoForm() {
  document.getElementById('todo-form-container').style.display = 'none';
}

function displayLists(lists) {
  const listList = document.getElementById('list-list');

  while (listList.firstChild) {
    listList.removeChild(listList.firstChild);
  }

  lists.arr.forEach((list) => {
    const newList = createListItem(list);
    listList.appendChild(newList);
  })
  
}

function setFormDataKey(dataKey) {
  const todoForm = document.getElementById('todo-form');
  todoForm.setAttribute('data-key', dataKey);
}

function createListItem(list){
  const newList = document.createElement('li');
  const listName = document.createElement('div');
  listName.textContent = list.title;
  listName.classList.add('list-name');
  const rightSideOfItem = document.createElement('div');
  const amountCompleted = document.createElement('span');
  amountCompleted.textContent = `${list.numCompleted}/${list.length}`

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('onclick', `deleteList(event, ${list.dataKey})`);
  deleteButton.classList.add('delete-btn');

  const trashIcon = document.createElement('i');
  trashIcon.classList.add('fas');
  trashIcon.classList.add('fa-trash');
  deleteButton.appendChild(trashIcon);

  rightSideOfItem.appendChild(amountCompleted);
  rightSideOfItem.appendChild(deleteButton);

  newList.appendChild(listName);
  newList.appendChild(rightSideOfItem);
  newList.classList.add('list-item');
  newList.setAttribute('data-key', list.dataKey);
  newList.setAttribute('onclick', `showTodoList(${list.dataKey})`);
  return newList;
}

function displayTodoList(list) {
  const todoArea = document.getElementById('todo-area');
  while(todoArea.firstChild) {
    todoArea.removeChild(todoArea.firstChild);
  }
  const todoListContainer = document.createElement('div');
  todoListContainer.classList.add('todo-list-container');

  const header = document.createElement('h2');
  header.textContent = list.title;
  const description = document.createElement('p');
  description.textContent = list.description;

  const column1 = document.createElement('div');
  const column2 = document.createElement('div');
  const column3 = document.createElement('div');

  const todoListTable = document.createElement('div');
  todoListTable.id = 'todo-list-table';

  const addItem = document.createElement('button');
  addItem.id = 'add-todo-btn';
  addItem.textContent = 'Add Todo';
  addItem.setAttribute('onclick', `createNewTodo(${list.dataKey})`)

  
  const todoLabel = document.createElement('div');
  todoLabel.textContent = 'Todo';
  todoLabel.classList.add('table-label');

  column1.appendChild(todoLabel);
  
  const prioLabel = document.createElement('div');
  prioLabel.textContent = 'Priority';
  prioLabel.classList.add('table-label');

  column2.appendChild(prioLabel);

  const dateLabel = document.createElement('div');
  dateLabel.textContent = 'Due Date';
  dateLabel.classList.add('table-label');

  column3.appendChild(dateLabel);

  list.todoList.forEach((todo) => {
    const newTodo = createTodoItem(todo);
    column1.appendChild(newTodo.column1);
    column2.appendChild(newTodo.column2);
    column3.appendChild(newTodo.column3);
  })

  column1.classList.add('column1');

  todoListTable.appendChild(column1);
  todoListTable.appendChild(column2);
  todoListTable.appendChild(column3);

  todoListContainer.appendChild(header);
  todoListContainer.appendChild(description);
  todoListContainer.appendChild(addItem);
  todoListContainer.appendChild(todoListTable);
  

  todoArea.appendChild(todoListContainer);

  ___WEBPACK_IMPORTED_MODULE_0__.lists.lastDisplayedList = list.dataKey;
}

function createTodoItem(todo) {
  const newTodo = document.createElement('li');
  newTodo.setAttribute('data-key', todo.dataKey);
  const leftSide = document.createElement('div');

  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const title = document.createElement('span');
  title.textContent = todo.title;
  title.classList.add('todo-title');
  
  if (todo.complete) {
    checkBox.checked = true;
    title.classList.add('completed-title');
  }
  
  checkBox.setAttribute('onclick', `clickCheckbox(${todo.dataKey})`)

  

  const priorityFlag = document.createElement('div');
  priorityFlag.classList.add('prio-flag');

  switch (todo.priority) {
    case 'Low':
      priorityFlag.classList.add('low-priority');
      priorityFlag.textContent = 'Low';
      break;
    case 'Medium':
      priorityFlag.classList.add('medium-priority');
      priorityFlag.textContent = 'Medium';
      break;
    case 'High':
      priorityFlag.classList.add('high-priority');
      priorityFlag.textContent = 'High';
      break;
  }

  

  leftSide.appendChild(checkBox);
  leftSide.appendChild(title);

  const date = document.createElement('div');
  date.textContent = todo.dueDate;

  leftSide.classList.add('todo-cell');
  priorityFlag.classList.add('todo-cell');
  date.classList.add('todo-cell');
  
  priorityFlag.classList.add('center-cell');
  date.classList.add('center-cell');


  return {column1: leftSide, column2: priorityFlag, column3: date};
}

function clearListForm() {
  const listForm = document.getElementById('list-form');
  listForm.title.value = '';
  listForm.description.value = '';
}

function clearTodoForm() {
  const todoForm = document.getElementById('todo-form');
  todoForm.title.value = '';
  todoForm.description.value = '';
  todoForm['due-date'].value = '';
  todoForm.priority.value = '';
}

function clearTodoArea() {
  const todoArea = document.getElementById('todo-area');
  while(todoArea.firstChild) {
    todoArea.removeChild(todoArea.firstChild);
  }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb2xpc3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0LCBwYXJzZSB9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7VG9kbywgTGlzdCwgcGFyc2VQcmlvcml0eX0gZnJvbSAnLi90b2RvbGlzdHMuanMnO1xuaW1wb3J0ICogYXMgVUkgZnJvbSAnLi91aS5qcyc7XG5cbmV4cG9ydCBjb25zdCBsaXN0cyA9ICgoKSA9PiB7XG4gIGxldCBjb3VudCA9IDA7XG4gIGxldCBsYXN0RGlzcGxheWVkTGlzdCA9IG51bGw7XG4gIGNvbnN0IGFyciA9IFtdOyBcbiAgbGV0IGN1cnJlbnRMaXN0ID0gbnVsbDtcblxuICBjb25zdCBhZGRMaXN0ID0gKGxpc3QpID0+IHtcbiAgICBhcnIucHVzaChsaXN0KTtcbiAgICBsaXN0LmRhdGFLZXkgPSBjb3VudDtcbiAgICBjb3VudCsrO1xuICB9XG4gIGNvbnN0IGdldExpc3QgPSAoZGF0YUtleSkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gYXJyLmZpbmRJbmRleCgobGlzdCkgPT4ge1xuICAgICAgcmV0dXJuIGxpc3QuZGF0YUtleSA9PSBkYXRhS2V5O1xuICAgIH0pXG4gICAgcmV0dXJuIGFycltpbmRleF07XG4gIH1cblxuICBjb25zdCBkZWxldGVMaXN0ID0gKGRhdGFLZXkpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGFyci5maW5kSW5kZXgoKGxpc3QpID0+IHtcbiAgICAgIHJldHVybiBsaXN0LmRhdGFLZXkgPT0gZGF0YUtleTtcbiAgICB9KVxuICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICB9XG5cbiAgY29uc3QgZ2V0VG9kbyA9IChkYXRhS2V5KSA9PiB7XG4gICAgbGV0IGN1cnJlbnRUb2RvID0gbnVsbDtcbiAgICBhcnIuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgICAgbGlzdC50b2RvTGlzdC5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgIGlmICh0b2RvLmRhdGFLZXkgPT0gZGF0YUtleSkge1xuICAgICAgICAgIGN1cnJlbnRUb2RvID0gdG9kbztcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICAgIHJldHVybiBjdXJyZW50VG9kbztcbiAgfVxuICByZXR1cm4ge1xuICAgIGFycixcbiAgICBhZGRMaXN0LFxuICAgIGdldExpc3QsXG4gICAgZ2V0VG9kbyxcbiAgICBkZWxldGVMaXN0LFxuICAgIGxhc3REaXNwbGF5ZWRMaXN0LFxuICAgIGN1cnJlbnRMaXN0LFxuICB9XG59KSgpO1xuXG53aW5kb3cuc2hvd1RvZG9MaXN0ID0gZnVuY3Rpb24oZGF0YUtleSkge1xuICBsaXN0cy5jdXJyZW50TGlzdCA9IGxpc3RzLmdldExpc3QoZGF0YUtleSk7XG4gIFVJLmRpc3BsYXlUb2RvTGlzdChsaXN0cy5jdXJyZW50TGlzdClcbn1cblxud2luZG93LmNyZWF0ZU5ld0xpc3QgPSBmdW5jdGlvbigpIHtcbiAgVUkuZGlzcGxheU5ld0xpc3RGb3JtKCk7XG59XG5cbndpbmRvdy5jYW5jZWxOZXdMaXN0ID0gZnVuY3Rpb24oKSB7XG4gIFVJLmhpZGVOZXdMaXN0Rm9ybSgpO1xufVxuXG53aW5kb3cuY2xpY2tDaGVja2JveCA9IGZ1bmN0aW9uKHRvZG9EYXRhS2V5KSB7XG4gIGNvbnNvbGUubG9nKCd0b2RvIGRhdGEga2V5OicpO1xuICBjb25zb2xlLmxvZyh0b2RvRGF0YUtleSk7XG4gIGNvbnN0IGN1cnJlbnRUb2RvID0gbGlzdHMuZ2V0VG9kbyh0b2RvRGF0YUtleSk7XG4gIGN1cnJlbnRUb2RvLnRvZ2dsZUNvbXBsZXRlKCk7XG4gIFVJLmRpc3BsYXlUb2RvTGlzdChsaXN0cy5jdXJyZW50TGlzdCk7XG4gIFVJLmRpc3BsYXlMaXN0cyhsaXN0cyk7XG59XG5cbndpbmRvdy5kZWxldGVMaXN0ID0gZnVuY3Rpb24oZSwgZGF0YUtleSkge1xuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICBsaXN0cy5kZWxldGVMaXN0KGRhdGFLZXkpO1xuICBVSS5kaXNwbGF5TGlzdHMobGlzdHMpO1xuICBpZihsaXN0cy5sYXN0RGlzcGxheWVkTGlzdCA9PSBkYXRhS2V5KSB7XG4gICAgVUkuY2xlYXJUb2RvQXJlYSgpO1xuICB9XG4gIFxufVxuXG53aW5kb3cuc3VibWl0TGlzdEZvcm0gPSBmdW5jdGlvbihlLCBmb3JtKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGlzdHMuYWRkTGlzdChuZXcgTGlzdChmb3JtLnRpdGxlLnZhbHVlLCBmb3JtLmRlc2NyaXB0aW9uLnZhbHVlKSk7XG4gIFVJLmRpc3BsYXlMaXN0cyhsaXN0cyk7XG4gIFVJLmhpZGVOZXdMaXN0Rm9ybSgpO1xuICBVSS5jbGVhckxpc3RGb3JtKCk7XG4gIGxpc3RzLmN1cnJlbnRMaXN0ID0gbGlzdHMuYXJyW2xpc3RzLmFyci5sZW5ndGgtMV07XG4gIFVJLmRpc3BsYXlUb2RvTGlzdChsaXN0cy5hcnJbbGlzdHMuYXJyLmxlbmd0aC0xXSk7XG59XG5cbndpbmRvdy5zdWJtaXRUb2RvRm9ybSA9IGZ1bmN0aW9uKGUsIGZvcm0pIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RzLmdldExpc3QoZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JykpO1xuICBjdXJyZW50TGlzdC5hZGRUb2RvKG5ldyBUb2RvKGZvcm0udGl0bGUudmFsdWUsIGZvcm0uZGVzY3JpcHRpb24udmFsdWUsIGZvcm1bJ2R1ZS1kYXRlJ10udmFsdWUsIGZvcm0ucHJpb3JpdHkudmFsdWUpKTtcbiAgVUkuaGlkZVRvZG9Gb3JtKCk7XG4gIFVJLmRpc3BsYXlUb2RvTGlzdChjdXJyZW50TGlzdCk7XG4gIFVJLmNsZWFyVG9kb0Zvcm0oKTtcbn1cblxud2luZG93LmNyZWF0ZU5ld1RvZG8gPSBmdW5jdGlvbihkYXRhS2V5KSB7XG4gIFVJLnNldEZvcm1EYXRhS2V5KGRhdGFLZXkpO1xuICBVSS5kaXNwbGF5VG9kb0Zvcm0oKTtcbn1cblxud2luZG93LmNhbmNlbE5ld1RvZG8gPSBmdW5jdGlvbigpIHtcbiAgVUkuaGlkZVRvZG9Gb3JtKCk7XG59XG5cbndpbmRvdy51cGRhdGVQcmlvID0gZnVuY3Rpb24gKHNsaWRlcikge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJpby1sYWJlbCcpLnRleHRDb250ZW50ID0gYFByaW9yaXR5OiAke3BhcnNlUHJpb3JpdHkoc2xpZGVyLnZhbHVlKX1gO1xufVxuXG53aW5kb3cuY2xpY2tUb2RvID0gZnVuY3Rpb24gKGRhdGFLZXkpIHtcbiAgY29uc29sZS5sb2cobGlzdHMuZ2V0VG9kbyhkYXRhS2V5KS5wcmlvcml0eSk7XG59XG5cblxuXG5sZXQgaXRlbTEgPSBuZXcgVG9kbygnV2FzaCBDYXInLCAnZG9udCBmb3JnZXQgdG8gd2F4JywgJzAxLzAxLzE5OTknLCAnMScpXG5sZXQgaXRlbTIgPSBuZXcgVG9kbygnTWFrZSBkaW5uZXInLCAnTGFzYWduYScsICcwMS8wMS8xOTk5JywgJzInKVxubGV0IGl0ZW0zID0gbmV3IFRvZG8oJ01vdyB0aGUgbGF3bicsICcnLCAnMDEvMDEvMTk5OScsICczJylcbmxldCBpdGVtNCA9IG5ldyBUb2RvKCdXb3JrIE91dCcsICdsZWcgZGF5JywgJzAxLzAxLzE5OTknLCAnMScpXG5cbmxldCBkZWZhdWx0TGlzdCA9IG5ldyBMaXN0KCdEZWZhdWx0IExpc3QnLCAnVGhpcyBpcyB3aGVyZSB0aGUgZGVzY3JpcHRpb24gZ29lcy4uLicpO1xuZGVmYXVsdExpc3QuYWRkVG9kbyhpdGVtMSk7XG5kZWZhdWx0TGlzdC5hZGRUb2RvKGl0ZW0yKTtcbmRlZmF1bHRMaXN0LmFkZFRvZG8oaXRlbTMpO1xuZGVmYXVsdExpc3QuYWRkVG9kbyhpdGVtNCk7XG5kZWZhdWx0TGlzdC5jaGVja0NvbXBsZXRpb24oKTtcblxuaXRlbTIudG9nZ2xlQ29tcGxldGUoKTtcbml0ZW00LnRvZ2dsZUNvbXBsZXRlKCk7XG5cbmRlZmF1bHRMaXN0LmNoZWNrQ29tcGxldGlvbigpO1xuXG5saXN0cy5hZGRMaXN0KGRlZmF1bHRMaXN0KTtcblVJLmRpc3BsYXlMaXN0cyhsaXN0cyk7IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5sZXQgdG9kb0NvdW50ID0gMDtcblxuY2xhc3MgVG9kbyB7XG4gIFxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwYXJzZVByaW9yaXR5KHByaW9yaXR5KVxuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcbiAgICB0aGlzLmRhdGFLZXkgPSB0b2RvQ291bnQ7XG4gICAgdG9kb0NvdW50Kys7XG4gIH1cblxuICB0b2dnbGVDb21wbGV0ZSgpIHtcbiAgICB0aGlzLmNvbXBsZXRlID0gIXRoaXMuY29tcGxldGU7XG4gIH1cblxuICBcbn1cblxuZnVuY3Rpb24gcGFyc2VQcmlvcml0eShudW0pIHtcbiAgbGV0IGN1cnJlbnRQcmlvID0gbnVsbDtcbiAgc3dpdGNoIChudW0pIHtcbiAgICBjYXNlICcxJzpcbiAgICAgIGN1cnJlbnRQcmlvID0gJ0xvdyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICcyJzpcbiAgICAgIGN1cnJlbnRQcmlvID0gJ01lZGl1bSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICczJzpcbiAgICAgIGN1cnJlbnRQcmlvID0gJ0hpZ2gnO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgcmV0dXJuIGN1cnJlbnRQcmlvIHx8ICdNZWRpdW0nO1xufVxuXG5cbmNsYXNzIExpc3Qge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcbiAgICB0aGlzLnRvZG9MaXN0ID0gW107XG4gICAgdGhpcy5kYXRhS2V5ID0gbnVsbDtcbiAgfVxuXG4gIGNoZWNrQ29tcGxldGlvbigpe1xuICAgIHRoaXMuY29tcGxldGUgPSAgdGhpcy50b2RvTGlzdC5ldmVyeSgodG9kbykgPT4gdG9kby5jb21wbGV0ZSk7XG4gIH1cblxuICBhZGRUb2RvKHRvZG8pIHtcbiAgICB0aGlzLnRvZG9MaXN0LnB1c2godG9kbyk7XG4gIH1cblxuICBwcmludExpc3QoKSB7XG4gICAgdGhpcy50b2RvTGlzdC5mb3JFYWNoKCh0b2RvKSA9PiBjb25zb2xlLnRhYmxlKHRvZG8pKTtcbiAgfVxuXG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMudG9kb0xpc3QubGVuZ3RoO1xuICB9XG5cbiAgZ2V0IG51bUNvbXBsZXRlZCgpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIHRoaXMudG9kb0xpc3QuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgaWYgKHRvZG8uY29tcGxldGUpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gY291bnQ7XG4gIH1cbn1cblxuZXhwb3J0IHtUb2RvLCBMaXN0LCBwYXJzZVByaW9yaXR5fTsiLCJpbXBvcnQgeyBsaXN0cyB9IGZyb20gXCIuXCI7XG5cbmZ1bmN0aW9uIGRpc3BsYXlOZXdMaXN0Rm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtZm9ybS1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xufVxuXG5mdW5jdGlvbiBoaWRlTmV3TGlzdEZvcm0oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWZvcm0tY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRvZG9Gb3JtKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG59XG5cbmZ1bmN0aW9uIGhpZGVUb2RvRm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZm9ybS1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5TGlzdHMobGlzdHMpIHtcbiAgY29uc3QgbGlzdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdC1saXN0Jyk7XG5cbiAgd2hpbGUgKGxpc3RMaXN0LmZpcnN0Q2hpbGQpIHtcbiAgICBsaXN0TGlzdC5yZW1vdmVDaGlsZChsaXN0TGlzdC5maXJzdENoaWxkKTtcbiAgfVxuXG4gIGxpc3RzLmFyci5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgY29uc3QgbmV3TGlzdCA9IGNyZWF0ZUxpc3RJdGVtKGxpc3QpO1xuICAgIGxpc3RMaXN0LmFwcGVuZENoaWxkKG5ld0xpc3QpO1xuICB9KVxuICBcbn1cblxuZnVuY3Rpb24gc2V0Rm9ybURhdGFLZXkoZGF0YUtleSkge1xuICBjb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0nKTtcbiAgdG9kb0Zvcm0uc2V0QXR0cmlidXRlKCdkYXRhLWtleScsIGRhdGFLZXkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaXN0SXRlbShsaXN0KXtcbiAgY29uc3QgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIGNvbnN0IGxpc3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGxpc3ROYW1lLnRleHRDb250ZW50ID0gbGlzdC50aXRsZTtcbiAgbGlzdE5hbWUuY2xhc3NMaXN0LmFkZCgnbGlzdC1uYW1lJyk7XG4gIGNvbnN0IHJpZ2h0U2lkZU9mSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBhbW91bnRDb21wbGV0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGFtb3VudENvbXBsZXRlZC50ZXh0Q29udGVudCA9IGAke2xpc3QubnVtQ29tcGxldGVkfS8ke2xpc3QubGVuZ3RofWBcblxuICBjb25zdCBkZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZSgnb25jbGljaycsIGBkZWxldGVMaXN0KGV2ZW50LCAke2xpc3QuZGF0YUtleX0pYCk7XG4gIGRlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdkZWxldGUtYnRuJyk7XG5cbiAgY29uc3QgdHJhc2hJY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaScpO1xuICB0cmFzaEljb24uY2xhc3NMaXN0LmFkZCgnZmFzJyk7XG4gIHRyYXNoSWNvbi5jbGFzc0xpc3QuYWRkKCdmYS10cmFzaCcpO1xuICBkZWxldGVCdXR0b24uYXBwZW5kQ2hpbGQodHJhc2hJY29uKTtcblxuICByaWdodFNpZGVPZkl0ZW0uYXBwZW5kQ2hpbGQoYW1vdW50Q29tcGxldGVkKTtcbiAgcmlnaHRTaWRlT2ZJdGVtLmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG5cbiAgbmV3TGlzdC5hcHBlbmRDaGlsZChsaXN0TmFtZSk7XG4gIG5ld0xpc3QuYXBwZW5kQ2hpbGQocmlnaHRTaWRlT2ZJdGVtKTtcbiAgbmV3TGlzdC5jbGFzc0xpc3QuYWRkKCdsaXN0LWl0ZW0nKTtcbiAgbmV3TGlzdC5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JywgbGlzdC5kYXRhS2V5KTtcbiAgbmV3TGlzdC5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCBgc2hvd1RvZG9MaXN0KCR7bGlzdC5kYXRhS2V5fSlgKTtcbiAgcmV0dXJuIG5ld0xpc3Q7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUb2RvTGlzdChsaXN0KSB7XG4gIGNvbnN0IHRvZG9BcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tYXJlYScpO1xuICB3aGlsZSh0b2RvQXJlYS5maXJzdENoaWxkKSB7XG4gICAgdG9kb0FyZWEucmVtb3ZlQ2hpbGQodG9kb0FyZWEuZmlyc3RDaGlsZCk7XG4gIH1cbiAgY29uc3QgdG9kb0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdG9kb0xpc3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgndG9kby1saXN0LWNvbnRhaW5lcicpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IGxpc3QudGl0bGU7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGxpc3QuZGVzY3JpcHRpb247XG5cbiAgY29uc3QgY29sdW1uMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb25zdCBjb2x1bW4yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IGNvbHVtbjMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICBjb25zdCB0b2RvTGlzdFRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRvZG9MaXN0VGFibGUuaWQgPSAndG9kby1saXN0LXRhYmxlJztcblxuICBjb25zdCBhZGRJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGFkZEl0ZW0uaWQgPSAnYWRkLXRvZG8tYnRuJztcbiAgYWRkSXRlbS50ZXh0Q29udGVudCA9ICdBZGQgVG9kbyc7XG4gIGFkZEl0ZW0uc2V0QXR0cmlidXRlKCdvbmNsaWNrJywgYGNyZWF0ZU5ld1RvZG8oJHtsaXN0LmRhdGFLZXl9KWApXG5cbiAgXG4gIGNvbnN0IHRvZG9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0b2RvTGFiZWwudGV4dENvbnRlbnQgPSAnVG9kbyc7XG4gIHRvZG9MYWJlbC5jbGFzc0xpc3QuYWRkKCd0YWJsZS1sYWJlbCcpO1xuXG4gIGNvbHVtbjEuYXBwZW5kQ2hpbGQodG9kb0xhYmVsKTtcbiAgXG4gIGNvbnN0IHByaW9MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBwcmlvTGFiZWwudGV4dENvbnRlbnQgPSAnUHJpb3JpdHknO1xuICBwcmlvTGFiZWwuY2xhc3NMaXN0LmFkZCgndGFibGUtbGFiZWwnKTtcblxuICBjb2x1bW4yLmFwcGVuZENoaWxkKHByaW9MYWJlbCk7XG5cbiAgY29uc3QgZGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRhdGVMYWJlbC50ZXh0Q29udGVudCA9ICdEdWUgRGF0ZSc7XG4gIGRhdGVMYWJlbC5jbGFzc0xpc3QuYWRkKCd0YWJsZS1sYWJlbCcpO1xuXG4gIGNvbHVtbjMuYXBwZW5kQ2hpbGQoZGF0ZUxhYmVsKTtcblxuICBsaXN0LnRvZG9MaXN0LmZvckVhY2goKHRvZG8pID0+IHtcbiAgICBjb25zdCBuZXdUb2RvID0gY3JlYXRlVG9kb0l0ZW0odG9kbyk7XG4gICAgY29sdW1uMS5hcHBlbmRDaGlsZChuZXdUb2RvLmNvbHVtbjEpO1xuICAgIGNvbHVtbjIuYXBwZW5kQ2hpbGQobmV3VG9kby5jb2x1bW4yKTtcbiAgICBjb2x1bW4zLmFwcGVuZENoaWxkKG5ld1RvZG8uY29sdW1uMyk7XG4gIH0pXG5cbiAgY29sdW1uMS5jbGFzc0xpc3QuYWRkKCdjb2x1bW4xJyk7XG5cbiAgdG9kb0xpc3RUYWJsZS5hcHBlbmRDaGlsZChjb2x1bW4xKTtcbiAgdG9kb0xpc3RUYWJsZS5hcHBlbmRDaGlsZChjb2x1bW4yKTtcbiAgdG9kb0xpc3RUYWJsZS5hcHBlbmRDaGlsZChjb2x1bW4zKTtcblxuICB0b2RvTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICB0b2RvTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gIHRvZG9MaXN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGFkZEl0ZW0pO1xuICB0b2RvTGlzdENvbnRhaW5lci5hcHBlbmRDaGlsZCh0b2RvTGlzdFRhYmxlKTtcbiAgXG5cbiAgdG9kb0FyZWEuYXBwZW5kQ2hpbGQodG9kb0xpc3RDb250YWluZXIpO1xuXG4gIGxpc3RzLmxhc3REaXNwbGF5ZWRMaXN0ID0gbGlzdC5kYXRhS2V5O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVUb2RvSXRlbSh0b2RvKSB7XG4gIGNvbnN0IG5ld1RvZG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBuZXdUb2RvLnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCB0b2RvLmRhdGFLZXkpO1xuICBjb25zdCBsZWZ0U2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIGNvbnN0IGNoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgY2hlY2tCb3gudHlwZSA9ICdjaGVja2JveCc7XG5cbiAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcbiAgdGl0bGUuY2xhc3NMaXN0LmFkZCgndG9kby10aXRsZScpO1xuICBcbiAgaWYgKHRvZG8uY29tcGxldGUpIHtcbiAgICBjaGVja0JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICB0aXRsZS5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZWQtdGl0bGUnKTtcbiAgfVxuICBcbiAgY2hlY2tCb3guc2V0QXR0cmlidXRlKCdvbmNsaWNrJywgYGNsaWNrQ2hlY2tib3goJHt0b2RvLmRhdGFLZXl9KWApXG5cbiAgXG5cbiAgY29uc3QgcHJpb3JpdHlGbGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHByaW9yaXR5RmxhZy5jbGFzc0xpc3QuYWRkKCdwcmlvLWZsYWcnKTtcblxuICBzd2l0Y2ggKHRvZG8ucHJpb3JpdHkpIHtcbiAgICBjYXNlICdMb3cnOlxuICAgICAgcHJpb3JpdHlGbGFnLmNsYXNzTGlzdC5hZGQoJ2xvdy1wcmlvcml0eScpO1xuICAgICAgcHJpb3JpdHlGbGFnLnRleHRDb250ZW50ID0gJ0xvdyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdNZWRpdW0nOlxuICAgICAgcHJpb3JpdHlGbGFnLmNsYXNzTGlzdC5hZGQoJ21lZGl1bS1wcmlvcml0eScpO1xuICAgICAgcHJpb3JpdHlGbGFnLnRleHRDb250ZW50ID0gJ01lZGl1bSc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdIaWdoJzpcbiAgICAgIHByaW9yaXR5RmxhZy5jbGFzc0xpc3QuYWRkKCdoaWdoLXByaW9yaXR5Jyk7XG4gICAgICBwcmlvcml0eUZsYWcudGV4dENvbnRlbnQgPSAnSGlnaCc7XG4gICAgICBicmVhaztcbiAgfVxuXG4gIFxuXG4gIGxlZnRTaWRlLmFwcGVuZENoaWxkKGNoZWNrQm94KTtcbiAgbGVmdFNpZGUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGF0ZS50ZXh0Q29udGVudCA9IHRvZG8uZHVlRGF0ZTtcblxuICBsZWZ0U2lkZS5jbGFzc0xpc3QuYWRkKCd0b2RvLWNlbGwnKTtcbiAgcHJpb3JpdHlGbGFnLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2VsbCcpO1xuICBkYXRlLmNsYXNzTGlzdC5hZGQoJ3RvZG8tY2VsbCcpO1xuICBcbiAgcHJpb3JpdHlGbGFnLmNsYXNzTGlzdC5hZGQoJ2NlbnRlci1jZWxsJyk7XG4gIGRhdGUuY2xhc3NMaXN0LmFkZCgnY2VudGVyLWNlbGwnKTtcblxuXG4gIHJldHVybiB7Y29sdW1uMTogbGVmdFNpZGUsIGNvbHVtbjI6IHByaW9yaXR5RmxhZywgY29sdW1uMzogZGF0ZX07XG59XG5cbmZ1bmN0aW9uIGNsZWFyTGlzdEZvcm0oKSB7XG4gIGNvbnN0IGxpc3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtZm9ybScpO1xuICBsaXN0Rm9ybS50aXRsZS52YWx1ZSA9ICcnO1xuICBsaXN0Rm9ybS5kZXNjcmlwdGlvbi52YWx1ZSA9ICcnO1xufVxuXG5mdW5jdGlvbiBjbGVhclRvZG9Gb3JtKCkge1xuICBjb25zdCB0b2RvRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0nKTtcbiAgdG9kb0Zvcm0udGl0bGUudmFsdWUgPSAnJztcbiAgdG9kb0Zvcm0uZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbiAgdG9kb0Zvcm1bJ2R1ZS1kYXRlJ10udmFsdWUgPSAnJztcbiAgdG9kb0Zvcm0ucHJpb3JpdHkudmFsdWUgPSAnJztcbn1cblxuZnVuY3Rpb24gY2xlYXJUb2RvQXJlYSgpIHtcbiAgY29uc3QgdG9kb0FyZWEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1hcmVhJyk7XG4gIHdoaWxlKHRvZG9BcmVhLmZpcnN0Q2hpbGQpIHtcbiAgICB0b2RvQXJlYS5yZW1vdmVDaGlsZCh0b2RvQXJlYS5maXJzdENoaWxkKTtcbiAgfVxufVxuXG5leHBvcnQge2Rpc3BsYXlOZXdMaXN0Rm9ybSwgaGlkZU5ld0xpc3RGb3JtLCBkaXNwbGF5TGlzdHMsIGNsZWFyTGlzdEZvcm0sIGRpc3BsYXlUb2RvTGlzdCwgZGlzcGxheVRvZG9Gb3JtLCBoaWRlVG9kb0Zvcm0sIHNldEZvcm1EYXRhS2V5LCBjbGVhclRvZG9BcmVhLFxuY2xlYXJUb2RvRm9ybSx9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=