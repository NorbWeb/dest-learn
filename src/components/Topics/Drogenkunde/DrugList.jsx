import { createEffect, createSignal, For, Show } from "solid-js";
import { DrugCard } from "./DrugCard";
import { useDrugData } from "../../../Context/DrugDataContext";
import "./DrugList.scss";
import { A } from "@solidjs/router";

const DrugList = (props) => {
  const [data] = useDrugData();

  // remove and add css class to displayed component
  function setClass(add) {
    let matches = document.getElementsByClassName("card");
    for (let i = 0; i < matches.length; i++) {
      if (matches.item(i).classList.contains("marked")) {
        matches.item(i).className = `card ${add} marked`;
      } else {
        matches.item(i).className = `card ${add}`;
      }
    }
  }

  createEffect(() => {
    setClass(props.view);
  });

  return (
    <>
      <Show when={props.view != "list"}>
        <For each={data().categories}>
          {(item) => (
            <div className="category-box">
              <h2 className="headline" id={item.category}>
                {item.category}
              </h2>

              <div class="drug-content-tile">
                <For each={item.drugList}>
                  {(drug) => <DrugCard {...drug} />}
                </For>
              </div>
            </div>
          )}
        </For>
      </Show>
      <Show when={props.view === "list"}>
        <ul id="category-list">
          <For each={data().categories}>
            {(item) => (
              <li>
                <h4 id={item.category}>{item.category}</h4>
                <ul className="category-list-item">
                  <For each={item.drugList}>
                    {(drug) => (
                      <li className="list">
                        <A
                          href={`/dokumentation/drogenkunde/sammlung/${drug.id}`}
                        >
                          {drug.name}
                        </A>
                        <Show when={drug.marked}>
                          <span className="marked-info">
                            <i class="bi bi-exclamation-diamond"></i>
                          </span>
                        </Show>
                      </li>
                    )}
                  </For>
                </ul>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </>
  );
};

export { DrugList };
