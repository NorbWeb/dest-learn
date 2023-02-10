import { A } from "@solidjs/router";
import "./Card.scss";

const Card = (props) => {
  const { route, title } = props;
  return (
    <>
      <A className="user-content-card hover-bigger" href={`/user/${route}`}>
        <div className="user-content-card-title">{title}</div>
        <div className="user-content-card-body">
            <img src="/spices.jpg" />
        </div>
      </A>
    </>
  );
};

export { Card };
