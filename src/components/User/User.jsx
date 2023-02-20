import { Outlet, useNavigate } from "@solidjs/router";
import { createEffect } from "solid-js";
import { useAuth } from "../../Context/AuthContext";
import "./User.scss";

const User = () => {
  const [user] = useAuth();
  const navigate = useNavigate();

  function redirect() {
    if (!user()) {
      if (!sessionStorage.getItem("logedInUser")) {
        navigate("/user/login");
      }
    }
  }

  createEffect(() => {
    redirect();
  });

  return (
    <>
      <div id="user" className="container">
        <Outlet />
      </div>
    </>
  );
};

export { User };
