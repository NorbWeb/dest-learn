/* @refresh reload */
import "./index.scss";
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import { DrugDataProvider } from "./Context/DrugDataContext";
import { ShuffleDataProvider } from "./Context/ShuffleData";
import { AuthProvider } from "./Context/AuthContext";

render(
  () => (
    <AuthProvider>
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
