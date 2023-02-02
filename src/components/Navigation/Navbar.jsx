import { A } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import "./Navbar.scss";
import Logo from "../../assets/whisky-logo-96.png";
// import { useAuth } from "../../Context/AuthContext";
import { LogInButton } from "../Authentification/LogInButton";
import { getAuth } from "firebase/auth";

const Navbar = () => {
  const [navItem, setNavItem] = createSignal([
    {
      name: "Dokumentation",
      href: "/dokumentation",

      auth: false,
    },
    { name: "Über uns", href: "/about", auth: false },
    { name: "User", href: "/user", auth: false },
    { name: "Admin", href: "/admin", auth: true },
  ]);

const auth = getAuth()

  return (
    <>
      <nav id="navbar" className="container">
        <A href="/" activeClass={false} className="no-style">
          <img src={Logo} alt="Logo" id="logo" />
        </A>
        <ul>
          <For each={navItem()}>
            {(item) => (
              <Show
                when={true}
                fallback={
                  <Show when={!item.auth}>
                    <li>
                      <A href={item.href} end={false}>
                        {item.name}
                      </A>
                    </li>
                  </Show>
                }
              >
                <li>
                  <A href={item.href} end={false}>
                    {item.name}
                  </A>
                </li>
              </Show>
            )}
          </For>
        </ul>
      </nav>
    </>
  );
};

export { Navbar };
