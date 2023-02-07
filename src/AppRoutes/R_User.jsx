import { Route } from "@solidjs/router";
import { LogInForm } from "../components/Authentification/LogInForm";
import { AddDrug } from "../components/Topics/Drogenkunde/Content/AddDrug";
import { UserDashboard } from "../components/User/Content/UserDashboard";

const Routes = () => {
  return (
    <>
      <Route path="login" component={LogInForm} />
      <Route path="dashboard" component={UserDashboard} />
      <Route path="neuedroge" component={AddDrug} />
    </>
  );
};

export { Routes as Routes_User };
