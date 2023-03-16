import "./App.scss";
import { Routes } from "@solidjs/router";
import { AppRoutes } from "./AppRoutes/AppRoutes";
import { createEffect } from "solid-js";

function App() {
  createEffect(() => {});

  return (
    <>
      <Routes>
        <AppRoutes />
      </Routes>
    </>
  );
}

export default App;
