import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";

import "./Sidebar.scss";
const Sidebar = (props) => {
  const [item, setItem] = createSignal([
    {
      name: "Technologie",
      path: "technologie",
      icon: "/icons/icons8-chemiefabrik-2-48.png",
      navItems: [{ label: "Destillation", path: "destillation" }],
    },
    {
      name: "Mathematik",
      path: "mathematik",
      icon: "/icons/icons8-taschenrechner-48.png",
      navItems: [
        { label: "Einheiten", path: "einheiten" },
        { label: "Flächen & Volumen", path: "flächen-und-volumen" },
      ],
    },
    {
      name: "Drogenkunde",
      path: "drogenkunde",
      icon: "/icons/icons8-naturkost-48.png",
      navItems: [
        { label: "Sammlung", path: "sammlung" },
        { label: "Lernen", path: "lernen" },
      ],
    },
    {
      name: "Spirituosen",
      path: "spirituosen",
      icon: "/icons/icons8-rum-48.png",
      navItems: [
        { label: "Kategorien", path: "kategorien" },
        { label: "Rechtliches", path: "rechtliches" },
      ],
    },
  ]);

  return (
    <div className="offcanvas-body">
      <nav>
        <ul className="offcanvas-list">
          <For each={item()}>
            {(item) => (
              <li className="menu-block">
                <div className="links-heading">
                  <img src={item.icon} alt="icon" />
                  {item.name}
                </div>
                <ul>
                  <For each={item.navItems}>
                    {(subItem) => (
                      <li>
                        <A
                          href={`/dokumentation/${item.path}/${subItem.path}`}
                          activeClass="sidebar-active"
                          onClick={() => props.close}
                        >
                          {subItem.label}
                        </A>
                      </li>
                    )}
                  </For>
                </ul>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </div>
  );
};

export { Sidebar };
