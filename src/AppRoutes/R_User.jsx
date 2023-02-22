import { Route } from "@solidjs/router";
import { LogInForm } from "../components/Authentification/LogInForm";
import { AddDrug } from "../components/Topics/Drogenkunde/AddDrug";
import { UserDashboard } from "../components/User/Content/UserDashboard";
import { useAuth } from "../Context/AuthContext";
import { DefaultComponent } from "./AppRoutes";

const Routes = () => {
  const [user] = useAuth();
  return (
    <>
      <Route path="login" component={LogInForm} />
      <Route path="dashboard" component={UserDashboard} />
      <Route path="add-drug" component={AddDrug} />
    </>
  );
};

export { Routes as Routes_User };