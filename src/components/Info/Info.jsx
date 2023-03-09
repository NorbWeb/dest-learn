import { Outlet } from "@solidjs/router";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Info.scss";
const Info = () => {
  return (
    <>
      <div class="container sidebar-main-grid">
        <aside className="sidebar bg mode">
          <Sidebar />
        </aside>
        <div className="main mode">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export { Info };
