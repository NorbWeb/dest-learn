import { Route } from "@solidjs/router";
import { DrugDetail } from "../components/Topics/Drogenkunde/DrugDetail";
import { DrugLearn } from "../components/Topics/Drogenkunde/DrugLearn";
import { DrugOverview } from "../components/Topics/Drogenkunde/DrugOverview";

const Routes = () => {
  return (
    <>
      <Route path="sammlung" component={DrugOverview} />
      <Route path="sammlung/:id" component={DrugDetail} />
      <Route path="lernen" component={DrugLearn} />
    </>
  );
};
export { Routes as Routes_Drogenkunde };
