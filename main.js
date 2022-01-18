/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony export */   "setFormDataKey": () => (/* binding */ setFormDataKey)
/* harmony export */ });

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
  newList.appendChild(listName);
  newList.appendChild(amountCompleted);
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
}

function createTodoItem(todo) {
  const newTodo = document.createElement('li');
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lists": () => (/* binding */ lists)
/* harmony export */ });
/* harmony import */ var _todolists_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todolists.js */ "./src/todolists.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");




const lists = (() => {
  let count = 0;
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
  return {
    arr,
    addList,
    getList
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


item1.toggleComplete();
item2.toggleComplete();
item3.toggleComplete();
item4.toggleComplete();

defaultList.checkCompletion();

//console.table(defaultList);

//defaultList.printList();

lists.addList(defaultList);
_ui_js__WEBPACK_IMPORTED_MODULE_1__.displayLists(lists);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQixHQUFHLFlBQVk7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsYUFBYTtBQUMvRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxhQUFhOztBQUVoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUMvRkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDSjtBQUNaOztBQUV2QjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxFQUFFLG1EQUFrQjtBQUNwQjs7QUFFQTtBQUNBLEVBQUUsc0RBQXFCO0FBQ3ZCOztBQUVBO0FBQ0EsRUFBRSxtREFBa0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBLG9CQUFvQiwrQ0FBSTtBQUN4QixFQUFFLGdEQUFlO0FBQ2pCLEVBQUUsbURBQWtCO0FBQ3BCLEVBQUUsaURBQWdCO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwrQ0FBSTtBQUM5QixFQUFFLGdEQUFlO0FBQ2pCLEVBQUUsbURBQWtCO0FBQ3BCOztBQUVBO0FBQ0EsRUFBRSxrREFBaUI7QUFDbkIsRUFBRSxtREFBa0I7QUFDcEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRUFBRSxnREFBZTtBQUNqQjs7OztBQUlBLGdCQUFnQiwrQ0FBSTtBQUNwQixnQkFBZ0IsK0NBQUk7QUFDcEIsZ0JBQWdCLCtDQUFJO0FBQ3BCLGdCQUFnQiwrQ0FBSTs7OztBQUlwQixzQkFBc0IsK0NBQUk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxnREFBZSxRIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3RvZG9saXN0cy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdWkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBhcmVBc2MsIGZvcm1hdCB9IGZyb20gJ2RhdGUtZm5zJztcblxuY2xhc3MgVG9kbyB7XG4gIGNvbnN0cnVjdG9yKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcbiAgfVxuXG4gIHRvZ2dsZUNvbXBsZXRlKCkge1xuICAgIHRoaXMuY29tcGxldGUgPSAhdGhpcy5jb21wbGV0ZTtcbiAgfVxufVxuXG5jbGFzcyBMaXN0IHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICB0aGlzLmNvbXBsZXRlID0gZmFsc2U7XG4gICAgdGhpcy50b2RvTGlzdCA9IFtdO1xuICAgIHRoaXMuZGF0YUtleSA9IG51bGw7XG4gIH1cblxuICBjaGVja0NvbXBsZXRpb24oKXtcbiAgICB0aGlzLmNvbXBsZXRlID0gIHRoaXMudG9kb0xpc3QuZXZlcnkoKHRvZG8pID0+IHRvZG8uY29tcGxldGUpO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy50b2RvTGlzdC5wdXNoKHRvZG8pO1xuICB9XG5cbiAgcHJpbnRMaXN0KCkge1xuICAgIHRoaXMudG9kb0xpc3QuZm9yRWFjaCgodG9kbykgPT4gY29uc29sZS50YWJsZSh0b2RvKSk7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLnRvZG9MaXN0Lmxlbmd0aDtcbiAgfVxuXG4gIGdldCBudW1Db21wbGV0ZWQoKSB7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICB0aGlzLnRvZG9MaXN0LmZvckVhY2goKHRvZG8pID0+IHtcbiAgICAgIGlmICh0b2RvLmNvbXBsZXRlKSB7XG4gICAgICAgIGNvdW50Kys7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG59XG5cbmV4cG9ydCB7VG9kbywgTGlzdH07IiwiXG5mdW5jdGlvbiBkaXNwbGF5TmV3TGlzdEZvcm0oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWZvcm0tY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcbn1cblxuZnVuY3Rpb24gaGlkZU5ld0xpc3RGb3JtKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdC1mb3JtLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUb2RvRm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tZm9ybS1jb250YWluZXInKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xufVxuXG5mdW5jdGlvbiBoaWRlVG9kb0Zvcm0oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2RvLWZvcm0tY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn1cblxuZnVuY3Rpb24gZGlzcGxheUxpc3RzKGxpc3RzKSB7XG4gIGNvbnN0IGxpc3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtbGlzdCcpO1xuXG4gIHdoaWxlIChsaXN0TGlzdC5maXJzdENoaWxkKSB7XG4gICAgbGlzdExpc3QucmVtb3ZlQ2hpbGQobGlzdExpc3QuZmlyc3RDaGlsZCk7XG4gIH1cblxuICBsaXN0cy5hcnIuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIGNvbnN0IG5ld0xpc3QgPSBjcmVhdGVMaXN0SXRlbShsaXN0KTtcbiAgICBsaXN0TGlzdC5hcHBlbmRDaGlsZChuZXdMaXN0KTtcbiAgfSlcbiAgXG59XG5cbmZ1bmN0aW9uIHNldEZvcm1EYXRhS2V5KGRhdGFLZXkpIHtcbiAgY29uc3QgdG9kb0Zvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9kby1mb3JtJyk7XG4gIHRvZG9Gb3JtLnNldEF0dHJpYnV0ZSgnZGF0YS1rZXknLCBkYXRhS2V5KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlzdEl0ZW0obGlzdCl7XG4gIGNvbnN0IG5ld0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICBjb25zdCBsaXN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgbGlzdE5hbWUudGV4dENvbnRlbnQgPSBsaXN0LnRpdGxlO1xuICBjb25zdCBhbW91bnRDb21wbGV0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gIGFtb3VudENvbXBsZXRlZC50ZXh0Q29udGVudCA9IGAke2xpc3QubnVtQ29tcGxldGVkfS8ke2xpc3QubGVuZ3RofWBcbiAgbmV3TGlzdC5hcHBlbmRDaGlsZChsaXN0TmFtZSk7XG4gIG5ld0xpc3QuYXBwZW5kQ2hpbGQoYW1vdW50Q29tcGxldGVkKTtcbiAgbmV3TGlzdC5jbGFzc0xpc3QuYWRkKCdsaXN0LWl0ZW0nKTtcbiAgbmV3TGlzdC5zZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JywgbGlzdC5kYXRhS2V5KTtcbiAgbmV3TGlzdC5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCBgc2hvd1RvZG9MaXN0KCR7bGlzdC5kYXRhS2V5fSlgKTtcbiAgcmV0dXJuIG5ld0xpc3Q7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUb2RvTGlzdChsaXN0KSB7XG4gIGNvbnN0IHRvZG9BcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvZG8tYXJlYScpO1xuXG4gIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gIGhlYWRlci50ZXh0Q29udGVudCA9IGxpc3QudGl0bGU7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGxpc3QuZGVzY3JpcHRpb247XG5cbiAgY29uc3QgYWRkSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBhZGRJdGVtLnRleHRDb250ZW50ID0gJ0FkZCBUb2RvJztcbiAgYWRkSXRlbS5zZXRBdHRyaWJ1dGUoJ29uY2xpY2snLCBgY3JlYXRlTmV3VG9kbygke2xpc3QuZGF0YUtleX0pYClcblxuICB3aGlsZSh0b2RvQXJlYS5maXJzdENoaWxkKSB7XG4gICAgdG9kb0FyZWEucmVtb3ZlQ2hpbGQodG9kb0FyZWEuZmlyc3RDaGlsZCk7XG4gIH1cbiAgY29uc3QgY2hlY2tMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgbGlzdC50b2RvTGlzdC5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgY29uc3QgbmV3VG9kbyA9IGNyZWF0ZVRvZG9JdGVtKHRvZG8pO1xuICAgIGNoZWNrTGlzdC5hcHBlbmRDaGlsZChuZXdUb2RvKTtcbiAgfSlcblxuICBjaGVja0xpc3QuY2xhc3NMaXN0LmFkZCgndG9kby1saXN0Jyk7XG5cbiAgdG9kb0FyZWEuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgdG9kb0FyZWEuYXBwZW5kQ2hpbGQoZGVzY3JpcHRpb24pO1xuICB0b2RvQXJlYS5hcHBlbmRDaGlsZChhZGRJdGVtKTtcbiAgdG9kb0FyZWEuYXBwZW5kQ2hpbGQoY2hlY2tMaXN0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlVG9kb0l0ZW0odG9kbykge1xuICBjb25zdCBuZXdUb2RvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgY29uc3QgY2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICBjaGVja0JveC50eXBlID0gJ2NoZWNrYm94JztcbiAgbmV3VG9kby5hcHBlbmRDaGlsZChjaGVja0JveCk7XG4gIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICB0aXRsZS50ZXh0Q29udGVudCA9IHRvZG8udGl0bGU7XG4gIG5ld1RvZG8uYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gIHJldHVybiBuZXdUb2RvO1xufVxuXG5mdW5jdGlvbiBjbGVhckxpc3RGb3JtKCkge1xuICBjb25zdCBsaXN0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWZvcm0nKTtcbiAgbGlzdEZvcm0udGl0bGUudmFsdWUgPSAnJztcbiAgbGlzdEZvcm0uZGVzY3JpcHRpb24udmFsdWUgPSAnJztcbn1cblxuZXhwb3J0IHtkaXNwbGF5TmV3TGlzdEZvcm0sIGhpZGVOZXdMaXN0Rm9ybSwgZGlzcGxheUxpc3RzLCBjbGVhckxpc3RGb3JtLCBkaXNwbGF5VG9kb0xpc3QsIGRpc3BsYXlUb2RvRm9ybSwgaGlkZVRvZG9Gb3JtLCBzZXRGb3JtRGF0YUtleX07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjb21wYXJlQXNjLCBmb3JtYXQgfSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge1RvZG8sIExpc3R9IGZyb20gJy4vdG9kb2xpc3RzLmpzJztcbmltcG9ydCAqIGFzIFVJIGZyb20gJy4vdWkuanMnO1xuXG5leHBvcnQgY29uc3QgbGlzdHMgPSAoKCkgPT4ge1xuICBsZXQgY291bnQgPSAwO1xuICBjb25zdCBhcnIgPSBbXTsgXG4gIGNvbnN0IGFkZExpc3QgPSAobGlzdCkgPT4ge1xuICAgIGFyci5wdXNoKGxpc3QpO1xuICAgIGxpc3QuZGF0YUtleSA9IGNvdW50O1xuICAgIGNvdW50Kys7XG4gICAgY29uc29sZS50YWJsZShsaXN0KTtcbiAgfVxuICBjb25zdCBnZXRMaXN0ID0gKGRhdGFLZXkpID0+IHtcbiAgICBjb25zdCBpbmRleCA9IGFyci5maW5kSW5kZXgoKGxpc3QpID0+IHtcbiAgICAgIHJldHVybiBsaXN0LmRhdGFLZXkgPT0gZGF0YUtleTtcbiAgICB9KVxuICAgIHJldHVybiBhcnJbaW5kZXhdO1xuICB9XG4gIHJldHVybiB7XG4gICAgYXJyLFxuICAgIGFkZExpc3QsXG4gICAgZ2V0TGlzdFxuICB9XG59KSgpO1xuXG53aW5kb3cuc2hvd1RvZG9MaXN0ID0gZnVuY3Rpb24oZGF0YUtleSkge1xuICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RzLmdldExpc3QoZGF0YUtleSk7XG4gIFVJLmRpc3BsYXlUb2RvTGlzdChjdXJyZW50TGlzdClcbn1cblxud2luZG93LmNyZWF0ZU5ld0xpc3QgPSBmdW5jdGlvbigpIHtcbiAgVUkuZGlzcGxheU5ld0xpc3RGb3JtKCk7XG59XG5cbndpbmRvdy5jYW5jZWxOZXdMaXN0ID0gZnVuY3Rpb24oKSB7XG4gIFVJLmhpZGVOZXdMaXN0Rm9ybSgpO1xufVxuXG53aW5kb3cuc3VibWl0TGlzdEZvcm0gPSBmdW5jdGlvbihlLCBmb3JtKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGlzdHMuYWRkTGlzdChuZXcgTGlzdChmb3JtLnRpdGxlLnZhbHVlLCBmb3JtLmRlc2NyaXB0aW9uLnZhbHVlKSk7XG4gIFVJLmRpc3BsYXlMaXN0cyhsaXN0cyk7XG4gIFVJLmhpZGVOZXdMaXN0Rm9ybSgpO1xuICBVSS5jbGVhckxpc3RGb3JtKCk7XG59XG5cbndpbmRvdy5zdWJtaXRUb2RvRm9ybSA9IGZ1bmN0aW9uKGUsIGZvcm0pIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBjb25zdCBjdXJyZW50TGlzdCA9IGxpc3RzLmdldExpc3QoZm9ybS5nZXRBdHRyaWJ1dGUoJ2RhdGEta2V5JykpO1xuICBjdXJyZW50TGlzdC5hZGRUb2RvKG5ldyBUb2RvKGZvcm0udGl0bGUudmFsdWUsIGZvcm0uZGVzY3JpcHRpb24udmFsdWUsICd0ZXN0JywgJ3Rlc3QnKSk7XG4gIFVJLmhpZGVUb2RvRm9ybSgpO1xuICBVSS5kaXNwbGF5VG9kb0xpc3QoY3VycmVudExpc3QpO1xufVxuXG53aW5kb3cuY3JlYXRlTmV3VG9kbyA9IGZ1bmN0aW9uKGRhdGFLZXkpIHtcbiAgVUkuc2V0Rm9ybURhdGFLZXkoZGF0YUtleSk7XG4gIFVJLmRpc3BsYXlUb2RvRm9ybSgpO1xuICBjb25zb2xlLmxvZyhkYXRhS2V5KTtcbiAgXG59XG5cbndpbmRvdy5jYW5jZWxOZXdUb2RvID0gZnVuY3Rpb24oKSB7XG4gIFVJLmhpZGVUb2RvRm9ybSgpO1xufVxuXG5cblxubGV0IGl0ZW0xID0gbmV3IFRvZG8oJ1dhc2ggQ2FyJywgJ2RvbnQgZm9yZ2V0IHRvIHdheCcsICdkYXRlJywgNClcbmxldCBpdGVtMiA9IG5ldyBUb2RvKCdNYWtlIGRpbm5lcicsICdMYXNhZ25hJywgJ2RhdGUnLCA0KVxubGV0IGl0ZW0zID0gbmV3IFRvZG8oJ01vdyB0aGUgbGF3bicsICcnLCAnZGF0ZScsIDQpXG5sZXQgaXRlbTQgPSBuZXcgVG9kbygnV29yayBPdXQnLCAnbGVnIGRheScsICdkYXRlJywgNClcblxuXG5cbmxldCBkZWZhdWx0TGlzdCA9IG5ldyBMaXN0KCdEZWZhdWx0JywgJ2Rlc2MnKTtcbmRlZmF1bHRMaXN0LmFkZFRvZG8oaXRlbTEpO1xuZGVmYXVsdExpc3QuYWRkVG9kbyhpdGVtMik7XG5kZWZhdWx0TGlzdC5hZGRUb2RvKGl0ZW0zKTtcbmRlZmF1bHRMaXN0LmFkZFRvZG8oaXRlbTQpO1xuZGVmYXVsdExpc3QuY2hlY2tDb21wbGV0aW9uKCk7XG5cbi8vY29uc29sZS50YWJsZShkZWZhdWx0TGlzdCk7XG5cblxuaXRlbTEudG9nZ2xlQ29tcGxldGUoKTtcbml0ZW0yLnRvZ2dsZUNvbXBsZXRlKCk7XG5pdGVtMy50b2dnbGVDb21wbGV0ZSgpO1xuaXRlbTQudG9nZ2xlQ29tcGxldGUoKTtcblxuZGVmYXVsdExpc3QuY2hlY2tDb21wbGV0aW9uKCk7XG5cbi8vY29uc29sZS50YWJsZShkZWZhdWx0TGlzdCk7XG5cbi8vZGVmYXVsdExpc3QucHJpbnRMaXN0KCk7XG5cbmxpc3RzLmFkZExpc3QoZGVmYXVsdExpc3QpO1xuVUkuZGlzcGxheUxpc3RzKGxpc3RzKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=