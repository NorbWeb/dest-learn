import { Outlet, Route } from "@solidjs/router";
import { Destillation } from "./Content/Destillation";
import { Test } from "./Content/Test";

const Technologie = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

const Routes = () => {
  return (
    <>
      <Route path="destillation" element={Destillation} />
      <Route path="test" element={Test} />
    </>
  )
}

export { Technologie };
export {Routes as Routes_Technologie}
