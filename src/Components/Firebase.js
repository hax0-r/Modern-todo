// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBcOzYaKnyDwCftq0nw4cXVW87lmr87sZU",
    authDomain: "modern-todo-app-d5074.firebaseapp.com",
    projectId: "modern-todo-app-d5074",
    storageBucket: "modern-todo-app-d5074.appspot.com",
    messagingSenderId: "527599335165",
    appId: "1:527599335165:web:9b73b24540cbe77bb27094",
    measurementId: "G-B21NDB73K0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const MyCollection = collection(db, "Todo")

export {
    MyCollection,
    addDoc,
    getDocs,
    deleteDoc,
    doc
}