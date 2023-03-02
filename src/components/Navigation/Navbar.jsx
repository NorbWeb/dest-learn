import "./Navbar.scss";
import { A } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import Logo from "../../assets/whisky-logo-96.png";
import { LogOutButton, LogOutLi } from "../Authentification/LogOutButton";
import clickOutside from "../Helper/click-outside";

const Navbar = () => {
  const [open, setOpen] = createSignal(false);
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

  function handleShow(e) {
    setOpen(() => !open());
  }

  function clickOnBody() {
    setOpen(false);
    console.log("body");
  }

  return (
    <>
      <nav id="navbar" className="container">
        <A href="/" activeClass={false} className="no-style">
          <img src={Logo} alt="Logo" id="logo" />
        </A>
        <div className="responsive-menu">
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
        </div>
        <button
          id="menu-btn"
          className="btn icon-btn secondary"
          onClick={(e) => handleShow(e)}
        >
          <i class="bi bi-list"></i>
        </button>
        <Show when={open()}>
          <div className="dialoge-menu" use:clickOutside={() => setOpen(false)}>
            <ul>
              <For each={navItem}>
                {(item) => (
                  <A
                    href={item.href}
                    end={false}
                    onClick={() => setOpen(false)}
                  >
                    <li>{item.name}</li>
                  </A>
                )}
              </For>
              <LogOutLi />
            </ul>
          </div>
        </Show>
      </nav>
    </>
  );
};

export { Navbar };
