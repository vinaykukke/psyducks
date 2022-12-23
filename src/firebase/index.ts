// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCD9mhSuwv91sVWmdnOtgcHUf9bwfPcS3k",
  authDomain: "psyducks-6c2ef.firebaseapp.com",
  projectId: "psyducks-6c2ef",
  storageBucket: "psyducks-6c2ef.appspot.com",
  messagingSenderId: "334133693088",
  appId: "1:334133693088:web:1dca4e32ad2731dde957c5",
  measurementId: "G-Y1C94TT2JH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
