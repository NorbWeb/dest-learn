import { A } from "@solidjs/router";
import { useAuth } from "../Context/AuthContext";
import "./User.scss";
const User = () => {
  const [loggedIn, { logIn, logOut }] = useAuth();

  return (
    <>
      <div id="user" className="container">
        <div className="box">
          <h1>{loggedIn() ? "You wanna log out?" : "You wanna log in?"}</h1>
          <div className="btn-group">
            {loggedIn() ? (
              <button className="btn primary" onClick={logOut}>
                logout
              </button>
            ) : (
              <A href="/dokumentation" onClick={logIn} className="btn primary">
                login
              </A>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { User };
