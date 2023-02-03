import { useAuth } from "../../Context/AuthContext";
import { handleSignOut } from "../../firebase";
import "./LogInButton.scss";

const LogInButton = () => {
  const [logedIn, { changeLogInState }] = useAuth();

  const handleClick = () => {
    handleSignOut();
    changeLogInState(false);
  };

  return (
    <>
      {/* <button onClick={signInWithGoogle}>Sign in with google</button> */}
      <button onClick={handleClick}>Sign Out</button>
    </>
  );
};

export { LogInButton };
