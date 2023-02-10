import { Route } from "@solidjs/router";
import { Verordnung } from "../components/Topics/Spirituosen/Content/Verordnung";

const Routes = () => {
  return (
    <>
      <Route path="verordnung" component={Verordnung} />
    </>
  );
};

export { Routes as Routes_Spirituosen };
