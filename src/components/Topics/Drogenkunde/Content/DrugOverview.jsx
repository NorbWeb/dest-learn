import { createSignal, For } from "solid-js";
import "./DrugOverview.scss";
import { DrugList } from "./DrugList";
import { AddDrug } from "./AddDrug";
import { useAuth } from "../../../Context/AuthContext";
import { useDrugData } from "../../../Context/DrugDataContext";

const DrugOverview = () => {
  const [view, setView] = createSignal();
  const [addDrug, setAddDrug] = createSignal(false);
  const viewOptions = ["tile", "small", "list"];
  const propsDrugList = { view, setView, viewOptions };
  const [loggedIn] = useAuth();
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
                className={
                  view() === option ? "btn primary active" : "btn primary "
                }
                onClick={() => setView(option)}
              >
                {option}
              </button>
            )}
          </For>
        </div>
      </div>
      <div id="drug-content" className="content">
        {/* When user is logged in, show button to add new drug. */}
        {/* When clicked on add button, show AddDrug component else DrugList */}
        {loggedIn() ? (
          <>
            {addDrug() ? (
              <>
                <button
                  onClick={() => setAddDrug(!addDrug())}
                  className="btn secondary mb-1"
                >
                  Back
                </button>
                <AddDrug />
              </>
            ) : (
              <>
                <button
                  onClick={() => setAddDrug(!addDrug())}
                  className="btn secondary mb-1"
                >
                  Add new drug
                </button>
                <DrugList {...propsDrugList} />
              </>
            )}
          </>
        ) : (
          <>
            <DrugList {...propsDrugList} />
          </>
        )}
      </div>
      <div className="toc">
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
      </div>
    </>
  );
};

export { DrugOverview };
