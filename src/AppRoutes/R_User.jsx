import { Route } from "@solidjs/router";
import { LogInForm } from "../components/Authentification/LogInForm";
import { DrugKitchen } from "../components/Topics/Drogenkunde/DrugKitchen";
import { UserDashboard } from "../components/User/Content/UserDashboard";
import { useAuth } from "../Context/AuthContext";

const Routes = () => {
  const [user] = useAuth();
  return (
    <>
      <Route path="login" component={LogInForm} />
      <Route path="dashboard" component={UserDashboard} />
      <Route path="drug-kitchen" component={DrugKitchen} />
    </>
  );
};

export { Routes as Routes_User };
