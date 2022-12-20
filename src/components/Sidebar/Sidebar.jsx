import { createSignal, For } from "solid-js";
import "./Sidebar.scss";
const Sidebar = () => {
  const [item, setItem] = createSignal([
    "Drogenkunde",
    "Mathematik",
    "Chemie",
    "Destillation",
    "Spirituosen",
  ]);

  return (
    <div id="sidebar">
        <For class="open" each={item()}>{(item) => <button>{item}</button>}</For>
    </div>
  );
};

export { Sidebar };
