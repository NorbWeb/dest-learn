import { Route, Navigate, Outlet } from "@solidjs/router";
import { Layout } from "../components/Layout/Layout";
import { Info } from "../components/Info/Info";
import { User } from "../components/User/User";
import { NotFound } from "../components/Helper/NotFound/NotFound";
import { Routes_Technologie } from "./R_Technologie";
import { Routes_Mathematik } from "./R_Mathematik";
import { Routes_Drogenkunde } from "./R_Drogenkunde";
import { Routes_Spirituosen } from "./R_Spirituosen";
import { Home } from "../components/Home/Home";
import { About } from "../components/About/About";
import { LoadingSpinner } from "../components/Helper/LoadingSpinner/LoadingSpinner";
import { Routes_User } from "./R_User";
import { Show } from "solid-js";
import { useAuth } from "../Context/AuthContext";
import { Impressum } from "../components/Impressum/Impressum";
import { Admin } from "../components/Admin/Admin";

const AppRoutes = () => {
  const [user] = useAuth();

  return (
    <Route path="/" component={Layout}>
      <Route path="/" component={Home} />
      <Route
        path="/dokumentation"
        element={<Navigate href="/dokumentation/technologie/destillation" />}
      />
      <Route path="/user" element={<Navigate href="/user/login" />} />
      <Route path="dokumentation" component={Info}>
        <Route path="technologie" element={<Outlet />}>
          <Routes_Technologie />
        </Route>
        <Route path="mathematik" element={<Outlet />}>
          <Routes_Mathematik />
        </Route>
        <Route path="drogenkunde" element={<Outlet />}>
          <Routes_Drogenkunde />
        </Route>
        <Route path="spirituosen" element={<Outlet />}>
          <Routes_Spirituosen />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
      <Route path="user" component={User}>
        <Routes_User />
      </Route>
      <Route
        path="admin"
        component={Admin}
      ></Route>
      <Route path="about" component={About} />
      <Route path="impressum" component={Impressum} />

      {/* switch: Loading Spinner / Not Found */}
      <Route
        path="*"
        component={
          <Show
            when={!sessionStorage.getItem("logedInUser")}
            fallback={<LoadingSpinner />}
          >
            <NotFound />
          </Show>
        }
      />
    </Route>
  );
};

// Empty helper component
const DefaultComponent = (props) => {
  const style = {
    width: "15rem",
    height: "15rem",
    "object-fit": "cover",
    "border-radius": "2rem",
  };
  return (
    <div id={props.name} className="container default-component">
      <h2>{props.name}</h2>
      {props.img ? (
        <img style={style} src={props.img ? props.img : "/placeholder.svg"} />
      ) : (
        ""
      )}
      {props.loading ? <LoadingSpinner /> : ""}
      {props.back ? (
        <>
          <div>Noch keine Inhalte auf dieser Seite vorhanden.</div>
          <button
            className="btn primary"
            style={"margin:1rem"}
            onClick={() => {
              history.back();
            }}
          >
            Zurück
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export { AppRoutes, DefaultComponent };
