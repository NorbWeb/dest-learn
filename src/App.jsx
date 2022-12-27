import { Routes, Route, Navigate } from "@solidjs/router";
import { Layout } from "./components/Layout/Layout";
import { Info } from "./components/Info/Info";
import { User } from "./components/User/User";
import { Destillation } from "./components/Topics/Technologie/Content/Destillation";
import { NotFound } from "./components/NotFound/NotFound";
import { Technologie } from "./components/Topics/Technologie/Technologie";
import { Mathematik } from "./components/Topics/Mathematik/Mathematik";
import { Drogenkunde } from "./components/Topics/Drogenkunde/Drogenkunde";
import { Spirituosen } from "./components/Topics/Spirituosen/Spirituosen";
import { Einheiten } from "./components/Topics/Mathematik/Content/Einheiten";
import { Verordnung } from "./components/Topics/Spirituosen/Content/Verordnung";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" component={Layout}>
          <Route
            path="/dokumentation"
            element={
              <Navigate href="/dokumentation/technologie/destillation" />
            }
          />
          <Route path="dokumentation" component={Info}>
            <Route path="technologie" component={Technologie}>
              <Route path="destillation" element={Destillation} />
            </Route>
            <Route path="mathematik" component={Mathematik}>
              <Route path="einheiten" element={Einheiten} />
            </Route>
            <Route path="drogenkunde" component={Drogenkunde}>
              <Route path="destillation" element={Destillation} />
            </Route>
            <Route path="spirituosen" component={Spirituosen}>
              <Route path="verordnung" element={Verordnung} />
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

