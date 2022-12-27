import { Routes, Route, Navigate } from "@solidjs/router";
import { Layout } from "./components/Layout/Layout";
import { Info } from "./components/Info/Info";
import { User } from "./components/User/User";
import { NotFound } from "./components/NotFound/NotFound";
import { Routes_Technologie, Technologie } from "./components/Topics/Technologie/Technologie";
import { Mathematik, Routes_Mathematik } from "./components/Topics/Mathematik/Mathematik";
import { Drogenkunde, Routes_Drogenkunde } from "./components/Topics/Drogenkunde/Drogenkunde";
import { Routes_Spirituosen, Spirituosen } from "./components/Topics/Spirituosen/Spirituosen";
import { Home } from "./components/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" component={Layout}>
          <Route path="/" component={Home}/>
          <Route
            path="/dokumentation"
            element={
              <Navigate href="/dokumentation/technologie/destillation" />
            }
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
          <Route path="user" component={User} />
          <Route
            path="admin"
            element={<div className="container">Admin</div>}
          />
          <Route
            path="about"
            element={<div className="container">About</div>}
          />
          <Route path="*" component={NotFound} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

