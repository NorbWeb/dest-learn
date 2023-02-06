import "./Navbar.scss";
import { A } from "@solidjs/router";
import { Show } from "solid-js";
import Logo from "../../assets/whisky-logo-96.png";
import { LogOutButton } from "../Authentification/LogOutButton";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const [user] = useAuth();
  const navItem = [
    {
      name: "Dokumentation",
      href: "/dokumentation",
    },
    { name: "Über uns", href: "/about" },

    {
      name: "User",
      href: "/user/login",
    },
    {
      name: "User",
      href: "/user/dashboard",
    },

    { name: "Admin", href: "/admin" },
  ];

  return (
    <>
      <nav id="navbar" className="container">
        <A href="/" activeClass={false} className="no-style">
          <img src={Logo} alt="Logo" id="logo" />
        </A>
        <ul>
          <li>
            <A href={navItem[0].href} end={false}>
              {navItem[0].name}
            </A>
          </li>
          <li>
            <A href={navItem[1].href} end={false}>
              {navItem[1].name}
            </A>
          </li>
          <Show
            when={user()}
            fallback={
              <li>
                <A href={navItem[2].href} end={false}>
                  {navItem[2].name}
                </A>
              </li>
            }
          >
            <li>
              <A href={navItem[3].href} end={false}>
                {navItem[3].name}
              </A>
            </li>
          </Show>

          <li>
            <A href={navItem[4].href} end={false}>
              {navItem[4].name}
            </A>
          </li>
        </ul>
        <LogOutButton />
      </nav>
    </>
  );
};

export { Navbar };
