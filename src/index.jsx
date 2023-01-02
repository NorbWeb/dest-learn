/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import { Router } from "@solidjs/router";
import "./index.scss";
import { AuthProvider } from "./components/Context/AuthContext";
import { CategoriesProvider } from "./components/Context/CategoriesContext";
import { items } from "./components/Topics/Drogenkunde/Content/_DrugData.jsx";

let userLoggedIn = "";
if (!localStorage.getItem("userLoggedIn")) {
  userLoggedIn = false;
} else {
  userLoggedIn = true;
}

function getCategories(inputArray) {
  const category = [];
  for (let i = 0; i < inputArray.length; i++) {
    if (!category.includes(inputArray[i].category)) {
      category.push(inputArray[i].category);
    }
  }
  return category;
}

render(
  () => (
    <AuthProvider loggedIn={userLoggedIn}>
      <CategoriesProvider categories={getCategories(items)}>
        <Router>
          <App />
        </Router>
      </CategoriesProvider>
    </AuthProvider>
  ),
  document.getElementById("root")
);
