/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import "./index.scss";
import { AuthProvider } from "./components/Context/AuthContext";
import { DrugDataProvider } from "./components/Context/DrugDataContext";

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
        <Router>
          <App />
        </Router>
      </DrugDataProvider>
    </AuthProvider>
  ),
  document.getElementById("root")
);

