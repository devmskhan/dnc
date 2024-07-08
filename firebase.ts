// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHlIB2CL0l36e1f-8FLLTPLjlKER9LjC4",
  authDomain: "dn-proj.firebaseapp.com",
  projectId: "dn-proj",
  storageBucket: "dn-proj.appspot.com",
  messagingSenderId: "991522785055",
  appId: "1:991522785055:web:0814ac0f5e482eaf3c522a",
  measurementId: "G-9WN0L805W9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };