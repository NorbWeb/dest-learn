// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFoMpPJHvKLlW-L8Mqek2K6DAM40x_iYo",
  authDomain: "dest-learn.firebaseapp.com",
  databaseURL:
    "https://dest-learn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dest-learn",
  storageBucket: "dest-learn.appspot.com",
  messagingSenderId: "80696665701",
  appId: "1:80696665701:web:d949493ba79f0ae96d088c",
  measurementId: "G-QCM590K9V6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

const logginEmailPassword = async (email, password, validator) => {
  const loginEmail = email;
  const loginPassword = password;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log(uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    validator(true);
  } catch (error) {
    validator(error);
  }
};

export { logginEmailPassword };
