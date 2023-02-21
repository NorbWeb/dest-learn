import { A } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import "./DrugCard.scss";

const DrugCard = (props) => {
  const drug = props;
  const [show, setShow] = createSignal(false);
  const [view, setView] = createSignal(false);

  function handleShow() {
    setShow(!show());
    setTimeout(() => setShow(!show()), 1500);
  }

  function handleView(event) {
    event.stopPropagation();
    setView(!view());
    setTimeout(() => setView(false), 5000);
  }

  return (
    <>
      <Show
        when={props.simple}
        fallback={
          <div name="DrugCard" className="card">
            <A href={drug.id}>
              <img
                className="card-img"
                src={drug.img.url ? drug.img.url : "/placeholder.svg"}
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
        <div
          name="DrugCard"
          classList={{ small: !view() }}
          className="card simple"
          onClick={show() ? "" : handleShow}
        >
          <img
            className="card-img"
            src={drug.img.url ? drug.img.url : "/placeholder.svg"}
            alt={drug.name}
          />
          <Show when={!show()}>
            <button className="btn info btn-sm view-btn" onClick={handleView}>
              {/* {view() ? count() : "big"} */}
              {view() ? "small" : "big"}
            </button>
          </Show>
          <div className="card-body">
            <h4 className={show() ? "card-title ani" : "card-title"}>
              {show() ? drug.name : "?"}
            </h4>
          </div>
        </div>
      </Show>
    </>
  );
};

export { DrugCard };
