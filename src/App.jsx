import "./App.scss";
import { Routes } from "@solidjs/router";
import { AppRoutes } from "./AppRoutes/AppRoutes";
import { createEffect } from "solid-js";

function App() {
  const adminUsers = import.meta.env.VITE_ADMIN.split(",");

  createEffect(() => {
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
