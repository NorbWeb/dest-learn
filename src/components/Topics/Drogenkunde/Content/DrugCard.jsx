import { createEffect } from "solid-js";
import "./DrugCard.scss";

const DrugCard = (props) => {
  function handleClick() {
    alert(`###### TODO ######\nZur Detailansicht ${data.name} navigieren.`);
  }

  const data = props;

  return (
    <>
      <div name="DrugCard" onClick={handleClick} className="card">
        <img src={data.img} alt={data.name} />
        <div className="card-body">
          <h4 className="card-title">{data.name}</h4>
          <div class="card-note">{data.note}</div>
        </div>
      </div>
    </>
  );
};

export { DrugCard };
