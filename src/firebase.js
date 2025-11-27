// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, OAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfQzC8KKPAtmX5Q7D4lPsBHvqWTUM8P84",
  authDomain: "e-commerce-7a267.firebaseapp.com",
  projectId: "e-commerce-7a267",
  storageBucket: "e-commerce-7a267.firebasestorage.app",
  messagingSenderId: "580005396468",
  appId: "1:580005396468:web:08bf506b2f87c1f3b783a1",
  measurementId: "G-HY2RC69ZSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();