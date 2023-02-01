// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore/lite'
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFoMpPJHvKLlW-L8Mqek2K6DAM40x_iYo",
  authDomain: "dest-learn.firebaseapp.com",
  databaseURL: "https://dest-learn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dest-learn",
  storageBucket: "dest-learn.appspot.com",
  messagingSenderId: "80696665701",
  appId: "1:80696665701:web:d949493ba79f0ae96d088c",
  measurementId: "G-QCM590K9V6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);

export const signInWithGoogle = () => signInWithPopup(auth, provider)