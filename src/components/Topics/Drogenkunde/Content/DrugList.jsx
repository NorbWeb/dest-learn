import { createEffect, For, mergeProps } from "solid-js";
import { DrugCard } from "./DrugCard";
// import { items as data } from "../../../../_DrugData";
import { useDrugData } from "../../../Context/DrugDataContext";
import "./DrugList.scss";
import { A } from "@solidjs/router";

const DrugList = (props) => {
  const [data, { getCategories }] = useDrugData();
  const merged = mergeProps(props);
  // view is variable for the layout in DrugOverview
  const view = merged.view;
  const setView = merged.setView;
  // viewOptions is the array with all possible options
  const viewOptions = merged.viewOptions;
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
  // function getCategories(inputArray) {
  //   const category = [];
  //   for (let i = 0; i < inputArray.length; i++) {
  //     if (!category.includes(inputArray[i].category)) {
  //       category.push(inputArray[i].category);
  //     }
  //   }
  //   return category;
  // }

  function categories(item) {
    return data().filter((e) => e.category === item);
  }

  return (
    <>
      {/* Here are three for-loops: */}
      {/* 1. Loop: loops over an categorie array, made by the function getCategories(). */}
      {/* So every content is made for every categorie. */}
      <For each={getCategories()}>
        {(drugCategory) => (
          <div className="category-box">
            <h3 className="headline" id={drugCategory}>
              {drugCategory}
            </h3>
            {/* If statement, for displaying two varients of the content. */}
            {/* If: Is the view not a list? Then DrugCard component. */}
            {view() != "list" ? (
              <div class="drug-content-tile">
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
    </>
  );
};

export { DrugList };
