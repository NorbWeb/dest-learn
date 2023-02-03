// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

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
    validator(true);
  } catch (error) {
    validator(error);
  }
};


const monitorAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      sessionStorage.setItem("logedInUser", user.uid);
      // sessionStorage.setItem("userRole", "admin");
    } else if (user) {
      sessionStorage.setItem("logedInUser", user.uid);
    } else {
      sessionStorage.removeItem("logedInUser");
      // sessionStorage.removeItem("userRole");
    }
  });
};

monitorAuthState();

const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

export { logginEmailPassword, handleSignOut };
