import { Navigate, Route } from "@solidjs/router";
import { LogInForm } from "../components/Authentification/LogInForm";
import { DrugKitchen } from "../components/Topics/Drogenkunde/DrugKitchen";
import { Editorial } from "../components/User/Editorial/Editorial";
import { ImageStore } from "../components/User/Content/ImageStore";
import { UserDashboard } from "../components/User/Content/UserDashboard";
import { useAuth } from "../Context/AuthContext";
// import { DefaultComponent } from "./AppRoutes";

const Routes = () => {
  const [user] = useAuth();
  return (
    <>
      <Route path="login" component={LogInForm} />
      <Route path="dashboard" component={UserDashboard} />
      <Route path="drug-kitchen" component={DrugKitchen} />
      <Route path="editorial-office" component={Editorial} />
      <Route path="image-store" component={ImageStore} />
      {/* <Route
        path="profile"
        component={
          <DefaultComponent
            back
            name={user().displayName}
            img={user().photoURL}
          />
        }
      /> */}
      <Route path="*" element={<Navigate href="/user/login" />} />
    </>
  );
};

export { Routes as Routes_User };
