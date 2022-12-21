import { Outlet } from "@solidjs/router";
import { Navbar } from "../Navigation/Navbar";
import "./Home.scss";
const Home = () => {
  return (
    <>
        <header className="navbar">
          <Navbar />
        </header>
        <Outlet />
        <footer className="footer"><div className="container">Footer</div></footer>
    </>
  );
};

export { Home };
