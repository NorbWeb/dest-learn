/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import "./index.scss";
import { DrugDataProvider } from "./Context/DrugDataContext";
import { ShuffleDataProvider } from "./Context/ShuffleData";
import { UserProvider } from "./Context/AuthContext";

// let logedIn = false;
// if (currentUser) {
//   logedIn = true;
// } else {
//   logedIn = false;
// }

render(
  () => (
    <UserProvider>
      <DrugDataProvider>
        <ShuffleDataProvider>
          <Router>
            <App />
          </Router>
        </ShuffleDataProvider>
      </DrugDataProvider>
    </UserProvider>
  ),
  document.getElementById("root")
);
