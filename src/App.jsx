import logo from "./logo.svg";
import styles from "./App.module.scss";
import { Routes, Route } from "@solidjs/router";
import { Frame } from "./components/Frame/Frame";
import { User } from "./components/User/User";

function App() {
  return (
    <>
      {/* <div class={styles.App}>
        <header class={styles.header}>
          <img src={logo} class={styles.logo} alt="logo" />
          <p>
            Edit <code>src/App.jsx</code> and save to reload.
          </p>
          <a
            class={styles.link}
            href="https://github.com/solidjs/solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Solid
          </a>
        </header>
      </div> */}
      <Routes>
        <Route path="/users" component={User} />
        <Route
          path="/admin"
          component={
            <div>
              <h1>Admin Page Placeholder</h1>
            </div>
          }
        />
        <Route path="/" component={Frame} />
        <Route
          path="/about"
          component={
            <div>
              <h1>About Us Page Placeholder</h1>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;

