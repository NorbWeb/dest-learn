/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import "./index.scss";



render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root")
);

