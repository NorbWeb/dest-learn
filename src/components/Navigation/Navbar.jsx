import "./Navbar.scss";
import { A } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";
import Logo from "../../assets/whisky-logo-96.png";
import { LogOutButton, LogOutLi } from "../Authentification/LogOutButton";
import { Sidebar } from "../Sidebar/Sidebar";
import clickOutside from "../Helper/click-outside";

const Navbar = () => {
  const [open, setOpen] = createSignal(false);
  const [openSideMenu, setOpenSideMenu] = createSignal("hide");

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

  function handleClose() {
    if (openSideMenu() === "show") {
      setOpenSideMenu("transition");
    } else {
      setOpenSideMenu("hide");
    }
  }

  return (
    <>
      <nav id="navbar" className="navbar-container">
        {/* offcanvas menu - can be open when screen reach middle breakpoint */}
        <div
          id="offcanvas-container"
          classList={{
            show: openSideMenu() === "show",
            transition: openSideMenu() === "transition",
            hide: openSideMenu() === "hide",
          }}
        >
          <div
            id="offcanvas-menu"
            classList={{
              show: openSideMenu() === "show",
              transition: openSideMenu() === "transition",
              hide: openSideMenu() === "hide",
            }}
            className="bg"
            use:clickOutside={() => handleClose()}
          >
            <div className="menu-header">
              <div>Dokumente</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleClose()}
              >
                x
              </button>
            </div>
            <div className="menu-body">
              <Sidebar close={handleClose()} />
            </div>
          </div>
        </div>

        {/* menu button, to open offcanvas - show when screen reach middle breakpoint */}
        <div
          className="menu-btn sidemenu-btn"
          onClick={() => setOpenSideMenu("show")}
        >
          <i class="bi bi-list"></i>
        </div>

        {/* logo button - go to landing page */}
        <A href="/" activeClass={false} className="no-style home-icon">
          <button
            onClick={() =>
              document.getElementById("logo").classList.add("effect")
            }
            className="logo-btn"
          >
            <img
              src={Logo}
              alt="Logo"
              id="logo"
              onAnimationEnd={(e) => e.currentTarget.classList.remove("effect")}
            />
          </button>
        </A>

        {/* default menu on large screen */}
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

        {/* menu button, to open dialogue menu - show when screen reach middle breakpoint */}
        <div className="menu-btn navmenu-btn" onClick={(e) => handleShow(e)}>
          <i class="bi bi-three-dots"></i>
        </div>

        {/* dialogue menu - can be open when screen reach middle breakpoint */}
        <Show when={open()}>
          <div
            className="dialogue-menu"
            use:clickOutside={() => setOpen(false)}
          >
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
