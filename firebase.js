import firebase from "firebase";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPAf6nWVOEqvz5e1g7MSKSJrzfv7QHm8Q",
  authDomain: "perpustakaanjdih-c3ccc.firebaseapp.com",
  projectId: "perpustakaanjdih-c3ccc",
  storageBucket: "perpustakaanjdih-c3ccc.appspot.com",
  messagingSenderId: "539274404382",
  appId: "1:539274404382:web:f17d89fbe5badbc76d440f",
  measurementId: "G-F19SQPC603",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { db, auth, storage };
