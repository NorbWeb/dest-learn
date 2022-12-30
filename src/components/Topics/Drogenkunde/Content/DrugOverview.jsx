import { createEffect, createSignal } from "solid-js";
import { DrugCard } from "./DrugCard";
import { items as data } from "./_DrugData";
import "./DrugOverview.scss";
import { A } from "@solidjs/router";

const DrugOverview = () => {
  // view is variable for the layout in DrugOverview
  const [view, setView] = createSignal();
  // viewOptions is the array with all possible options
  const viewOptions = ["tile", "small", "list"];

  // onMount checks if a viewOption is in local store
  // if no, set it to first option, if yes, set view to local store
  if (!localStorage.getItem("drugViewPreference")) {
    setView(viewOptions[0]);
  } else {
    setView(localStorage.getItem("drugViewPreference"));
    console.debug("Get drugViewPreference from local store accomplished");
  }

  // remove and add css class to displayed component
  function setClass(add) {
    let matches = document.getElementsByClassName("card");
    for (let i = 0; i < matches.length; i++) {
      matches.item(i).className = `card ${add}`;
    }
  }

  // updates local store to view and run setClass
  createEffect(() => {
    localStorage.setItem("drugViewPreference", `${view()}`);
    setClass(view());
  });

  // on click function for button
  // set view to the next option from viewOption array
  function handleClick() {
    let index = viewOptions.indexOf(view());
    if (index < viewOptions.length - 1) {
      setView(viewOptions[index + 1]);
    } else {
      setView(viewOptions[0]);
    }
  }

  return (
    <>
      <div className="intro drug-intro">
        <div>
          <h1>Drogensammlung</h1>
          Eine Sammlung typischer und weniger typischer Drogen, die Verwendung
          in Spirituosen finden.
        </div>
        <div className="button-group">
          <button className="btn primary" onClick={handleClick}>{view()==="tile" ? "Groß" : view() === "small" ? "Klein" : "Liste"}</button>
        </div>
      </div>
      <div id="drug-content" className="content">
        {view() != "list" ? (
          <For each={data}>{(drug) => <DrugCard {...drug} />}</For>
        ) : (
          <ul>
            <For each={data}>
              {(drug) => (
                <li className="list">
                  <A
                    href={`/dokumentation/drogenkunde/sammlung/${drug.name.toLowerCase()}`}
                  >
                    {drug.name}
                  </A>
                </li>
              )}
            </For>
          </ul>
        )}
      </div>
      <div className="toc"></div>
    </>
  );
};

export { DrugOverview };
