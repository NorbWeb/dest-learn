import { useAuth } from "../../../Context/AuthContext";
import "./UserDashboard.scss";

const UserDashboard = () => {
  const [user] = useAuth();

  return (
    <>
      <h3 className="title">
        Hallo {user().displayName ? user().displayName : user().email}
      </h3>
      <div className="box">
        <div className="placeholder-box"></div>
        <div className="placeholder-box"></div>
        <div className="placeholder-box"></div>
        <div className="placeholder-box"></div>
        <div className="placeholder-box"></div>
        <div className="placeholder-box"></div>
        <div className="placeholder-box"></div>
        <div className="placeholder-box"></div>
      </div>
    </>
  );
};

export { UserDashboard };
