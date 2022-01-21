import { lists } from ".";

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

  lists.lastDisplayedList = list.dataKey;
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

export {displayNewListForm, hideNewListForm, displayLists, clearListForm, displayTodoList, displayTodoForm, hideTodoForm, setFormDataKey, clearTodoArea,
clearTodoForm,};