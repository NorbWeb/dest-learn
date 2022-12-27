import { Outlet, Route } from "@solidjs/router";
import { Verordnung } from "./Content/Verordnung";

const Spirituosen = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const Routes = () => {
  return (
    <>
      <Route path="verordnung" element={Verordnung} />
    </>
  )
}

export { Spirituosen };
export { Routes as Routes_Spirituosen }

