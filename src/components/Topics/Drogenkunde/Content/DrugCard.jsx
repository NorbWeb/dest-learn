import { A } from "@solidjs/router";
import "./DrugCard.scss";
import  placeholder  from "/src/assets/placeholder.svg";

const DrugCard = (props) => {
  const drug = props;

  return (
    <>
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
    </>
  );
};

export { DrugCard };
