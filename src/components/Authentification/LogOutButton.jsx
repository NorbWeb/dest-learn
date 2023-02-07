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
      <Show when={user()}>
        <div className="nav-menu-rigth btn-group">
          {/* <button className="avatar-btn">
            <i class="bi bi-person-circle"></i>
          </button> */}
          <button className="btn secondary log-out-btn" onClick={handleClick}>
            Abmelden
          </button>
        </div>
      </Show>
    </>
  );
};

export { LogOutButton };
