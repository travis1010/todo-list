import { compareAsc, format } from 'date-fns';
import {Todo, List} from './todolists.js';
import * as UI from './ui.js';

const lists = [];

window.createNewList = function() {
  UI.displayNewListForm();
}

window.cancelNewList = function() {
  UI.hideNewListForm();
}

window.submitListForm = function(e, form) {
  e.preventDefault();
  lists.push(new List(form.title.value, form.description.value));
  UI.displayLists(lists);
  UI.hideNewListForm();
  UI.clearListForm();
}




let item1 = new Todo('title1', 'desc1', 'date', 4)
let item2 = new Todo('title2', 'desc2', 'date', 4)
let item3 = new Todo('title3', 'desc3', 'date', 4)
let item4 = new Todo('title4', 'desc4', 'date', 4)



let defaultList = new List('Default', 'desc');
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