import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import { useAuth } from "../../Context/AuthContext";
import { logginEmailPassword } from "../../firebase";
import "./LogInForm.scss";

const LogInForm = () => {
  const [user] = useAuth();
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const handelLogin = (event) => {
    event.preventDefault();
    logginEmailPassword(email(), password(), showValidationError);
  };
  const navigate = useNavigate();
  const showValidationError = (message) => {
    let box = document.getElementById("logInError");
    if (message === true) {
      box.innerHTML = "";
      setEmail("");
      setPassword("");
      navigate("/user/dashboard");
    } else {
      if (box) {
        box.innerHTML = "E-Mail oder Passwort ist falsch";
      }
    }
  };

  function redirect() {
    if (user()) {
      navigate("/user/dashboard");
    }
  }

  createEffect(() => {
    redirect();
  });

  return (
    <div className="login-container">
      <div className="log-in-form">
        <h3>Willkommen zurück!</h3>
        <form onSubmit={handelLogin} className="form">
          <input
            name="email"
            type="email"
            placeholder="E-Mail"
            required
            onInput={(e) => setEmail(e.currentTarget.value)}
            value={email()}
          />
          <input
            name="password"
            type="password"
            placeholder="Passwort"
            required
            onInput={(e) => setPassword(e.currentTarget.value)}
            value={password()}
          />
          <button type="submit" className="btn primary">
            Los geht's!
          </button>
        </form>
        <div id="logInError" className="validation error"></div>
      </div>
    </div>
  );
};

export { LogInForm };
