import "./App.scss";
import { Routes, Route, Navigate } from "@solidjs/router";

import { useAuth } from "./Context/AuthContext";
import { AppRoutes, AuthRoutes } from "./AppRoutes/AppRoutes";
import { createEffect, Show } from "solid-js";

function App() {
  const [logedIn] = useAuth();
  const adminUsers = import.meta.env.VITE_ADMIN.split(",");
  let adminCheck = false;
  const isAdmin = () => {
    let compare = sessionStorage.getItem("logedInUser");
    if (adminUsers.includes(compare)) {
      adminCheck = true;
    } else {
      adminCheck = false;
    }
  };

  createEffect(() => {
    isAdmin();
    console.log("adminCheck: " + adminCheck);
  });

  return (
    <>
      <Routes>
        <AppRoutes />
        <AuthRoutes logedIn={logedIn()} admin={adminCheck} />
      </Routes>
    </>
  );
}

export default App;
