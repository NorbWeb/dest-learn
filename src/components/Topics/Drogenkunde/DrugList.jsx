import { createEffect, For } from "solid-js";
import { DrugCard } from "./DrugCard";
import { useDrugData } from "../../../Context/DrugDataContext";
import "./DrugList.scss";
import { A } from "@solidjs/router";

const DrugList = (props) => {
  const [data] = useDrugData();
  const { view, setView, viewOptions } = props;

  if (!localStorage.getItem("drugViewPreference")) {
    setView(viewOptions[0]);
  } else {
    setView(localStorage.getItem("drugViewPreference"));
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

  return (
    <>
      <For each={data().categories}>
        {(item) => (
          <div className="category-box">
            <h3 className="headline" id={item.category}>
              {item.category}
            </h3>
            {view() != "list" ? (
              <div class="drug-content-tile">
                <For each={item.drugList}>
                  {(drug) => <DrugCard {...drug} />}
                </For>
              </div>
            ) : (
              <ul>
                <For each={item.drugList}>
                  {(drug) => (
                    <li className="list">
                      <A
                        href={`/dokumentation/drogenkunde/sammlung/${drug.id}`}
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
