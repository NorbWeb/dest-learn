import { Route } from "@solidjs/router";
import { Verordnung } from "../components/Topics/Spirituosen/Content/Verordnung";

const Routes = () => {
  return (
    <>
      <Route path="verordnung" element={Verordnung} />
    </>
  );
};

export { Routes as Routes_Spirituosen };
