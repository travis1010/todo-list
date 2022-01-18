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

export {displayNewListForm, hideNewListForm, displayLists, clearListForm};