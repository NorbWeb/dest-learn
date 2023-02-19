import { Route } from "@solidjs/router";
import { LogInForm } from "../components/Authentification/LogInForm";
import { AddDrug } from "../components/Topics/Drogenkunde/AddDrug";
import { UserDashboard } from "../components/User/Content/UserDashboard";
import { DefaultComponent } from "./AppRoutes";

const Routes = () => {
  return (
    <>
      <Route path="login" component={LogInForm} />
      <Route path="dashboard" component={UserDashboard} />
      <Route path="add-drug" component={AddDrug} />
      <Route path="edit-drug" component={AddDrug} />
      {/* <Route
        path="edit-drug"
        component={<DefaultComponent name={"Droge bearbeiten"} back />}
      /> */}
    </>
  );
};

export { Routes as Routes_User };
