import { useParams } from "@solidjs/router";
import { createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import { useDrugData } from "../../../Context/DrugDataContext";
import { LoadingSpinner } from "../../Helper/LoadingSpinner/LoadingSpinner";
import "./DrugDetail.scss";

const DrugDetail = () => {
  const params = useParams().id;
  const [data, { drugById }] = useDrugData();
  const [drug, setDrug] = createSignal("");
  const treatmentsSortBy = [
    "Destillation",
    "Wasserdampf-Destillation",
    "Extraktionsverfahren",
    "Mazeration",
    "Perkulation",
    "Digestion",
  ];
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
          <div className="drug-detail-container">
            <div className="drug-detail-header">
              <h1 className="card-title">{drug().name}</h1>
              <div className="btn-group">
                <button className="btn icon-btn primary" onClick={handlePrint}>
                  <i class="bi-printer"></i>
                </button>
                <button className="btn primary" onclick="history.back()">
                  Zurück
                </button>
              </div>
            </div>
            <div className="divider" />
            <div className="drug-detail-body">
              <div className="grid-img">
                <img
                  className="card-img shadow"
                  src={drug().img.url ? drug().img.url : "/placeholder.svg"}
                  alt={drug().name}
                />
                <div className="tesa" />
              </div>
              <div className="card-note grid-note">
                <label className="bold">Notiz</label>
                <div className="info-text">{drug().note}</div>
              </div>
              <div className="info-group grid-group">
                <div>
                  <label className="bold">Art</label>
                  <div className="info-text">{drug().type}</div>
                </div>
                <div>
                  <label className="bold">Familie</label>
                  <div className="info-text">{drug().family}</div>
                </div>
                <div>
                  <label className="bold">Herkunft</label>
                  <div className="info-text"> {drug().origin}</div>
                </div>

                <div className="list-box">
                  <label htmlFor="list-treatments" className="bold">
                    Verarbeitung
                  </label>
                  <ul name="list-treatments">
                    <For
                      each={drug().treatment.sort(
                        (a, b) =>
                          treatmentsSortBy.indexOf(a) -
                          treatmentsSortBy.indexOf(b)
                      )}
                    >
                      {(treatment) => (
                        <li
                          classList={{
                            highlight: drug().highlight === treatment,
                          }}
                        >
                          {treatment}
                        </li>
                      )}
                    </For>
                  </ul>
                </div>
              </div>
              <div className="list-box grid-ingredients">
                <label htmlFor="list-ingredients" className="bold">
                  Inhaltsstoffe
                </label>
                <ul name="list-ingredients">
                  <For each={drug().ingredients}>
                    {(ingredient) => <li>{ingredient}</li>}
                  </For>
                </ul>
              </div>
              <div className="list-box grid-use">
                <label htmlFor="list-use" className="bold">
                  Verwendung
                </label>
                <ul name="list-use">
                  <For each={drug().use}>{(use) => <li>{use}</li>}</For>
                </ul>
              </div>
              <Show when={drug().marked}>
                <div className="special-info grid-special">
                  <label htmlFor="special-label" className="bold">
                    Besonderheit
                  </label>
                  <Switch>
                    <Match when={drug().marked.value.includes(">")}>
                      <div className="list-box">
                        <ul>
                          <For each={drug().marked.value.split(">")}>
                            {(item) => <li>{item}</li>}
                          </For>
                        </ul>
                      </div>
                    </Match>
                    <Match when={!drug().marked.value.includes(">")}>
                      <div className="info-text">{drug().marked.value}</div>
                    </Match>
                  </Switch>
                </div>
              </Show>
            </div>
          </div>
        </Show>
      </div>
    </>
  );
};

export { DrugDetail };
