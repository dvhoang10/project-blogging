// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY6blnOv-44Ysa_pAlGRhYJA1TbnFgiP8",
  authDomain: "monkey-blogging-29f9b.firebaseapp.com",
  projectId: "monkey-blogging-29f9b",
  storageBucket: "monkey-blogging-29f9b.appspot.com",
  messagingSenderId: "486121021847",
  appId: "1:486121021847:web:a80dfc6c3d922dafba64d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
