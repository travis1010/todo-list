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
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayTodoList(currentList)
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
}

window.submitTodoForm = function(e, form) {
  e.preventDefault();
  const currentList = lists.getList(form.getAttribute('data-key'));
  currentList.addTodo(new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo(form.title.value, form.description.value, 'test', 'test'));
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.hideTodoForm();
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayTodoList(currentList);
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.clearTodoForm();
}

window.createNewTodo = function(dataKey) {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.setFormDataKey(dataKey);
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayTodoForm();
  console.log(dataKey);
  
}

window.cancelNewTodo = function() {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.hideTodoForm();
}



let item1 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('Wash Car', 'dont forget to wax', 'date', 4)
let item2 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('Make dinner', 'Lasagna', 'date', 4)
let item3 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('Mow the lawn', '', 'date', 4)
let item4 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('Work Out', 'leg day', 'date', 4)



let defaultList = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.List('Default', 'desc');
defaultList.addTodo(item1);
defaultList.addTodo(item2);
defaultList.addTodo(item3);
defaultList.addTodo(item4);
defaultList.checkCompletion();

//console.table(defaultList);


//item1.toggleComplete();
item2.toggleComplete();
//item3.toggleComplete();
item4.toggleComplete();

defaultList.checkCompletion();

//console.table(defaultList);

//defaultList.printList();

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
/* harmony export */   "List": () => (/* binding */ List)
/* harmony export */ });


let todoCount = 0;

class Todo {
  
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.complete = false;
    this.dataKey = todoCount;
    todoCount++;
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
  const listName = document.createElement('span');
  listName.textContent = list.title;
  const amountCompleted = document.createElement('span');
  amountCompleted.textContent = `${list.numCompleted}/${list.length}`

  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('onclick', `deleteList(event, ${list.dataKey})`);
  deleteButton.textContent = 'Delete';

  newList.appendChild(listName);
  newList.appendChild(amountCompleted);
  newList.appendChild(deleteButton);
  newList.classList.add('list-item');
  newList.setAttribute('data-key', list.dataKey);
  newList.setAttribute('onclick', `showTodoList(${list.dataKey})`);
  return newList;
}

function displayTodoList(list) {
  const todoArea = document.getElementById('todo-area');

  const header = document.createElement('h2');
  header.textContent = list.title;
  const description = document.createElement('p');
  description.textContent = list.description;

  const addItem = document.createElement('button');
  addItem.textContent = 'Add Todo';
  addItem.setAttribute('onclick', `createNewTodo(${list.dataKey})`)

  while(todoArea.firstChild) {
    todoArea.removeChild(todoArea.firstChild);
  }
  const checkList = document.createElement('ul');
  list.todoList.forEach((todo) => {
    const newTodo = createTodoItem(todo);
    checkList.appendChild(newTodo);
  })

  checkList.classList.add('todo-list');

  todoArea.appendChild(header);
  todoArea.appendChild(description);
  todoArea.appendChild(addItem);
  todoArea.appendChild(checkList);

  ___WEBPACK_IMPORTED_MODULE_0__.lists.lastDisplayedList = list.dataKey;
}

