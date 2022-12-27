import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";
import Logo from "../../assets/whisky-logo-96.png";

import "./Sidebar.scss";
const Sidebar = () => {
  const [item, setItem] = createSignal([
    { name: "Technologie", navItems: ["Destillation", "Test", "Item 3"] },
    { name: "Mathematik", navItems: ["Einheiten", "Item 2", "Item 3"] },
    { name: "Drogenkunde", navItems: ["Drogen", "Item 2", "Item 3"] },
    { name: "Spirituosen", navItems: ["Verordnung", "Item 2", "Item 3"] },
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
