import { A } from "@solidjs/router";
// import { useAuth } from "../../Context/AuthContext";
import { LogInButton } from "../Authentification/LogInButton";
import "./User.scss";
const User = () => {
  // const [loggedIn, { logIn, logOut }] = useAuth();

  return (
    <>
      <div id="user" className="container">
        User
        <LogInButton/>
      </div>
    </>
  );
};

export { User };
