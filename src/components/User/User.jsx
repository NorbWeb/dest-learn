import { A } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { useAuth } from "../../Context/AuthContext";
import { logginEmailPassword } from "../../firebase";
import "./User.scss";

const User = () => {
  const [loggedIn, { logIn, logOut }] = useAuth();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  createEffect(() => {
    // console.log(email());
    // console.log(password());
  });

  const handelLogin = () => {
    logginEmailPassword(email(), password(), showValidationError);
  };

  const showValidationError = (message) => {
    let box = document.getElementById("loginError");
    if (message === true) {
      box.innerHTML = "";
      setEmail("");
      setPassword("");
    } else {
      box.innerHTML = "E-Mail / Passwort ist falsch";
    }
  };

  return (
    <>
      <div id="user" className="container">
        <h3>Willkommen</h3>
        <div className="form">
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            onInput={(e) => setEmail(e.currentTarget.value)}
            value={email()}
          />
          <input
            name="password"
            type="password"
            placeholder="Passwort"
            onInput={(e) => setPassword(e.currentTarget.value)}
            value={password()}
          />
          <button type="submit" onClick={() => handelLogin()}>
            Los geht's!
          </button>
        </div>
        <div id="loginError" className="validation error"></div>
      </div>
    </>
  );
};

export { User };
