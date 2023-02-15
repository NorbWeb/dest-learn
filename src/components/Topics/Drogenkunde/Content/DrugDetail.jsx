import { useParams } from "@solidjs/router";
import { createEffect, createSignal, lazy, Show } from "solid-js";
import { useDrugData } from "../../../../Context/DrugDataContext";
import { LoadingSpinner } from "../../../Helper/LoadingSpinner/LoadingSpinner";
import "./DrugDetail.scss";

const DrugDetail = () => {
  const params = useParams().id;
  const [data, { drugById }] = useDrugData();
  const [drug, setDrug] = createSignal("");

  function handlePrint() {
    document.title = `Steckbrief ${drug.name}`;
    window.print();
  }

  createEffect(() => {
    if (data()) {
      setDrug(drugById(params)[0]);
    }
  });

  return (
    <>
      <div id="drug-detail">
        <Show when={drug() != ""} fallback={<LoadingSpinner />}>
          <div className="wrapper aligne-base justify-between">
            <h1 className="card-title">{drug().name}</h1>
            <div className="btn-group">
              <button className="btn icon-btn primary" onClick={handlePrint}>
                <i class="bi-printer"></i>
              </button>
              <button className="btn primary" onclick="history.back()">
                back
              </button>
            </div>
          </div>
          <div className="divider" />
          <div className="wrapper">
            <div>
              <p className="card-note">{drug().note}</p>

              <p>
                <span className="bold">Art: </span>
                {drug().type}
              </p>
              <p>
                <span className="bold">Familie: </span>
                {drug().family}
              </p>
              <p>
                <span className="bold">Herkunft: </span>
                {drug().origin}
              </p>
              <div className="list-box">
                <label htmlFor="list-ingredients">
                  <span className="bold">Inhaltsstoffe: </span>
                </label>
                <ul name="list-ingredients">
                  <For each={drug().ingredients}>
                    {(ingredient) => <li>{ingredient}</li>}
                  </For>
                </ul>
              </div>
              <p>
                <span className="bold">Verarbeitung: </span>
                {drug().treatment}
              </p>
              <div className="list-box">
                <label htmlFor="list-use">
                  <span className="bold">Verwendung: </span>
                </label>
                <ul name="list-use">
                  <For each={drug().use}>{(use) => <li>{use}</li>}</For>
                </ul>
              </div>
            </div>
            <img className="card-img" src={drug().img} alt={drug().name} />
          </div>
        </Show>
      </div>
    </>
  );
};

export { DrugDetail };
