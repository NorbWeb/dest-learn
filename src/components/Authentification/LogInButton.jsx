import "./LogInButton.scss";
// import { useAuth } from "../../Context/AuthContext";
import { signInWithGoogle } from "../../../firebase";
import { getAuth, signOut } from "firebase/auth";

const LogInButton = () => {
  // const [loggedIn, { logIn, logOut }] = useAuth();

  const auth = getAuth();
  function handleSignOut() {
    signOut(auth)
      .then(() => {
        console.log(auth)
        
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <>
      <Show
        when={false}
        fallback={
          <button onClick={() => console.log("log in")} className="btn success log-btn">
            Log In
          </button>
        }
      >
        <button onClick={()=> console.log('log out')} className="btn warn log-btn">
          Log Out
        </button>
      </Show>
      <button onClick={signInWithGoogle}>Sign in with google</button>
      <button onClick={handleSignOut}>Sign Out</button>
    </>
  );
};

export { LogInButton };
