import { Show } from "solid-js";
import { useAuth } from "../../Context/AuthContext";
import { handleSignOut } from "../../firebase";
import "./LogOutButton.scss";

const LogOutButton = () => {
  const [user] = useAuth();

  const handleClick = () => {
    handleSignOut();
  };

  return (
    <>
      {/* <button onClick={signInWithGoogle}>Sign in with google</button> */}
      <div className="nav-menu-rigth btn-group">
        <Show when={user()} fallback={<div></div>}>
          {/* <button className="avatar-btn">
            <i class="bi bi-person-circle"></i>
          </button> */}
          <button className="btn secondary log-out-btn" onClick={handleClick}>
            Abmelden
          </button>
        </Show>
      </div>
    </>
  );
};

const LogOutElement = (props) => {
  const [user] = useAuth();

  const handleClick = () => {
    handleSignOut();
    props.closeNav;
  };

  return (
    <>
      <Show when={user()} fallback={<div></div>}>
        <div className="log-out" onClick={handleClick}>
          <div>Abmelden</div>
        </div>
      </Show>
    </>
  );
};

export { LogOutButton, LogOutElement };
