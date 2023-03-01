import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import Logo from "../../assets/whisky-logo-96.png";

import "./Sidebar.scss";
const Sidebar = () => {
  const [item, setItem] = createSignal([
    { name: "Technologie", navItems: ["Destillation"] },
    { name: "Mathematik", navItems: ["Einheiten"] },
    { name: "Drogenkunde", navItems: ["Sammlung", "Lernen"] },
    { name: "Spirituosen", navItems: ["Rechtliches"] },
  ]);

  return (
    <aside className="sidebar bg mode">
      <div className="offcanvas-body">
        <nav>
          <ul>
            <For each={item()}>
              {(item) => (
                <li className="menu-block">
                  <strong className="links-heading">
                    <img src={Logo} alt="icon" />
                    {item.name}
                  </strong>
                  <ul>
                    <For each={item.navItems}>
                      {(subItem) => (
                        <li>
                          <A
                            href={`/dokumentation/${item.name.toLocaleLowerCase()}/${subItem.toLocaleLowerCase()}`}
                            activeClass="sidebar-active"
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
    </aside>
  );
};

export { Sidebar };
