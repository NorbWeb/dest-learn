import { For, Show } from "solid-js";
import "./DrugLearn.scss";
import { DrugCard } from "./DrugCard";
import { useShuffleData } from "../../../../Context/ShuffleData";

const DrugLearn = () => {
  const [data, { getRandom }] = useShuffleData();

  return (
    <>
      <div className="intro">
        <h1>Teste dein Wissen</h1>
        Some text.
      </div>
      <br />
      <div id="drug-learn" className="content wrapper gap-1 flex-wrap ">
        <Show when={data()} fallback={<div>loading...</div>}>
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
