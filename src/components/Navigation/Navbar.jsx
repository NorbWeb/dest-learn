import { A } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import "./Navbar.scss";
import Logo from "../../assets/whisky-logo-96.png";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const [navItem, setNavItem] = createSignal([
    { name: "Dokumentation", href: "/dokumentation", disabled: false },
    { name: "Über uns", href: "/about", disabled: false },
    { name: "User", href: "/user", disabled: false },
    { name: "Admin", href: "/admin", disabled: true },
  ]);

  const disabledStyle = {
    "pointer-events": "none",
    color: "grey",
  };

  const [loggedIn, { logOut }] = useAuth();

  return (
    <>
      <nav id="navbar" className="container">
        <A href="/" activeClass={false} className="no-style">
          <img src={Logo} alt="Logo" id="logo" />
        </A>
        <ul>
          <For each={navItem()}>
            {(item) => (
              <li>
                <A
                  style={item.disabled ? disabledStyle : {}}
                  href={item.href}
                  end={false}
                >
                  {item.name}
                </A>
              </li>
            )}
          </For>
        </ul>
        {loggedIn() ? (
          <button onClick={logOut} className="btn warn log-btn">
            Log Out
          </button>
        ) : (
          ""
        )}
      </nav>
    </>
  );
};

export { Navbar };
