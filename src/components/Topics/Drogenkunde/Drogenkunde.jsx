import { Outlet, Route } from "@solidjs/router";
import { DrugDetail } from "./Content/DrugDetail";
import { DrugLearn } from "./Content/DrugLearn";
import { DrugOverview } from "./Content/DrugOverview";

const Drogenkunde = () => {

  return (
    <>
      <Outlet />
    </>
  );
};

const Routes = () => {
  return (
    <>
      <Route path="sammlung" element={DrugOverview} />
      <Route path="sammlung/:id" element={DrugDetail} />
      <Route path="lernen" element={DrugLearn} />

    </>
  );
};
export { Drogenkunde };
export { Routes as Routes_Drogenkunde };
