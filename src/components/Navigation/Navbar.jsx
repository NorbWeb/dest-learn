import { A } from "@solidjs/router";
import "./Navbar.scss";
const Navbar = () => {
  return (
    <>
      <nav id="navbar">
        <A href="/home" activeClass="active">
          Home
        </A>
        <A href="/about" activeClass="active">
          About
        </A>
        <A href="/user" activeClass="active">
          User
        </A>
        <A href="/admin" activeClass="active">
          Admin
        </A>
      </nav>
    </>
  );
};

export { Navbar };
