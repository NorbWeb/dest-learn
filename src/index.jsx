/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import "./index.scss";
import { AuthProvider } from "./components/Context/AuthContext";
import { items } from "./_DrugData.jsx";
import { DrugDataProvider } from "./components/Context/DrugDataContext";

let userLoggedIn = "";
if (!localStorage.getItem("userLoggedIn")) {
  userLoggedIn = false;
} else {
  userLoggedIn = true;
}

render(
  () => (
    <DrugDataProvider data={items}>
      <AuthProvider loggedIn={userLoggedIn}>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </DrugDataProvider>
  ),
  document.getElementById("root")
);

