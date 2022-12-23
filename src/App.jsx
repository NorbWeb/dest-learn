import { Routes, Route } from "@solidjs/router";
import { Layout } from "./components/Layout/Layout";
import { Info } from "./components/Info/Info";
import { User } from "./components/User/User";
import { createSignal } from "solid-js";

function App() {
  const [mode, setMode] = createSignal("dark");

  function handleMode() {
    let modeChanger = document.getElementsByClassName("mode");
    modeChanger.className += "dark";
  }

  return (
    <>
      <Routes>
        <Route path="/" component={Layout}>
          <Route path="/home" component={Info} />
          <Route path="/user" component={User} />
          <Route
            path="/admin"
            element={<div className="container">Admin</div>}
          />
          <Route
            path="/about"
            element={<div className="container">About</div>}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

