import { format } from "date-fns";
import { lists } from ".";

function displayNewListForm() {
  document.getElementById('list-form-container').style.display = 'flex';
}

function hideNewListForm() {
  document.getElementById('list-form-container').style.display = 'none';
}

function displayTodoForm() {
  document.getElementById('todo-form-date').value = format(new Date(), 'yyyy-MM-dd');
  document.getElementById('todo-form-container').style.display = 'flex';
}

function displayEditTodoForm(todo) {
  document.getElementById('edit-title-input').value = todo.title;
  document.getElementById('edit-description-input').value = todo.description;
  document.getElementById('edit-date-input').value = format(todo.dueDate, 'yyyy-MM-dd');
  let slider = document.getElementById('edit-prio-slider');
  slider.value = todo.prioToNum;
  updateEditPrio(slider);
  document.getElementById('edit-todo-form-container').style.display = 'flex';
}

function displayEditListForm(list) {
  document.getElementById('edit-list-title').value = list.title;
  document.getElementById('edit-list-description').value = list.description;
  document.getElementById('edit-list-form-container').style.display = 'flex';
}

function hideEditListForm() {
  document.getElementById('edit-list-form-container').style.display = 'none';
}

function hideEditTodoForm() {
  document.getElementById('edit-todo-form-container').style.display = 'none';
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

  const dateLists = document.getElementById('date-lists');

  while (dateLists.firstChild) {
    dateLists.removeChild(dateLists.firstChild);
  }

  dateLists.appendChild(createTodayListItem());
  dateLists.appendChild(createWeekListItem());
  
}

function setFormDataKey(dataKey) {
  const todoForm = document.getElementById('todo-form');
  todoForm.setAttribute('data-key', dataKey);
}

function setEditFormDataKey(dataKey) {
  const editTodoForm = document.getElementById('edit-todo-form');
  editTodoForm.setAttribute('data-key', dataKey);
}

function setEditListFormDataKey(dataKey) {
  const editListForm = document.getElementById('edit-list-form');
  editListForm.setAttribute('data-key', dataKey);
}

function createTodayListItem() {
  const list = lists.todayList;
  const newList = document.createElement('li');
  const listName = document.createElement('div');
  listName.textContent = list.title;
  listName.classList.add('list-name');
  const rightSideOfItem = document.createElement('div');
  const amountCompleted = document.createElement('span');
  amountCompleted.textContent = `${list.numCompleted}/${list.length}`

  rightSideOfItem.appendChild(amountCompleted);
  rightSideOfItem.classList.add('list-item-right-side');

  newList.appendChild(listName);
  newList.appendChild(rightSideOfItem);
  newList.classList.add('list-item');
  newList.setAttribute('onclick', `showTodoList('today')`);
  return newList;
}

function createWeekListItem() {
  const list = lists.weekList;
  const newList = document.createElement('li');
  const listName = document.createElement('div');
  listName.textContent = list.title;
  listName.classList.add('list-name');
  const rightSideOfItem = document.createElement('div');
  const amountCompleted = document.createElement('span');
  amountCompleted.textContent = `${list.numCompleted}/${list.length}`

  rightSideOfItem.appendChild(amountCompleted);
  rightSideOfItem.classList.add('list-item-right-side');

  newList.appendChild(listName);
  newList.appendChild(rightSideOfItem);
  newList.classList.add('list-item');
  newList.setAttribute('onclick', `showTodoList('week')`);
  return newList;
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

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  const editIcon = document.createElement('i');
  editIcon.classList.add('fas');
  editIcon.classList.add('fa-edit');
  editBtn.appendChild(editIcon);
  editBtn.setAttribute('onclick', `editList(${list.dataKey})`);

  rightSideOfItem.appendChild(amountCompleted);
  rightSideOfItem.appendChild(editBtn);
  rightSideOfItem.appendChild(deleteButton);
  rightSideOfItem.classList.add('list-item-right-side');

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

  const detailsBtn = document.createElement('button');
  detailsBtn.classList.add('details-btn');
  const detailsIcon = document.createElement('i');
  detailsIcon.classList.add('fas');
  if (list.detailedView) {
    detailsIcon.classList.add('fa-angle-double-left')
  } else {
    detailsIcon.classList.add('fa-angle-double-right')
  }
  detailsBtn.appendChild(detailsIcon);
  detailsBtn.setAttribute('onclick', `toggleDetails('${list.dataKey}', '${list.detailedView}')`)
  
  const description = document.createElement('p');
  description.textContent = list.description;

  const column1 = document.createElement('div');
  const column2 = document.createElement('div');
  const column3 = document.createElement('div');
  const column4 = document.createElement('div');

  const todoListTable = document.createElement('div');
  todoListTable.id = 'todo-list-table';

  const buttons = document.createElement('span');
 

  const addItem = document.createElement('button');
  addItem.id = 'add-todo-btn';
  addItem.textContent = 'Add Todo';
  addItem.setAttribute('onclick', `createNewTodo(${list.dataKey})`);

  buttons.appendChild(addItem);
  

  const todoLabel = document.createElement('div');
  todoLabel.textContent = 'Todo';
  todoLabel.classList.add('table-label');
  todoLabel.classList.add('todo-label');
  todoLabel.appendChild(detailsBtn);

  column1.appendChild(todoLabel);
  
  const prioLabel = document.createElement('div');
  prioLabel.textContent = 'Priority';
  prioLabel.classList.add('table-label');
  prioLabel.classList.add('sort-btn');
  prioLabel.setAttribute('onclick', `sortByPrio('${list.dataKey}')`);
  

  column2.appendChild(prioLabel);

  const dateLabel = document.createElement('div');
  dateLabel.textContent = 'Due Date';
  dateLabel.classList.add('table-label');
  
  
  if (list.dataKey != 'today') {
    dateLabel.classList.add('sort-btn');
    dateLabel.setAttribute('onclick', `sortByDate('${list.dataKey}')`);
  }

  column3.appendChild(dateLabel);

  const descriptionLabel = document.createElement('div');
  descriptionLabel.textContent = 'Description';
  descriptionLabel.classList.add('table-label');

  column4.appendChild(descriptionLabel);

  list.todoList.forEach((todo) => {
    const newTodo = createTodoItem(todo);
    column1.appendChild(newTodo.column1);
    column2.appendChild(newTodo.column2);
    column3.appendChild(newTodo.column3);
    column4.appendChild(newTodo.column4);
  })

  column1.classList.add('column1');

  todoListTable.appendChild(column1);

  if (list.detailedView) {
    todoListTable.appendChild(column2);
    todoListTable.appendChild(column3);
    todoListTable.appendChild(column4);
  }

  todoListContainer.appendChild(header);
  todoListContainer.appendChild(description);
  if (list.dataKey != 'today' && list.dataKey != 'week') {
    todoListContainer.appendChild(buttons);
  }
  todoListContainer.appendChild(todoListTable);
  

  todoArea.appendChild(todoListContainer);

  lists.lastDisplayedList = list.dataKey;
}

