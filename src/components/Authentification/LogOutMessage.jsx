import { useNavigate } from "@solidjs/router";
import { createSignal, onCleanup } from "solid-js";
import "./LogOutMessage.scss";

const LogOutMessage = () => {
  const navigate = useNavigate();

  const [count, setCount] = createSignal(5);

  function timer() {
    setTimeout(() => {
      navigate("/user/login");
    }, 5000);
    setInterval(() => setCount(count() - 1), 1000);
  }

  timer();

  return (
    <div className="message">
      <h3>Erfolgreich abgemeldet</h3>
      <p>Weiterleitung in: {count()} s</p>
    </div>
  );
};

export { LogOutMessage };
