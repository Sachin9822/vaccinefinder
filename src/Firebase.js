import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDrSDzP7UHRDyof8HTATD6AbdBLl2Ic4Gk",
  authDomain: "vaccinefinder-89f1c.firebaseapp.com",
  projectId: "vaccinefinder-89f1c",
  storageBucket: "vaccinefinder-89f1c.appspot.com",
  messagingSenderId: "598285521559",
  appId: "1:598285521559:web:c34b6da9e6d354ac1f4fd2",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
