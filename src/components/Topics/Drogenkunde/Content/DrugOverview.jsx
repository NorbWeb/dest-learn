import { createEffect, createSignal, For } from "solid-js";
import { DrugCard } from "./DrugCard";
import { items as data } from "./_DrugData";
import "./DrugOverview.scss";
import { A } from "@solidjs/router";
import { useAuth } from "../../../Context/AuthContext";

const DrugOverview = () => {
  const [loggedIn] = useAuth();
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

  // filter data object for each type of drug and make it a categorie
  // maybe via backend?
  function filterCategories(inputArray) {
    const category = [];
    for (let i = 0; i < inputArray.length; i++) {
      if (!category.includes(inputArray[i].category)) {
        category.push(inputArray[i].category);
      }
    }
    return category;
  }

  function categories(item) {
    return data.filter((e) => e.category === item);
  }

  return (
    <>
      <div className="intro drug-intro">
        <div className="drug-intro-title">
          <h1>Drogensammlung</h1>
          Eine Sammlung typischer und weniger typischer Drogen, die Verwendung
          in Spirituosen finden.
        </div>
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
        {/* Here are three for loops: */}
        {/* 1. Loop: loops over an categorie array, made by the function filterCategories(). */}
        {/* So every content is made for every categorie. */}
        <For each={filterCategories(data)}>
          {(drugCategory) => (
            <div>
              <div className="wrapper aligne-center gap-1">
                <h3 id={drugCategory}>{drugCategory}</h3>
                <button
                  style={
                    loggedIn() ? { display: "block" } : { display: "none" }
                  }
                  className="btn secondary icon-btn"
                >
                  <i class="bi bi-plus-square"></i>
                </button>
              </div>
              {/* If statement, for displaying two varients of the content. */}
              {/* If: Is the view not a list? Then DrugCard component. */}
              {view() != "list" ? (
                <div id="drug-content-tile">
                  {/* 2. loop: filter data object by categorie */}
                  <For each={categories(drugCategory)}>
                    {(drug) => <DrugCard {...drug} />}
                  </For>
                </div>
              ) : (
                // Else: the list component
                <ul>
                  {/* 3. loop: the same as second loop, but for the list component */}
                  <For each={categories(drugCategory)}>
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
          )}
        </For>
      </div>
      <div className="toc"></div>
    </>
  );
};

export { DrugOverview };
