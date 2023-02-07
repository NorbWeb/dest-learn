import { Route } from "@solidjs/router";
import { Einheiten } from "../components/Topics/Mathematik/Content/Einheiten";

const Routes = () => {
  return (
    <>
      <Route path="einheiten" component={Einheiten} />
    </>
  );
};

export { Routes as Routes_Mathematik };
