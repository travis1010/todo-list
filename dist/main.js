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
/* harmony export */   "clearListForm": () => (/* binding */ clearListForm)
/* harmony export */ });
function displayNewListForm() {
  document.getElementById('list-form-container').style.display = 'flex';
}

function hideNewListForm() {
  document.getElementById('list-form-container').style.display = 'none';
}

function displayLists(lists) {
  const listList = document.getElementById('list-list');

  while (listList.firstChild) {
    listList.removeChild(listList.firstChild);
  }

  lists.forEach((list) => {
    let newList = document.createElement('li');
    newList.textContent = list.title;
    listList.appendChild(newList);
  })
  
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
/* harmony import */ var _todolists_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todolists.js */ "./src/todolists.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");




const lists = [];

window.createNewList = function() {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayNewListForm();
}

window.cancelNewList = function() {
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.hideNewListForm();
}

window.submitListForm = function(e, form) {
  e.preventDefault();
  lists.push(new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.List(form.title.value, form.description.value));
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.displayLists(lists);
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.hideNewListForm();
  _ui_js__WEBPACK_IMPORTED_MODULE_1__.clearListForm();
}




let item1 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('title1', 'desc1', 'date', 4)
let item2 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('title2', 'desc2', 'date', 4)
let item3 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('title3', 'desc3', 'date', 4)
let item4 = new _todolists_js__WEBPACK_IMPORTED_MODULE_0__.Todo('title4', 'desc4', 'date', 4)



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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBOEM7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUMzQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDSjtBQUNaOztBQUU5Qjs7QUFFQTtBQUNBLEVBQUUsc0RBQXFCO0FBQ3ZCOztBQUVBO0FBQ0EsRUFBRSxtREFBa0I7QUFDcEI7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQiwrQ0FBSTtBQUNyQixFQUFFLGdEQUFlO0FBQ2pCLEVBQUUsbURBQWtCO0FBQ3BCLEVBQUUsaURBQWdCO0FBQ2xCOzs7OztBQUtBLGdCQUFnQiwrQ0FBSTtBQUNwQixnQkFBZ0IsK0NBQUk7QUFDcEIsZ0JBQWdCLCtDQUFJO0FBQ3BCLGdCQUFnQiwrQ0FBSTs7OztBQUlwQixzQkFBc0IsK0NBQUk7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvdG9kb2xpc3RzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy91aS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5jbGFzcyBUb2RvIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gcHJpb3JpdHk7XG4gICAgdGhpcy5jb21wbGV0ZSA9IGZhbHNlO1xuICB9XG5cbiAgdG9nZ2xlQ29tcGxldGUoKSB7XG4gICAgdGhpcy5jb21wbGV0ZSA9ICF0aGlzLmNvbXBsZXRlO1xuICB9XG59XG5cbmNsYXNzIExpc3Qge1xuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb24pIHtcbiAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgIHRoaXMuY29tcGxldGUgPSBmYWxzZTtcbiAgICB0aGlzLnRvZG9MaXN0ID0gW107XG4gIH1cblxuICBjaGVja0NvbXBsZXRpb24oKXtcbiAgICB0aGlzLmNvbXBsZXRlID0gIHRoaXMudG9kb0xpc3QuZXZlcnkoKHRvZG8pID0+IHRvZG8uY29tcGxldGUpO1xuICB9XG5cbiAgYWRkVG9kbyh0b2RvKSB7XG4gICAgdGhpcy50b2RvTGlzdC5wdXNoKHRvZG8pO1xuICB9XG5cbiAgcHJpbnRMaXN0KCkge1xuICAgIHRoaXMudG9kb0xpc3QuZm9yRWFjaCgodG9kbykgPT4gY29uc29sZS50YWJsZSh0b2RvKSk7XG4gIH1cbn1cblxuZXhwb3J0IHtUb2RvLCBMaXN0fTsiLCJmdW5jdGlvbiBkaXNwbGF5TmV3TGlzdEZvcm0oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWZvcm0tY29udGFpbmVyJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4Jztcbn1cblxuZnVuY3Rpb24gaGlkZU5ld0xpc3RGb3JtKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGlzdC1mb3JtLWNvbnRhaW5lcicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlMaXN0cyhsaXN0cykge1xuICBjb25zdCBsaXN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXN0LWxpc3QnKTtcblxuICB3aGlsZSAobGlzdExpc3QuZmlyc3RDaGlsZCkge1xuICAgIGxpc3RMaXN0LnJlbW92ZUNoaWxkKGxpc3RMaXN0LmZpcnN0Q2hpbGQpO1xuICB9XG5cbiAgbGlzdHMuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIGxldCBuZXdMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBuZXdMaXN0LnRleHRDb250ZW50ID0gbGlzdC50aXRsZTtcbiAgICBsaXN0TGlzdC5hcHBlbmRDaGlsZChuZXdMaXN0KTtcbiAgfSlcbiAgXG59XG5cbmZ1bmN0aW9uIGNsZWFyTGlzdEZvcm0oKSB7XG4gIGNvbnN0IGxpc3RGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpc3QtZm9ybScpO1xuICBsaXN0Rm9ybS50aXRsZS52YWx1ZSA9ICcnO1xuICBsaXN0Rm9ybS5kZXNjcmlwdGlvbi52YWx1ZSA9ICcnO1xufVxuXG5leHBvcnQge2Rpc3BsYXlOZXdMaXN0Rm9ybSwgaGlkZU5ld0xpc3RGb3JtLCBkaXNwbGF5TGlzdHMsIGNsZWFyTGlzdEZvcm19OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY29tcGFyZUFzYywgZm9ybWF0IH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtUb2RvLCBMaXN0fSBmcm9tICcuL3RvZG9saXN0cy5qcyc7XG5pbXBvcnQgKiBhcyBVSSBmcm9tICcuL3VpLmpzJztcblxuY29uc3QgbGlzdHMgPSBbXTtcblxud2luZG93LmNyZWF0ZU5ld0xpc3QgPSBmdW5jdGlvbigpIHtcbiAgVUkuZGlzcGxheU5ld0xpc3RGb3JtKCk7XG59XG5cbndpbmRvdy5jYW5jZWxOZXdMaXN0ID0gZnVuY3Rpb24oKSB7XG4gIFVJLmhpZGVOZXdMaXN0Rm9ybSgpO1xufVxuXG53aW5kb3cuc3VibWl0TGlzdEZvcm0gPSBmdW5jdGlvbihlLCBmb3JtKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgbGlzdHMucHVzaChuZXcgTGlzdChmb3JtLnRpdGxlLnZhbHVlLCBmb3JtLmRlc2NyaXB0aW9uLnZhbHVlKSk7XG4gIFVJLmRpc3BsYXlMaXN0cyhsaXN0cyk7XG4gIFVJLmhpZGVOZXdMaXN0Rm9ybSgpO1xuICBVSS5jbGVhckxpc3RGb3JtKCk7XG59XG5cblxuXG5cbmxldCBpdGVtMSA9IG5ldyBUb2RvKCd0aXRsZTEnLCAnZGVzYzEnLCAnZGF0ZScsIDQpXG5sZXQgaXRlbTIgPSBuZXcgVG9kbygndGl0bGUyJywgJ2Rlc2MyJywgJ2RhdGUnLCA0KVxubGV0IGl0ZW0zID0gbmV3IFRvZG8oJ3RpdGxlMycsICdkZXNjMycsICdkYXRlJywgNClcbmxldCBpdGVtNCA9IG5ldyBUb2RvKCd0aXRsZTQnLCAnZGVzYzQnLCAnZGF0ZScsIDQpXG5cblxuXG5sZXQgZGVmYXVsdExpc3QgPSBuZXcgTGlzdCgnRGVmYXVsdCcsICdkZXNjJyk7XG5kZWZhdWx0TGlzdC5hZGRUb2RvKGl0ZW0xKTtcbmRlZmF1bHRMaXN0LmFkZFRvZG8oaXRlbTIpO1xuZGVmYXVsdExpc3QuYWRkVG9kbyhpdGVtMyk7XG5kZWZhdWx0TGlzdC5hZGRUb2RvKGl0ZW00KTtcbmRlZmF1bHRMaXN0LmNoZWNrQ29tcGxldGlvbigpO1xuXG4vL2NvbnNvbGUudGFibGUoZGVmYXVsdExpc3QpO1xuXG5cbml0ZW0xLnRvZ2dsZUNvbXBsZXRlKCk7XG5pdGVtMi50b2dnbGVDb21wbGV0ZSgpO1xuaXRlbTMudG9nZ2xlQ29tcGxldGUoKTtcbml0ZW00LnRvZ2dsZUNvbXBsZXRlKCk7XG5cbmRlZmF1bHRMaXN0LmNoZWNrQ29tcGxldGlvbigpO1xuXG4vL2NvbnNvbGUudGFibGUoZGVmYXVsdExpc3QpO1xuXG4vL2RlZmF1bHRMaXN0LnByaW50TGlzdCgpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==