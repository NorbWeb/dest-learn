import { For } from "solid-js";
import { useAuth } from "../../../Context/AuthContext";
import { Card } from "./Card";
import "./UserDashboard.scss";

const UserDashboard = () => {
  const [user] = useAuth();
  const props = [
    { route: "add-drug", title: "Drogenlabor" , foto: '/spices.jpg', color: 1},
  ];


  
  return (
    <>
      <h3 className="title">
        Hallo {user().displayName ? user().displayName : user().email}
      </h3>
      <div className="box">
        <For each={props}>
          {(section) => <Card  props={section} />}
        </For>
      </div>
    </>
  );
};

export { UserDashboard };
