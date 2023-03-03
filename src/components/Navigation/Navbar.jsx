import "./Navbar.scss";
import { A } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import Logo from "../../assets/whisky-logo-96.png";
import { LogOutButton, LogOutLi } from "../Authentification/LogOutButton";
import clickOutside from "../Helper/click-outside";
import { Sidebar } from "../Sidebar/Sidebar";

const Navbar = () => {
  const [open, setOpen] = createSignal(false);
  const [sideMenuOpen, setSideMenuOpen] = createSignal(false);

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

    // { name: "Admin", href: "/admin" },
  ];

  function handleShow(e) {
    setOpen(() => !open());
  }

  function handleSideMenu() {
    setSideMenuOpen(() => !sideMenuOpen());
  }

  return (
    <>
      <nav id="navbar" className="container">
        <Show when={sideMenuOpen()}>
          <div className="offcanvas-container">
            <div
              className="menu-container bg"
              use:clickOutside={() => setSideMenuOpen(false)}
            >
              <div className="menu-header">
                <div>Dokumente</div>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSideMenuOpen(false)}
                >
                  x
                </button>
              </div>
              <div className="menu-body">
                <Sidebar close={handleSideMenu()} />
              </div>
            </div>
          </div>
        </Show>
        <div
          className="menu-btn"
          onClick={() => setSideMenuOpen(!sideMenuOpen())}
        >
          <i class="bi bi-list"></i>
        </div>
        <A href="/" activeClass={false} className="no-style home-icon">
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

        <div className="menu-btn" onClick={(e) => handleShow(e)}>
          <i class="bi bi-three-dots"></i>
        </div>
        <Show when={open()}>
          <div className="dialoge-menu" use:clickOutside={() => setOpen(false)}>
            <ul className="menu-item-list">
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
