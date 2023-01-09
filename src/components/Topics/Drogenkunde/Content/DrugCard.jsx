import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import "./DrugCard.scss";
import placeholder from "/src/assets/placeholder.svg";

const DrugCard = (props) => {
  const drug = props;
  const [show, setShow] = createSignal(false);

  return (
    <>
      <Show
        when={props.simple}
        fallback={
          <div name="DrugCard" className="card">
            <A href={drug.name.toLowerCase()}>
              <img
                className="card-img"
                src={drug.img ? drug.img : placeholder}
                alt={drug.name}
              />
              <div className="card-body">
                <h4 className="card-title">{drug.name}</h4>
                <div class="card-note">{drug.note}</div>
              </div>
            </A>
          </div>
        }
      >
        <div name="DrugCard" className="card small" onClick={() => setShow(!show())}>
          <img
            className="card-img"
            src={drug.img ? drug.img : placeholder}
            alt={drug.name}
          />
          <div className="card-body">
            <h4 className="card-title">{show() ? drug.name : "?"}</h4>
          </div>
        </div>
      </Show>
    </>
  );
};

export { DrugCard };
