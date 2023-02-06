import { Route } from "@solidjs/router";
import { LogInForm } from "../components/Authentification/LogInForm";
import { LogOutMessage } from "../components/Authentification/LogOutMessage";
import { UserDashboard } from "../components/User/Content/UserDashboard";

const Routes = () => {
  return (
    <>
      <Route path="/login" element={LogInForm} />
      <Route path="/logout" element={LogOutMessage} />
      <Route path="/dashboard" element={UserDashboard} />
    </>
  );
};

export { Routes as Routes_User };
