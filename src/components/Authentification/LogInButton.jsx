import "./LogInButton.scss";
import { useAuth } from "../Context/AuthContext";

const LogInButton = () => {
  const [loggedIn, { logIn, logOut }] = useAuth();

  return (
    <>
      <Show
        when={loggedIn()}
        fallback={
          <button onClick={()=>logIn("user")} className="btn success log-btn">
            Log In
          </button>
        }
      >
        <button onClick={logOut} className="btn warn log-btn">
          Log Out
        </button>
      </Show>
    </>
  );
};

export { LogInButton };
