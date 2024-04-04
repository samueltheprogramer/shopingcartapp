// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwLQh2BEMr54MeRK5wP2mHNJoKgCztErI",
  authDomain: "cartshopingapp2.firebaseapp.com",
  projectId: "cartshopingapp2",
  storageBucket: "cartshopingapp2.appspot.com",
  messagingSenderId: "1008783306974",
  appId: "1:1008783306974:web:63cbeed8e7bfac8d67d24f",
  measurementId: "G-EN3K0LQHJ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
