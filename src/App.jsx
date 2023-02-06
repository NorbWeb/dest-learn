import "./App.scss";
import { Routes } from "@solidjs/router";
import { AppRoutes } from "./AppRoutes/AppRoutes";
import { createEffect } from "solid-js";
import { useAuth } from "./Context/AuthContext";

function App() {
  const adminUsers = import.meta.env.VITE_ADMIN.split(",");
  let adminCheck = false;
  const isAdmin = async () => {
    if (adminUsers.includes("test")) {
      adminCheck = true;
    } else {
      adminCheck = false;
    }
  };
  const [user] = useAuth();

  createEffect(() => {
    isAdmin();
    // console.log("adminCheck: " + adminCheck);
  });

  return (
    <>
      <Routes>
        <AppRoutes />
      </Routes>
    </>
  );
}

export default App;
