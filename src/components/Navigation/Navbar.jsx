import { A } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import "./Navbar.scss";
import Logo from '../../assets/whisky-logo-96.png';

const Navbar = () => {
  const [navItem, setNavItem] = createSignal([
    { name: "Dokumentation", href: "/dokumentation", disabled: false },
    { name: "Über uns", href: "/about" , disabled: false },
    { name: "User", href: "/user", disabled: true  },
    { name: "Admin", href: "/admin" , disabled: true },
  ]);

  return (
    <>
      <nav id="navbar" className="container">
        <A href="/dokumentation/technologie/destillation" activeClass={false} className="no-style">
          <img src={Logo} alt="Logo" />
        </A>
        <ul>
          <For each={navItem()}>
            {(item) => (
              <li>
                <A style={item.disabled ? {} : {}}  href={item.href} end={false}>{item.name}</A>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </>
  );
};

export { Navbar };
