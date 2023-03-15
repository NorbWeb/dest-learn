import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";

import "./Sidebar.scss";
const Sidebar = (props) => {
  const [item, setItem] = createSignal([
    { name: "Technologie", icon:'/icons/icons8-chemiefabrik-2-48.png', navItems: ["Destillation"] },
    { name: "Mathematik", icon:'/icons/icons8-taschenrechner-48.png', navItems: ["Einheiten"] },
    { name: "Drogenkunde", icon:'/icons/icons8-naturkost-48.png', navItems: ["Sammlung", "Lernen"] },
    { name: "Spirituosen", icon:'/icons/icons8-rum-48.png', navItems: ['Kategorien',"Rechtliches"] },
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
                          href={`/dokumentation/${item.name.toLocaleLowerCase()}/${subItem.toLocaleLowerCase()}`}
                          activeClass="sidebar-active"
                          onClick={() => props.close}
                        >
                          {subItem}
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