function createTodoItem(todo) {
  const newTodo = document.createElement('li');
  newTodo.setAttribute('data-key', todo.dataKey);
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
  if (todo.complete) {
    checkBox.checked = true;
  }
  
  checkBox.setAttribute('onclick', `clickCheckbox(${todo.dataKey})`)

  newTodo.appendChild(checkBox);
  const title = document.createElement('span');
  title.textContent = todo.title;
  newTodo.appendChild(title);
  
  return newTodo;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQzlIQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7VUVOQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb2xpc3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtUb2RvLCBMaXN0fSBmcm9tICcuL3RvZG9saXN0cy5qcyc7XG5pbXBvcnQgKiBhcyBVSSBmcm9tICcuL3VpLmpzJztcblxuZXhwb3J0IGNvbnN0IGxpc3RzID0gKCgpID0+IHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgbGV0IGxhc3REaXNwbGF5ZWRMaXN0ID0gbnVsbDtcbiAgY29uc3QgYXJyID0gW107IFxuICBjb25zdCBhZGRMaXN0ID0gKGxpc3QpID0+IHtcbiAgICBhcnIucHVzaChsaXN0KTtcbiAgICBsaXN0LmRhdGFLZXkgPSBjb3VudDtcbiAgICBjb3VudCsrO1xuICAgIGNvbnNvbGUudGFibGUobGlzdCk7XG4gIH1cbiAgY29uc3QgZ2V0TGlzdCA9IChkYXRhS2V5KSA9PiB7XG4gICAgY29uc3QgaW5kZXggPSBhcnIuZmluZEluZGV4KChsaXN0KSA9PiB7XG4gICAgICByZXR1cm4gbGlzdC5kYXRhS2V5ID09IGRhdGFLZXk7XG4gICAgfSlcbiAgICByZXR1cm4gYXJyW2luZGV4XTtcbiAgfVxuXG4gIGNvbnN0IGRlbGV0ZUxpc3QgPSAoZGF0YUtleSkgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gYXJyLmZpbmRJbmRleCgobGlzdCkgPT4ge1xuICAgICAgcmV0dXJuIGxpc3QuZGF0YUtleSA9PSBkYXRhS2V5O1xuICAgIH0pXG4gICAgYXJyLnNwbGljZShpbmRleCwgMSk7XG4gIH1cblxuICBjb25zdCBnZXRUb2RvID0gKGRhdGFLZXkpID0+IHtcbiAgICBsZXQgY3VycmVudFRvZG8gPSBudWxsO1xuICAgIGFyci5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgICBsaXN0LnRvZG9MaXN0LmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgICAgaWYgKHRvZG8uZGF0YUtleSA9PSBkYXRhS2V5KSB7XG4gICAgICAgICAgY3VycmVudFRvZG8gPSB0b2RvO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gICAgcmV0dXJuIGN1cnJlbnRUb2RvO1xuICB9XG4gIHJldHVybiB7XG4gICAgYXJyLFxuICAgIGFkZExpc3QsXG4gICAgZ2V0TGlzdCxcbiAgICBnZXRUb2RvLFxuICAgIGRlbGV0ZUxpc3QsXG4gICAgbGFzdERpc3BsYXllZExpc3QsXG4gIH1cbn0pKCk7XG5cbndpbmRvdy5zaG93VG9kb0xpc3QgPSBmdW5jdGlvbihkYXRhS2V5KSB7XG4gIGNvbnN0IGN1cnJlbnRMaXN0ID0gbGlzdHMuZ2V0TGlzdChkYXRhS2V5KTtcbiAgVUkuZGlzcGxheVRvZG9MaXN0KGN1cnJlbnRMaXN0KVxufVxuXG53aW5kb3cuY3JlYXRlTmV3TGlzdCA9IGZ1bmN0aW9uKCkge1xuICBVSS5kaXNwbGF5TmV3TGlzdEZvcm0oKTtcbn1cblxud2luZG93LmNhbmNlbE5ld0xpc3QgPSBmdW5jdGlvbigpIHtcbiAgVUkuaGlkZU5ld0xpc3RGb3JtKCk7XG59XG5cbndpbmRvdy5jbGlja0NoZWNrYm94ID0gZnVuY3Rpb24odG9kb0RhdGFLZXkpIHtcbiAgY29uc29sZS5sb2coJ3RvZG8gZGF0YSBrZXk6Jyk7XG4gIGNvbnNvbGUubG9nKHRvZG9EYXRhS2V5KTtcbiAgY29uc3QgY3VycmVudFRvZG8gPSBsaXN0cy5nZXRUb2RvKHRvZG9EYXRhS2V5KTtcbiAgY3VycmVudFRvZG8udG9nZ2xlQ29tcGxldGUoKTtcbiAgVUkuZGlzcGxheUxpc3RzKGxpc3RzKTtcbn1cblxud2luZG93LmRlbGV0ZUxpc3QgPSBmdW5jdGlvbihlLCBkYXRhS2V5KSB7XG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIGxpc3RzLmRlbGV0ZUxpc3QoZGF0YUtleSk7XG4gIFVJLmRpc3BsYXlMaXN0cyhsaXN0cyk7XG4gIGlmKGxpc3RzLmxhc3REaXNwbGF5ZWRMaXN0ID09IGRhdGFLZXkpIHtcbiAgICBVSS5jbGVhclRvZG9BcmVhKCk7XG4gIH1cbiAgXG59XG5cbndpbmRvdy5zdWJtaXRMaXN0Rm9ybSA9IGZ1bmN0aW9uKGUsIGZvcm0pIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBsaXN0cy5hZGRMaXN0KG5ldyBMaXN0KGZvcm0udGl0bGUudmFsdWUsIGZvcm0uZGVzY3JpcHRpb24udmFsdWUpKTtcbiAgVUkuZGlzcGxheUxpc3RzKGxpc3RzKTtcbiAgVUkuaGlkZU5ld0xpc3RGb3JtKCk7XG4gIFVJLmNsZWFyTGlzdEZvcm0oKTtcbn1cblxud2luZG93LnN1Ym1pdFRvZG9Gb3JtID0gZnVuY3Rpb24oZSwgZm9ybSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIGNvbnN0IGN1cnJlbnRMaXN0ID0gbGlzdHMuZ2V0TGlzdChmb3JtLmdldEF0dHJpYnV0ZSgnZGF0YS1rZXknKSk7XG4gIGN1cnJlbnRMaXN0LmFkZFRvZG8obmV3IFRvZG8oZm9ybS50aXRsZS52YWx1ZSwgZm9ybS5kZXNjcmlwdGlvbi52YWx1ZSwgJ3Rlc3QnLCAndGVzdCcpKTtcbiAgVUkuaGlkZVRvZG9Gb3JtKCk7XG4gIFVJLmRpc3BsYXlUb2RvTGlzdChjdXJyZW50TGlzdCk7XG4gIFVJLmNsZWFyVG9kb0Zvcm0oKTtcbn1cblxud2luZG93LmNyZWF0ZU5ld1RvZG8gPSBmdW5jdGlvbihkYXRhS2V5KSB7XG4gIFVJLnNldEZvcm1EYXRhS2V5KGRhdGFLZXkpO1xuICBVSS5kaXNwbGF5VG9kb0Zvcm0oKTtcbiAgY29uc29sZS5sb2coZGF0YUtleSk7XG4gIFxufVxuXG53aW5kb3cuY2FuY2VsTmV3VG9kbyA9IGZ1bmN0aW9uKCkge1xuICBVSS5oaWRlVG9kb0Zvcm0oKTtcbn1cblxuXG5cbmxldCBpdGVtMSA9IG5ldyBUb2RvKCdXYXNoIENhcicsICdkb250IGZvcmdldCB0byB3YXgnLCAnZGF0ZScsIDQpXG5sZXQgaXRlbTIgPSBuZXcgVG9kbygnTWFrZSBkaW5uZXInLCAnTGFzYWduYScsICdkYXRlJywgNClcbmxldCBpdGVtMyA9IG5ldyBUb2RvKCdNb3cgdGhlIGxhd24nLCAnJywgJ2RhdGUnLCA0KVxubGV0IGl0ZW00ID0gbmV3IFRvZG8oJ1dvcmsgT3V0JywgJ2xlZyBkYXknLCAnZGF0ZScsIDQpXG5cblxuXG5sZXQgZGVmYXVsdExpc3QgPSBuZXcgTGlzdCgnRGVmYXVsdCcsICdkZXNjJyk7XG5kZWZhdWx0TGlzdC5hZGRUb2RvKGl0ZW0xKTtcbmRlZmF1bHRMaXN0LmFkZFRvZG8oaXRlbTIpO1xuZGVmYXVsdExpc3QuYWRkVG9kbyhpdGVtMyk7XG5kZWZhdWx0TGlzdC5hZGRUb2RvKGl0ZW00KTtcbmRlZmF1bHRMaXN0LmNoZWNrQ29tcGxldGlvbigpO1xuXG4vL2NvbnNvbGUudGFibGUoZGVmYXVsdExpc3QpO1xuXG5cbi8vaXRlbTEudG9nZ2xlQ29tcGxldGUoKTtcbml0ZW0yLnRvZ2dsZUNvbXBsZXRlKCk7XG4vL2l0ZW0zLnRvZ2dsZUNvbXBsZXRlKCk7XG5pdGVtNC50b2dnbGVDb21wbGV0ZSgpO1xuXG5kZWZhdWx0TGlzdC5jaGVja0NvbXBsZXRpb24oKTtcblxuLy9jb25zb2xlLnRhYmxlKGRlZmF1bHRMaXN0KTtcblxuLy9kZWZhdWx0TGlzdC5wcmludExpc3QoKTtcblxubGlzdHMuYWRkTGlzdChkZWZhdWx0TGlzdCk7XG5VSS5kaXNwbGF5TGlzdHMobGlzdHMpOyIsImltcG9ydCB7IGNvbXBhcmVBc2MsIGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcblxubGV0IHRvZG9Db3VudCA9IDA7XG5cbmNsYXNzIFRvZG8ge1xuICBcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuICAgIHRoaXMuZGF0YUtleSA9IHRvZG9Db3VudDtcbiAgICB0b2RvQ291bnQrKztcbiAgfVxuXG4gIHRvZ2dsZUNvbXBsZXRlKCkge1xuICAgIHRoaXMuY29tcGxldGUgPSAhdGhpcy5jb21wbGV0ZTtcbiAgfVxufVxuXG5cblxuY2xhc3MgTGlzdCB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbikge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuICAgIHRoaXMudG9kb0xpc3QgPSBbXTtcbiAgICB0aGlzLmRhdGFLZXkgPSBudWxsO1xuICB9XG5cbiAgY2hlY2tDb21wbGV0aW9uKCl7XG4gICAgdGhpcy5jb21wbGV0ZSA9ICB0aGlzLnRvZG9MaXN0LmV2ZXJ5KCh0b2RvKSA9PiB0b2RvLmNvbXBsZXRlKTtcbiAgfVxuXG4gIGFkZFRvZG8odG9kbykge1xuICAgIHRoaXMudG9kb0xpc3QucHVzaCh0b2RvKTtcbiAgfVxuXG4gIHByaW50TGlzdCgpIHtcbiAgICB0aGlzLnRvZG9MaXN0LmZvckVhY2goKHRvZG8pID0+IGNvbnNvbGUudGFibGUodG9kbykpO1xuICB9XG5cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy50b2RvTGlzdC5sZW5ndGg7XG4gIH1cblxuICBnZXQgbnVtQ29tcGxldGVkKCkge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgdGhpcy50b2RvTGlzdC5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICBpZiAodG9kby5jb21wbGV0ZSkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBjb3VudDtcbiAgfVxufVxuXG5leHBvcnQge1RvZG8sIExpc3R9OyIsImltcG9ydCB7IGxpc3RzIH0gZnJvbSBcIi5cIjtcblxuZnVuY3Rpb24gZGlzcGxheU5ld0xpc3RGb3JtKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdC1mb3JtLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG59XG5cbmZ1bmN0aW9uIGhpZGVOZXdMaXN0Rm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtZm9ybS1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5VG9kb0Zvcm0oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0tY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcbn1cblxuZnVuY3Rpb24gaGlkZVRvZG9Gb3JtKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlMaXN0cyhsaXN0cykge1xuICBjb25zdCBsaXN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWxpc3QnKTtcblxuICB3aGlsZSAobGlzdExpc3QuZmlyc3RDaGlsZCkge1xuICAgIGxpc3RMaXN0LnJlbW92ZUNoaWxkKGxpc3RMaXN0LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgbGlzdHMuYXJyLmZvckVhY2goKGxpc3QpID0+IHtcbiAgICBjb25zdCBuZXdMaXN0ID0gY3JlYXRlTGlzdEl0ZW0obGlzdCk7XG4gICAgbGlzdExpc3QuYXBwZW5kQ2hpbGQobmV3TGlzdCk7XG4gIH0pXG4gIFxufVxuXG5mdW5jdGlvbiBzZXRGb3JtRGF0YUtleShkYXRhS2V5KSB7XG4gIGNvbnN0IHRvZG9Gb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZm9ybScpO1xuICB0b2RvRm9ybS5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JywgZGF0YUtleSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RJdGVtKGxpc3Qpe1xuICBjb25zdCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgY29uc3QgbGlzdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGxpc3ROYW1lLnRleHRDb250ZW50ID0gbGlzdC50aXRsZTtcbiAgY29uc3QgYW1vdW50Q29tcGxldGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICBhbW91bnRDb21wbGV0ZWQudGV4dENvbnRlbnQgPSBgJHtsaXN0Lm51bUNvbXBsZXRlZH0vJHtsaXN0Lmxlbmd0aH1gXG5cbiAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGRlbGV0ZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCBgZGVsZXRlTGlzdChldmVudCwgJHtsaXN0LmRhdGFLZXl9KWApO1xuICBkZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSAnRGVsZXRlJztcblxuICBuZXdMaXN0LmFwcGVuZENoaWxkKGxpc3ROYW1lKTtcbiAgbmV3TGlzdC5hcHBlbmRDaGlsZChhbW91bnRDb21wbGV0ZWQpO1xuICBuZXdMaXN0LmFwcGVuZENoaWxkKGRlbGV0ZUJ1dHRvbik7XG4gIG5ld0xpc3QuY2xhc3NMaXN0LmFkZCgnbGlzdC1pdGVtJyk7XG4gIG5ld0xpc3Quc2V0QXR0cmlidXRlKCdkYXRhLWtleScsIGxpc3QuZGF0YUtleSk7XG4gIG5ld0xpc3Quc2V0QXR0cmlidXRlKCdvbmNsaWNrJywgYHNob3dUb2RvTGlzdCgke2xpc3QuZGF0YUtleX0pYCk7XG4gIHJldHVybiBuZXdMaXN0O1xufVxuXG5mdW5jdGlvbiBkaXNwbGF5VG9kb0xpc3QobGlzdCkge1xuICBjb25zdCB0b2RvQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWFyZWEnKTtcblxuICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICBoZWFkZXIudGV4dENvbnRlbnQgPSBsaXN0LnRpdGxlO1xuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgZGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBsaXN0LmRlc2NyaXB0aW9uO1xuXG4gIGNvbnN0IGFkZEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgYWRkSXRlbS50ZXh0Q29udGVudCA9ICdBZGQgVG9kbyc7XG4gIGFkZEl0ZW0uc2V0QXR0cmlidXRlKCdvbmNsaWNrJywgYGNyZWF0ZU5ld1RvZG8oJHtsaXN0LmRhdGFLZXl9KWApXG5cbiAgd2hpbGUodG9kb0FyZWEuZmlyc3RDaGlsZCkge1xuICAgIHRvZG9BcmVhLnJlbW92ZUNoaWxkKHRvZG9BcmVhLmZpcnN0Q2hpbGQpO1xuICB9XG4gIGNvbnN0IGNoZWNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGxpc3QudG9kb0xpc3QuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgIGNvbnN0IG5ld1RvZG8gPSBjcmVhdGVUb2RvSXRlbSh0b2RvKTtcbiAgICBjaGVja0xpc3QuYXBwZW5kQ2hpbGQobmV3VG9kbyk7XG4gIH0pXG5cbiAgY2hlY2tMaXN0LmNsYXNzTGlzdC5hZGQoJ3RvZG8tbGlzdCcpO1xuXG4gIHRvZG9BcmVhLmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIHRvZG9BcmVhLmFwcGVuZENoaWxkKGRlc2NyaXB0aW9uKTtcbiAgdG9kb0FyZWEuYXBwZW5kQ2hpbGQoYWRkSXRlbSk7XG4gIHRvZG9BcmVhLmFwcGVuZENoaWxkKGNoZWNrTGlzdCk7XG5cbiAgbGlzdHMubGFzdERpc3BsYXllZExpc3QgPSBsaXN0LmRhdGFLZXk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRvZG9JdGVtKHRvZG8pIHtcbiAgY29uc3QgbmV3VG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gIG5ld1RvZG8uc2V0QXR0cmlidXRlKCdkYXRhLWtleScsIHRvZG8uZGF0YUtleSk7XG4gIGNvbnN0IGNoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgY2hlY2tCb3gudHlwZSA9ICdjaGVja2JveCc7XG4gIGlmICh0b2RvLmNvbXBsZXRlKSB7XG4gICAgY2hlY2tCb3guY2hlY2tlZCA9IHRydWU7XG4gIH1cbiAgXG4gIGNoZWNrQm94LnNldEF0dHJpYnV0ZSgnb25jbGljaycsIGBjbGlja0NoZWNrYm94KCR7dG9kby5kYXRhS2V5fSlgKVxuXG4gIG5ld1RvZG8uYXBwZW5kQ2hpbGQoY2hlY2tCb3gpO1xuICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgdGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xuICBuZXdUb2RvLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgXG4gIHJldHVybiBuZXdUb2RvO1xufVxuXG5mdW5jdGlvbiBjbGVhckxpc3RGb3JtKCkge1xuICBjb25zdCBsaXN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWZvcm0nKTtcbiAgbGlzdEZvcm0udGl0bGUudmFsdWUgPSAnJztcbiAgbGlzdEZvcm0uZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbn1cblxuZnVuY3Rpb24gY2xlYXJUb2RvRm9ybSgpIHtcbiAgY29uc3QgdG9kb0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtJyk7XG4gIHRvZG9Gb3JtLnRpdGxlLnZhbHVlID0gJyc7XG4gIHRvZG9Gb3JtLmRlc2NyaXB0aW9uLnZhbHVlID0gJyc7XG4gIHRvZG9Gb3JtWydkdWUtZGF0ZSddLnZhbHVlID0gJyc7XG4gIHRvZG9Gb3JtLnByaW9yaXR5LnZhbHVlID0gJyc7XG59XG5cbmZ1bmN0aW9uIGNsZWFyVG9kb0FyZWEoKSB7XG4gIGNvbnN0IHRvZG9BcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tYXJlYScpO1xuICB3aGlsZSh0b2RvQXJlYS5maXJzdENoaWxkKSB7XG4gICAgdG9kb0FyZWEucmVtb3ZlQ2hpbGQodG9kb0FyZWEuZmlyc3RDaGlsZCk7XG4gIH1cbn1cblxuZXhwb3J0IHtkaXNwbGF5TmV3TGlzdEZvcm0sIGhpZGVOZXdMaXN0Rm9ybSwgZGlzcGxheUxpc3RzLCBjbGVhckxpc3RGb3JtLCBkaXNwbGF5VG9kb0xpc3QsIGRpc3BsYXlUb2RvRm9ybSwgaGlkZVRvZG9Gb3JtLCBzZXRGb3JtRGF0YUtleSwgY2xlYXJUb2RvQXJlYSxcbmNsZWFyVG9kb0Zvcm0sfTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9