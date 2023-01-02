import { useParams } from "@solidjs/router";
import { items } from "./_DrugData";
import "./DrugDetail.scss";

const DrugDetail = () => {
  const params = useParams().id;
  let filter = items.filter((e) => e.name.toLowerCase() === params);
  let data = filter[0];

  function handlePrint() {
    document.title = `Steckbrief ${data.name}`;
    window.print();
  }

  return (
    <>
      <div id="drug-detail">
        <div className="wrapper aligne-base justify-between">
          <h1 className="card-title">{data.name}</h1>
          <div className="btn-group">
            <button className="btn icon-btn primary" onClick={handlePrint}>
              <i class="bi-printer"></i>
            </button>
            <button className="btn primary" onclick="history.back()">back</button>
          </div>
        </div>
        <div className="divider" />
        <div className="wrapper">
          <div>
            <p className="card-note">{data.note}</p>

            <p>
              <span className="bold">Art: </span>
              {data.type}
            </p>
            <p>
              <span className="bold">Familie: </span>
              {data.family}
            </p>
            <p>
              <span className="bold">Herkunft: </span>
              {data.origin}
            </p>
            <div className="list-box">
              <label htmlFor="list-ingredients">
                <span className="bold">Inhaltsstoffe: </span>
              </label>
              <ul name="list-ingredients">
                <For each={data.ingredients}>
                  {(ingredient) => <li>{ingredient}</li>}
                </For>
              </ul>
            </div>
            <p>
              <span className="bold">Verarbeitung: </span>
              {data.treatment}
            </p>
            <div className="list-box">
              <label htmlFor="list-use">
                <span className="bold">Verwendung: </span>
              </label>
              <ul name="list-use">
                <For each={data.use}>{(use) => <li>{use}</li>}</For>
              </ul>
            </div>
          </div>
          <img className="card-img" src={data.img} alt="Enzianwurzel" />
        </div>
      </div>
    </>
  );
};

export { DrugDetail };
