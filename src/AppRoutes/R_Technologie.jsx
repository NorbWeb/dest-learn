import { Route } from "@solidjs/router";
import { Destillation } from "../components/Topics/Technologie/Content/Destillation";
import { Test } from "../components/Topics/Technologie/Content/Test";

const Routes = () => {
  return (
    <>
      <Route path="destillation" element={Destillation} />
      <Route path="test" element={Test} />
    </>
  );
};

export { Routes as Routes_Technologie };
