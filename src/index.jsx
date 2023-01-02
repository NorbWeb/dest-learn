/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import "./index.scss";
import { AuthProvider } from "./components/Context/AuthContext";

let userLoggedIn = "";
if (!localStorage.getItem("userLoggedIn")) {
  userLoggedIn = false;
} else {
  userLoggedIn = true;
}

render(
  () => (
    <AuthProvider loggedIn={userLoggedIn}>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  ),
  document.getElementById("root")
);
