import { useAuth } from "../../Context/AuthContext";
import { handleSignOut } from "../../firebase";
import "./LogInButton.scss";

const LogInButton = () => {
  const [logedIn, { toggleLogInState }] = useAuth();

  const handleClick = () => {
    handleSignOut();
    toggleLogInState();
  };

  return (
    <>
      {/* <button onClick={signInWithGoogle}>Sign in with google</button> */}
      <button onClick={handleClick}>Sign Out</button>
    </>
  );
};

export { LogInButton };
