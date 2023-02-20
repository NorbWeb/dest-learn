import { For } from "solid-js";
import { useAuth } from "../../../Context/AuthContext";
import { Card } from "./Card";
import "./UserDashboard.scss";

const UserDashboard = () => {
  const [user] = useAuth();
  const props = [
    { route: "add-drug", title: "Droge anlegen" , foto: '/spices.jpg', color: 1},
    { route: "edit-drug", title: "Droge bearbeiten" , foto: '/spices2.jpg', color: 2},
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
