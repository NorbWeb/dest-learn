import {
  createEffect,
  For,
  Show,
} from "solid-js";
import "./DrugLearn.scss";
import { DrugCard } from "./DrugCard";
import { useShuffleData } from "../../../../Context/ShuffleData";

const DrugLearn = () => {
  const [data, {getRandom}] = useShuffleData();
  // function shuffleArray() {
  //   if (data()) {
  //     setRandomArr(
  //       randomArr().sort(function (a, b) {
  //         return 0.5 - Math.random();
  //       })
  //     );
  //     console.log(randomArr());
  //   }
  // }
  function handleShuffle() {
  }

  createEffect(()=>{
  })

  return (
    <>
      <div className="intro">
        <h1>Teste dein Wissen</h1>
        Some text.
      </div>
      <br />
      <div className="content wrapper gap-1 flex-wrap">
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
