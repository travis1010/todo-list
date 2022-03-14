const firebaseConfig = {
  apiKey: "AIzaSyBD5UVkhF2tZJPAoHasncgIKxp5_daIxbI",
  authDomain: "todo-list-c726c.firebaseapp.com",
  projectId: "todo-list-c726c",
  storageBucket: "todo-list-c726c.appspot.com",
  messagingSenderId: "372757320714",
  appId: "1:372757320714:web:839ac2117c78ecfbe1bbf3",
  measurementId: "G-RNT8G4B3ZL"
};

export function getFirebaseConfig() {
  if (!firebaseConfig || !firebaseConfig.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return firebaseConfig;
  }
}