function createTodoItem(todo) {
  const newTodo = document.createElement('li');
  newTodo.setAttribute('data-key', todo.dataKey);

  const todoCell = document.createElement('div');

  const leftSide = document.createElement('div');
  const rightSide = document.createElement('div');
  
  const checkBox = document.createElement('input');
  checkBox.type = 'checkbox';

  const title = document.createElement('span');
  title.textContent = todo.title;
  title.classList.add('todo-title');
  
  if (todo.complete) {
    checkBox.checked = true;
    title.classList.add('completed-title');
  }

  const editBtn = document.createElement('button');
  editBtn.classList.add('edit-btn');
  const editIcon = document.createElement('i');
  editIcon.classList.add('fas');
  editIcon.classList.add('fa-edit');
  editBtn.appendChild(editIcon);
  editBtn.setAttribute('onclick', `editTodo(${todo.dataKey})`);

  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-btn');
  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fas');
  deleteIcon.classList.add('fa-trash');
  deleteBtn.appendChild(deleteIcon);
  deleteBtn.setAttribute('onclick', `deleteTodo(${todo.dataKey})`);
  
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
  
  title.setAttribute('onclick', `clickTodo(${todo.dataKey})`)

  leftSide.appendChild(checkBox);
  leftSide.appendChild(title);
  rightSide.appendChild(editBtn);
  rightSide.appendChild(deleteBtn);

  leftSide.classList.add('left-side-todo-cell');
  

  const date = document.createElement('div');
  date.textContent = format(todo.dueDate, 'MM/dd/yyyy');

  const description = document.createElement('div');
  description.textContent = todo.description;

  todoCell.classList.add('todo-cell');
  priorityFlag.classList.add('todo-cell');
  date.classList.add('todo-cell');
  description.classList.add('todo-cell')
  
  todoCell.classList.add('main-todo-cell');
  priorityFlag.classList.add('center-cell');
  date.classList.add('center-cell');
  description.classList.add('left-align-cell')

  todoCell.appendChild(leftSide);
  todoCell.appendChild(rightSide);
  
  

  return {column1: todoCell, column2: priorityFlag, column3: date, column4: description};
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
  todoForm.priority.value = "2";
  document.getElementById('prio-label').textContent = `Priority: Medium`;
}

function clearTodoArea() {
  const todoArea = document.getElementById('todo-area');
  while(todoArea.firstChild) {
    todoArea.removeChild(todoArea.firstChild);
  }
}

export {displayNewListForm, hideNewListForm, displayLists, clearListForm, displayTodoList, displayTodoForm, hideTodoForm, setFormDataKey, clearTodoArea,
clearTodoForm, displayEditTodoForm, hideEditTodoForm, setEditFormDataKey, displayEditListForm, hideEditListForm, setEditListFormDataKey,};