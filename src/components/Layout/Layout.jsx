import { Outlet } from "@solidjs/router";
import { Navbar } from "../Navigation/Navbar";
import "./Layout.scss";
const Layout = () => {
  return (
    <>
      <header id="header" className="primary dark">
        <Navbar />
      </header>
        <Outlet className="dark"/>
      <footer id="footer" className="secondary">
        <div className="container">Footer</div>
      </footer>
    </>
  );
};

export { Layout };
