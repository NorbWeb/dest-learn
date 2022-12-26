import { Outlet } from "@solidjs/router";
import { Chemie } from "../Content/Chemie/Chemie";
import { Drogenkunde } from "../Content/Drogenkunde/Drogenkunde";
import { Destillation } from "../Content/Technologie/content/Destillation";
import { Sidebar } from "../Sidebar/Sidebar";
import "./Info.scss";
const Info = () => {
  return (
    <>
      <div class="container sidebar-main-grid">
        <Sidebar />
        <div className="main">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export { Info };
