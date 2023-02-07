import { Route, Navigate } from "@solidjs/router";
import { Layout } from "../components/Layout/Layout";
import { Info } from "../components/Info/Info";
import { User } from "../components/User/User";
import { NotFound } from "../components/NotFound/NotFound";
import { Technologie } from "../components/Topics/Technologie/Technologie";
import { Mathematik } from "../components/Topics/Mathematik/Mathematik";
import { Drogenkunde } from "../components/Topics/Drogenkunde/Drogenkunde";
import { Spirituosen } from "../components/Topics/Spirituosen/Spirituosen";
import { Routes_Technologie } from "./R_Technologie";
import { Routes_Mathematik } from "./R_Mathematik";
import { Routes_Drogenkunde } from "./R_Drogenkunde";
import { Routes_Spirituosen } from "./R_Spirituosen";
import { Home } from "../components/Home/Home";
import { About } from "../components/About/About";
import { LoadingSpinner } from "../components/Helper/LoadingSpinner/LoadingSpinner";
import { Routes_User } from "./R_User";

const AppRoutes = () => {
  return (
    <Route path="/" component={Layout}>
      <Route path="/" component={Home} />
      <Route
        path="/dokumentation"
        element={<Navigate href="/dokumentation/technologie/destillation" />}
      />
      <Route path="dokumentation" component={Info}>
        <Route path="technologie" component={Technologie}>
          <Routes_Technologie />
        </Route>
        <Route path="mathematik" component={Mathematik}>
          <Routes_Mathematik />
        </Route>
        <Route path="drogenkunde" component={Drogenkunde}>
          <Routes_Drogenkunde />
        </Route>
        <Route path="spirituosen" component={Spirituosen}>
          <Routes_Spirituosen />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
      <Route
        path="/user"
        element={<Navigate href="/user/dashboard" />}
      />
      <Route path="user" component={User}>
        <Routes_User />
      </Route>
      <Route path="about" component={About} />
      <Route path="*" component={NotFound} />
    </Route>
  );
};

// Empty helper component
const Default = (props) => {
  return (
    <div id={props.name.toLowerCase()} className="container">
      <LoadingSpinner />
    </div>
  );
};

export { AppRoutes };
