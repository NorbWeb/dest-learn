import "./DrugOverview.scss";
import { createSignal, For, Show } from "solid-js";
import { DrugList } from "./DrugList";
import { useDrugData } from "../../../Context/DrugDataContext";
import { LoadingSpinner } from "../../Helper/LoadingSpinner/LoadingSpinner";

const DrugOverview = () => {
  const [view, setView] = createSignal();
  const viewOptions = [
    { label: "Groß", value: "tile" },
    { label: "Klein", value: "small" },
    { label: "Liste", value: "list" },
  ];
  [
    { label: "Groß", value: "tile" },
    { label: "Klein", value: "small" },
    { label: "Liste", value: "list" },
  ];
  const propsDrugList = { view, setView, viewOptions };
  const [data, { getCategories }] = useDrugData();

  return (
    <>
      <div id="drug-overview" className="intro">
        <div className="drug-intro-title">
          <h1>Drogensammlung</h1>
          Eine Sammlung typischer und weniger typischer Drogen, die Verwendung
          in Spirituosen finden.
        </div>
        {/* Buttons to change the view */}
        <div className="button-group">
          <For each={viewOptions}>
            {(option) => (
              <button
                classList={{
                  active: option.value === view(),
                  btn: true,
                  primary: true,
                }}
                onClick={() => setView(option.value)}
              >
                {option.label}
              </button>
            )}
          </For>
        </div>
      </div>
      <div id="drug-content" className="content">
        <Show when={data()} fallback={<LoadingSpinner />}>
          <DrugList {...propsDrugList} />
        </Show>
      </div>
      <div className="toc">
        <h3>Auf dieser Seite</h3>
        <div className="divider"></div>
        <nav id="TableOfContents">
          <ul className="main-list">
            <For each={getCategories()}>
              {(category) => (
                <li>
                  <a href={`#${category}`}>{category}</a>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </div>
    </>
  );
};

export { DrugOverview };
