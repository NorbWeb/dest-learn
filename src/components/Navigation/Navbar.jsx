import "./Navbar.scss";
import { A } from "@solidjs/router";
import { createEffect, createSignal, For, Show } from "solid-js";
import Logo from "../../assets/whisky-logo-96.png";
import { LogOutButton, LogOutElement } from "../Authentification/LogOutButton";
import { Sidebar } from "../Sidebar/Sidebar";
import clickOutside from "../Helper/click-outside";

const Navbar = () => {
  const [openSideMenu, setOpenSideMenu] = createSignal("hide");
  const [openNav, setOpenNav] = createSignal("hide");

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

  function autoCloseSide() {
    setOpenSideMenu("hide");
  }

  function autoCloseNav() {
    setOpenNav("hide");
  }

  function addAnimationEndEvent(id, signal, func) {
    let element = document.getElementById(id);
    if (signal === "transition") {
      element.addEventListener("animationend", func);
    }
  }
  function removeAnimationEndEvent(id, signal, func) {
    let element = document.getElementById(id);
    if (signal === "hide") {
      element.removeEventListener("animationend", func);
    }
  }

  function handleCloseSide() {
    if (openSideMenu() === "show") {
      setOpenSideMenu("transition");
      addAnimationEndEvent(
        "offcanvas-container",
        openSideMenu(),
        autoCloseSide
      );
    } else {
      setOpenSideMenu("hide");
      removeAnimationEndEvent(
        "offcanvas-container",
        openSideMenu(),
        autoCloseSide
      );
    }
  }

  function handleCloseNav() {
    if (openNav() === "show") {
      setOpenNav("transition");
      addAnimationEndEvent("nav-container", openNav(), autoCloseNav);
    } else {
      setOpenNav("hide");
      removeAnimationEndEvent("nav-container", openNav(), autoCloseNav);
    }
  }

  function handleLogoAnimation() {
    document.getElementById("logo").classList.add("effect");
    document.getElementById("steam").classList.add("effect");
  }

  createEffect(() => {});

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
            use:clickOutside={() => handleCloseSide()}
          >
            <div className="offcanvas-menu-header">
              <div>Dokumente</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleCloseSide()}
              >
                x
              </button>
            </div>
            <div className="menu-body">
              <Sidebar close={handleCloseSide()} />
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
          <button onClick={() => handleLogoAnimation()} className="logo-btn">
            <img
              src="/icons/icons8-whisky-logo-96.png"
              alt="Logo"
              id="logo"
              onAnimationEnd={(e) => e.currentTarget.classList.remove("effect")}
            />
            <img
              src="/icons/icons8-wasserdampf-96.png"
              alt="Steam"
              id="steam"
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

        {/* menu button, to open nav menu - show when screen reach middle breakpoint */}
        <div
          className="menu-btn navmenu-btn"
          onClick={() => setOpenNav("show")}
        >
          <i class="bi bi-three-dots"></i>
        </div>

        {/* nav menu - can be open when screen reach middle breakpoint */}
        <div
          id="nav-container"
          classList={{
            show: openNav() === "show",
            transition: openNav() === "transition",
            hide: openNav() === "hide",
          }}
        >
          <div
            id="nav-menu"
            use:clickOutside={() => handleCloseNav()}
            classList={{
              show: openNav() === "show",
              transition: openNav() === "transition",
              hide: openNav() === "hide",
            }}
          >
            <div className="nav-menu-header">
              <div>Destillearn</div>
              <button
                type="button"
                className="btn-close"
                onClick={() => handleCloseNav()}
              >
                x
              </button>
            </div>
            <ul className="menu-item-list">
              <For each={navItem}>
                {(item) => (
                  <li>
                    <A
                      href={item.href}
                      end={false}
                      onClick={() => handleCloseNav()}
                    >
                      {item.name}
                    </A>
                  </li>
                )}
              </For>
            </ul>
            <div className="divider"></div>
            <LogOutElement closeNav={handleCloseNav()} />
          </div>
        </div>
      </nav>
    </>
  );
};

export { Navbar };
