import { Navigate, Outlet } from "@solidjs/router";
import { Match, Switch } from "solid-js";
import { useAuth } from "../../Context/AuthContext";
import "./User.scss";

const User = () => {
  const [user] = useAuth();

  return (
    <>
      <div id="user" className="container">
        <Switch>
          <Match when={!user()}>
            <Navigate href="/user/login" />
          </Match>
        </Switch>
        <Outlet />
      </div>
    </>
  );
};

export { User };
