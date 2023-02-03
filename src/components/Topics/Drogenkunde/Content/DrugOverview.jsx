import { createSignal, For, Show } from "solid-js";
import "./DrugOverview.scss";
import { DrugList } from "./DrugList";
import { AddDrug } from "./AddDrug";
import { useDrugData } from "../../../../Context/DrugDataContext";
import { useAuth } from "../../../../Context/AuthContext";

const DrugOverview = () => {
  const [view, setView] = createSignal();
  const [addDrug, setAddDrug] = createSignal(false);
  const viewOptions = ["tile", "small", "list"];
  const propsDrugList = { view, setView, viewOptions };
  const [data, { getCategories }] = useDrugData();
  const [logedIn] = useAuth();

  return (
    <>
      <div id="drug-overview" className="intro">
        <div className="drug-intro-title">
          <Show when={!addDrug()} fallback={<h1>Neue Droge anlegen</h1>}>
            <h1>Drogensammlung</h1>
            Eine Sammlung typischer und weniger typischer Drogen, die Verwendung
            in Spirituosen finden.
          </Show>
        </div>
        {/* Buttons to change the view */}
        <Show when={!addDrug()}>
          <div className="button-group">
            <For each={viewOptions}>
              {(option) => (
                <button
                  classList={{
                    active: option === view(),
                    btn: true,
                    primary: true,
                  }}
                  onClick={() => setView(option)}
                >
                  {option}
                </button>
              )}
            </For>
          </div>
        </Show>
      </div>
      <div id="drug-content" className="content">
        {/* When user is logged in, show button to add new drug. */}
        {/* When clicked on add button, show AddDrug component else DrugList */}
        <Show when={data()} fallback={<div>loading drugs...</div>}>
          <Show when={logedIn()} fallback={<DrugList {...propsDrugList} />}>
            <Show
              when={addDrug()}
              fallback={
                <>
                  <button
                    onClick={() => setAddDrug(!addDrug())}
                    className="btn secondary mb-1"
                  >
                    Add new drug
                  </button>
                  <DrugList {...propsDrugList} />
                </>
              }
            >
              <>
                <button
                  onClick={() => setAddDrug(!addDrug())}
                  className="btn secondary mb-1"
                >
                  Back
                </button>
                <AddDrug />
              </>
            </Show>
          </Show>
        </Show>
      </div>
      <div className="toc">
        <Show when={!addDrug()}>
          <h3>Auf dieser Seite</h3>
          <div className="divider"></div>
          <nav id="TableOfContents">
            <ul>
              <For each={getCategories()}>
                {(category) => (
                  <li>
                    <a href={`#${category}`}>{category}</a>
                  </li>
                )}
              </For>
            </ul>
          </nav>
        </Show>
      </div>
    </>
  );
};

export { DrugOverview };
