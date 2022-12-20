import { Outlet } from "@solidjs/router";
import { Navbar } from "../Navigation/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import "./PageWrapper.scss";
const PageWrapper = () => {
  return (
    <>
      <div id="page-wrapper">
        <div className="header">
          <Navbar />
        </div>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="main">
          <Outlet />
        </div>
        <div className="footer">footer</div>
      </div>
    </>
  );
};

export { PageWrapper };
