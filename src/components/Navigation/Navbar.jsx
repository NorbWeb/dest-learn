import { A } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import "./Navbar.scss";
const Navbar = () => {
  const [navItem, setNavItem] = createSignal([
    { name: "Home", href: "/home" },
    { name: "About", href: "/about" },
    { name: "User", href: "/user" },
    { name: "Admin", href: "/admin" },
  ]);

  return (
    <>
      <nav id="navbar" className="container">
        <A href="/home" activeClass={false} className="no-style">
          <img src="src/assets/whisky-logo-96.png" alt="Logo" />
        </A>
        <ul>
          <For each={navItem()}>
            {(item) => (
              <li>
                <A href={item.href}>{item.name}</A>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </>
  );
};

export { Navbar };
