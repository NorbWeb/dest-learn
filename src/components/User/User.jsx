import { useAuth } from "../Context/AuthContext";
import "./User.scss";
const User = () => {
  const [loggedIn, { logIn, logOut }] = useAuth();
  console.log(loggedIn());

  return (
    <>
      <div className="container">
        <div className="box">
          <h1>Log In</h1>
          <div className="btn-group">
            <button className="btn primary" onClick={logIn}>
              login
            </button>
            <button className="btn primary" onClick={logOut}>
              logout
            </button>
          </div>
          <br />
          <div className="message">
            {loggedIn() ? "You are logged in" : "You are logged out"}
          </div>
        </div>
      </div>
    </>
  );
};

export { User };
