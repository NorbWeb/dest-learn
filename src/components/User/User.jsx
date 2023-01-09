import { A } from "@solidjs/router";
import { useAuth } from "../../Context/AuthContext";
import "./User.scss";
const User = () => {
  const [loggedIn, { logIn, logOut }] = useAuth();

  return (
    <>
      <div id="user" className="container">
        User
      </div>
    </>
  );
};

export { User };
