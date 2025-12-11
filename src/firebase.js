// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK1xMIwLoSAq8AYZejlfADP7d3mXsVJY8",
  authDomain: "e-commerce2-8c1cf.firebaseapp.com",
  projectId: "e-commerce2-8c1cf",
  storageBucket: "e-commerce2-8c1cf.firebasestorage.app",
  messagingSenderId: "31534622530",
  appId: "1:31534622530:web:b7b4efaf650fe785ef8adb",
  measurementId: "G-QML5KCKQYL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);


