import { For, Show } from "solid-js";
import "./DrugLearn.scss";
import { DrugCard } from "./DrugCard";
import { useShuffleData } from "../../../Context/ShuffleData";
import { LoadingSpinner } from "../../Helper/LoadingSpinner/LoadingSpinner";

const DrugLearn = () => {
  const [data, { getRandom }] = useShuffleData();

  return (
    <>
      <div className="intro">
        <h1>Teste dein Wissen</h1>
        <p>
          Du willst dich im erkennen von Drogen verbessern, hast aber nicht alle
          bei dir? Dann kannst du hier ein wenig üben!
        </p>
        <p className='block-quote'>
          <span className="bold">Anmerkung:</span>Die Optik alleine ist ein
          schlechtes Mittel zum Bestimmen von Drogen, jedoch für eine erste
          Einschätzung gut geeignet.
        </p>
      </div>
      <br />
      <div id="drug-learn" className="content wrapper gap-1 flex-wrap ">
        <Show when={data()} fallback={<LoadingSpinner />}>
          <For each={data()}>
            {(drug) => (
              <DrugCard simple {...drug}>
                {props.children}
              </DrugCard>
            )}
          </For>
        </Show>
      </div>
      <div className="toc">
        <h3>Einstellungen</h3>
        <div className="divider"></div>
        <ul>
          <li>
            <button className="btn primary" onClick={getRandom}>
              Mischen
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export { DrugLearn };
