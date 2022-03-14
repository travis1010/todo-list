import { parseISO, addDays, format, startOfWeek } from 'date-fns';
import {Todo, List, parsePriority} from './todolists.js';
import * as UI from './ui.js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, setDoc, doc } from 'firebase/firestore/lite';
import { getFirebaseConfig } from './firebase-config.js';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';


export const lists = (() => {
  let lastDisplayedList = null;
  const arr = []; 
  let currentList = null;
  let todayList = null;
  let weekList = null;

  const clearLists = () => {
    arr.length = 0;
  }

  const addList = (list) => {
    arr.push(list);
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
    if(isUserSignedIn()) {
      const todoLists = []
      lists.arr.forEach((list) => {
        todoLists.push(JSON.stringify(list));
      })
      saveUserTodos(todoLists);
    }
  }

  const loadLists = (savedLists) => {
    console.log({savedLists})
    savedLists.forEach((savedList) => {
      const listJSON = JSON.parse(savedList);
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
    clearLists
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
  if (lists.arr.length === 0) {
    UI.showEmptyList();
  }
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
  const thisList = lists.getList(lists.getTodo(dataKey).listDataKey);
  console.log({thisList});
  thisList.deleteTodo(dataKey);
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
  lists.clearLists();
  let item1 = new Todo('Wash Car', 'Don\'t forget to wax!', new Date(), '1')
  let item2 = new Todo('Get oil changed', '', addDays(new Date(), 3), '2')
  let item3 = new Todo('Mow the lawn', '', new Date(), '3')
  let item4 = new Todo('Work Out', 'Cardio', addDays(new Date(), 2), '1')
  let item5 = new Todo('Set Dentist Appt', 'Make a new appointment with Dr. Crentist.', addDays(new Date(), 22), '3')
  
  let defaultList = new List('Default List', 'This is the default Todo List.  Make sure you are signed in if you want to save any changes.');
  
  defaultList.addTodo(item1);
  defaultList.addTodo(item2);
  defaultList.addTodo(item3);
  defaultList.addTodo(item4);
  defaultList.addTodo(item5);
  
  item2.toggleComplete();
  item4.toggleComplete();

  defaultList.checkCompletion();
  
  lists.addList(defaultList);
  lists.todayList = lists.getTodayList();
  lists.weekList = lists.getWeekList();
  UI.displayLists(lists);
  UI.displayTodoList(lists.arr[0]);
  lists.currentList = lists.arr[0];
}



//firebase stuff

window.signIn = async function () {
  // Sign in Firebase using popup auth and Google as the identity provider.
  var provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}


window.signOutUser = () => {
  // Sign out of Firebase.
  signOut(getAuth());
}

// Initialize firebase auth
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

// Triggers when the auth state change for instance when the user signs-in or signs-out.
function authStateObserver(user) {
  const userPicElement = document.getElementById('user-pic');
  const userNameElement = document.getElementById('user-name');
  const signOutButtonElement = document.getElementById('logout-btn');
  const signInButtonElement = document.getElementById('login-btn');

  if (user) {
    // User is signed in!
    // Get the signed-in user's profile pic and name.
    var profilePicUrl = getProfilePicUrl();
    var userName = getUserName();

    
    // Set the user's profile pic and name.
    userPicElement.src = profilePicUrl;
    userNameElement.textContent = `Hello, ${userName}!`;

    // Show user's profile and sign-out button.
    userNameElement.removeAttribute('hidden');
    userPicElement.removeAttribute('hidden');
    signOutButtonElement.removeAttribute('hidden');

    // Hide sign-in button.
    signInButtonElement.setAttribute('hidden', 'true');

    // We save the Firebase Messaging Device token and enable notifications. ---------------save todos hereer------------------------
    getLists(db);
  } else {
    // User is signed out!
    // Hide user's profile and sign-out button.
    userNameElement.setAttribute('hidden', 'true');
    userPicElement.setAttribute('hidden', 'true');
    signOutButtonElement.setAttribute('hidden', 'true');

    // Show sign-in button.
    signInButtonElement.removeAttribute('hidden');
    loadDefaultTodos();
  }
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
  return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
}

// Returns the signed-in user's display name.
function getUserName() {
  return getAuth().currentUser.displayName;
}

// Returns true if a user is signed-in.
function isUserSignedIn() {
  return !!getAuth().currentUser;
}





// Saves a new message to Cloud Firestore.
async function saveUserTodos(lists) {
  const uid = getAuth().currentUser.uid;
  // Add a new message entry to the Firebase database.
  try {
    await setDoc(doc(db, 'users', uid), {
      uid: uid,
      name: getUserName(),
      lists: lists
    });
  }
  catch(error) {
    console.error('Error writing new message to Firebase Database', error);
  }
}

async function getLists(db) {
  lists.clearLists();
  const uid = getAuth().currentUser.uid;
  console.log(uid);
  const docRef = doc(db, 'users', uid)
  const todoSnapshot = await getDoc(docRef);
  if (todoSnapshot.exists()) {
    const todoLists = todoSnapshot.data();
    console.log(todoLists.lists);
    lists.loadLists(todoLists.lists);
    lists.todayList = lists.getTodayList();
    lists.weekList = lists.getWeekList();
    UI.displayLists(lists);
    if (lists.arr.length > 0) {
      UI.displayTodoList(lists.arr[0]);
      lists.currentList = lists.arr[0];
    } else {
      UI.showEmptyList();
    }
  } else {
    console.log('doc not found')
    loadDefaultTodos();
  }
}

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

initFirebaseAuth();



