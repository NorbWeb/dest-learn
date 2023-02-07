import "./Navbar.scss";
import { A } from "@solidjs/router";
import { For } from "solid-js";
import Logo from "../../assets/whisky-logo-96.png";
import { LogOutButton } from "../Authentification/LogOutButton";

const Navbar = () => {
  const navItem = [
    {
      name: "Dokumentation",
      href: "/dokumentation",
    },
    { name: "Über uns", href: "/about" },

    {
      name: "User",
      href: "/user",
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
          <For each={navItem}>
            {(item) => (
              <li>
                <A href={item.href} end={false}>
                  {item.name}
                </A>
              </li>
            )}
          </For>
        </ul>
        <LogOutButton />
      </nav>
    </>
  );
};

export { Navbar };
