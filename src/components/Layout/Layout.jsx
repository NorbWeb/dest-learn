import { Outlet } from "@solidjs/router";
import { Footer } from "../Navigation/Footer";
import { Navbar } from "../Navigation/Navbar";
import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <header id="header" className="primary mode shadow">
        <Navbar />
      </header>
      <main className='mode'>
        <Outlet />
      </main>
      <footer id="footer" className="secondary mode">
        <Footer/>
      </footer>
    </>
  );
};

export { Layout };
