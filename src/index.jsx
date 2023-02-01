/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import "./index.scss";
// import { AuthProvider } from "./Context/AuthContext";
import { DrugDataProvider } from "./Context/DrugDataContext";
import { ShuffleDataProvider } from "./Context/ShuffleData";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createEffect } from "solid-js";

const auth = getAuth();

createEffect(()=>{
  onAuthStateChanged(auth, (user)=>{
    if(user){
      console.log(user, auth)
    } else {
      userLoggedIn = null
    }
  })
})

let userLoggedIn = null;


render(
  () => (
    // <AuthProvider loggedIn={userLoggedIn}>
      <DrugDataProvider>
        <ShuffleDataProvider>
          <Router>
            <App />
          </Router>
        </ShuffleDataProvider>
      </DrugDataProvider>
    // </AuthProvider>
  ),
  document.getElementById("root")
);

