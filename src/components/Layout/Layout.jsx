import { Outlet } from "@solidjs/router";
import { Navbar } from "../Navigation/Navbar";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <header id="header" className="primary mode shadow">
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer id="footer" className="secondary mode">
        <div className="container">Footer</div>
      </footer>
    </>
  );
};

export { Layout };
