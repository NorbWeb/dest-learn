/* @refresh reload */
import "./index.scss";
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import { DrugDataProvider } from "./Context/DrugDataContext";
import { ShuffleDataProvider } from "./Context/ShuffleData";
import { AuthProvider } from "./Context/AuthContext";
import { ContentProvider } from "./Context/ContentContext";

render(
  () => (
    <AuthProvider>
      <ContentProvider>
        <DrugDataProvider>
          <ShuffleDataProvider>
            <Router>
              <App />
            </Router>
          </ShuffleDataProvider>
        </DrugDataProvider>
      </ContentProvider>
    </AuthProvider>
  ),
  document.getElementById("root")
);
