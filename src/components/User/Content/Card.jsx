import { A } from "@solidjs/router";
import "./Card.scss";

const Card = (props) => {
  const { route, title, foto, color } = props.props;

  return (
    <>
      <A className="user-content-card hover-bigger" href={`/user/${route}`}>
        <div
          style={`background-color:${color}`}
          className="user-content-card-title"
        >
          {title}
        </div>
        <div className="user-content-card-body">
          <img src={foto} />
        </div>
      </A>
    </>
  );
};

export { Card };
