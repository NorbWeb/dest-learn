import { A } from "@solidjs/router";
import { createEffect, createSignal, Show } from "solid-js";
import "./DrugCard.scss";

const DrugCard = (props) => {
  const drug = props;
  const [show, setShow] = createSignal(false);
  const [view, setView] = createSignal(false);
  const [count, setCount] = createSignal(5);

  function handleShow() {
    setShow(!show());
    setTimeout(() => setShow(!show()), 1500);
  }

  function handleView(event) {
    event.stopPropagation();
    setView(true);
    timer();
  }

  function handleClose() {
    setView(false);
    setCount(5);
  }

  function timer() {
    let int = setInterval(
      () =>
        count() === 0 || !view() ? clearInterval(int) : setCount(count() - 1),
      1000
    );
  }

  createEffect(() => {
    if (count() === 0) {
      handleClose();
    }
  });

  return (
    <>
      <Show
        when={props.simple}
        fallback={
          <div name="DrugCard" className="card" id={drug.name}>
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
          id={drug.name}
          classList={{ small: !view() }}
          className="card simple"
          onClick={show() ? "" : handleShow}
        >
          <img
            className="card-img"
            src={drug.img.url ? drug.img.url : "/placeholder.svg"}
            alt={drug.name}
          />
          <Show
            when={!view()}
            fallback={
              <button
                className="btn info btn-sm view-btn counter"
                onClick={() => handleClose()}
              >
                {count()}
              </button>
            }
          >
            <button
              className="btn info btn-sm view-btn"
              onClick={(e) => handleView(e)}
            >
              {"big"}
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
