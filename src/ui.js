
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

export {displayNewListForm, hideNewListForm, displayLists, clearListForm, displayTodoList, displayTodoForm, hideTodoForm, setFormDataKey};