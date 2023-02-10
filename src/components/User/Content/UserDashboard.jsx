import { For } from "solid-js";
import { useAuth } from "../../../Context/AuthContext";
import { Card } from "./Card";
import "./UserDashboard.scss";

const UserDashboard = () => {
  const [user] = useAuth();
  const props = [
    { route: "add-drug", title: "Droge anlegen" },
    { route: "edit-drug", title: "Droge bearbeiten" },
  ];
  return (
    <>
      <h3 className="title">
        Hallo {user().displayName ? user().displayName : user().email}
      </h3>
      <div className="box">
        <For each={props}>
          {(section) => <Card route={section.route} title={section.title} />}
        </For>
      </div>
    </>
  );
};

export { UserDashboard };
