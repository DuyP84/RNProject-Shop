// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword}from "firebase/auth";
import "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2hs-9kluIH6bVWsjp2nkGiQraCwrdPlg",
  authDomain: "rnproject-b2ee8.firebaseapp.com",
  databaseURL: "https://rnproject-b2ee8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rnproject-b2ee8",
  storageBucket: "rnproject-b2ee8.appspot.com",
  messagingSenderId: "489801684856",
  appId: "1:489801684856:web:5a270ecf1b2a3b5ede9a8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

