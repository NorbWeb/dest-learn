import { A } from "@solidjs/router";
import "./Card.scss";

const Card = (props) => {
  const { route, title, foto, color } = props.props;
  let colors = { 1: "#775e1b", 2: "#99141d" };

  return (
    <>
      <A className="user-content-card hover-bigger" href={`/user/${route}`}>
        <div style={`background-color:${colors[color]}`} className="user-content-card-title">{title}</div>
        <div className="user-content-card-body">
          <img src={foto} />
        </div>
      </A>
    </>
  );
};

export { Card };
