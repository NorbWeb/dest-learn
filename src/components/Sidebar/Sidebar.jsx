import { createSignal, For } from "solid-js";
import { A } from "@solidjs/router";

import "./Sidebar.scss";
const Sidebar = () => {
  const [item, setItem] = createSignal([
    "Technologie",
    "Mathematik",
    "Drogenkunde",
    "Spirituosen",
    "Chemie",
  ]);


  const [subItem, setSubItem] = createSignal([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
    "Item 7",
    "Item 8",
  ]);

  return (
    <div id="sidebar">
      <div className="offcanvas-body">
        <nav>
          <ul>
            <For each={item()}>
              {(item) => (
                <li className="menu-block">
                  <strong className="links-heading">
                    <img src="src/assets/whisky-logo-96.png" alt="icon" />
                    {item}
                  </strong>
                  <ul>
                    <For each={subItem()}>
                      {(subItem) => (
                        <li>
                          <A href="#" activeClass="sidebar-active">
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
    </div>
  );
};

export { Sidebar };
