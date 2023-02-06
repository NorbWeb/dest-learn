import { Outlet } from "@solidjs/router";
import "./User.scss";

const User = () => {
  const checker = sessionStorage.getItem("logedInUser");

  return (
    <>
      <div id="user" className="container">
        <Outlet />
      </div>
    </>
  );
};

export { User };
