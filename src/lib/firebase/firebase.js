// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbFwDnwhuouuydhJ7cB_NYXfbeHZIClO8",
  authDomain: "fir-dcbba.firebaseapp.com",
  projectId: "fir-dcbba",
  storageBucket: "fir-dcbba.appspot.com",
  messagingSenderId: "605843886736",
  appId: "1:605843886736:web:d46b690b93f62c2a753e15",
  measurementId: "G-GXC9T0KCY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
