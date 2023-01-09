/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import "./index.scss";
import { AuthProvider } from "./Context/AuthContext";
import { DrugDataProvider } from "./Context/DrugDataContext";
import { ShuffleDataProvider } from "./Context/ShuffleData";

let userLoggedIn = "";
if (!localStorage.getItem("userLoggedIn")) {
  userLoggedIn = false;
} else {
  userLoggedIn = true;
}

render(
  () => (
    <AuthProvider loggedIn={userLoggedIn}>
      <DrugDataProvider>
        <ShuffleDataProvider>
          <Router>
            <App />
          </Router>
        </ShuffleDataProvider>
      </DrugDataProvider>
    </AuthProvider>
  ),
  document.getElementById("root")
);

