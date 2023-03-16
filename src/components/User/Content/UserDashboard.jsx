import { useNavigate } from "@solidjs/router";
import { updateProfile } from "firebase/auth";
import { createEffect, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { useAuth } from "../../../Context/AuthContext";
import { Card } from "./Card";
import "./UserDashboard.scss";

const UserDashboard = () => {
  const [user] = useAuth();
  const adminUsers = import.meta.env.VITE_ADMIN.split(",");
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = createStore({
    id: "",
    name: "",
    email: "",
    foto: "",
  });
  let props = [
    {
      route: "drug-kitchen",
      title: "Drogenlabor",
      foto: "/placeholder.svg",
      color: "#775e1b",
    },
    {
      route: "editorial-office",
      title: "Redaktion",
      foto: "/placeholder.svg",
      color: "rgb(27 119 28)",
    },
    {
      route: "image-store",
      title: "Bilder",
      foto: "/placeholder.svg",
      color: "#301b77",
    },
    // {
    //   route: "profile",
    //   title: "Profil",
    //   foto: "/placeholder.svg",
    //   color: "#99141d",
    // },
  ];

  const randomNames = [
    "Kupferstreichler",
    "Fallobstbücker",
    "Schnüffler",
    "Trester-Stecher",
    "Kenner vom Fach",
    "Dunder",
    "Schnattrohrliebhaber",
    "Inlandsrum-Schätzer",
    "Schlempe",
    "ELU-Trinker",
    "Multiples-Dreieckstest-Opfer",
    '"Dichtungen für Wein reichen!"-Sager',
    "Hubwagen-Herbert",
    "Mischreihenfolge-Folge",
  ];

  let random = randomNames[Math.floor(Math.random() * randomNames.length)];

  function updateUser() {
    updateProfile(user(), {
      displayName: "Test Lord",
      photoURL: "",
    });
  }

  createEffect(() => {
    if (user()) {
      setUserProfile({
        id: user().uid,
        name: user().displayName,
        email: user().email,
        foto: user().photoURL,
      });
    }
  });

  return (
    <>
      <h3 className="title">
        Hallo <span>{userProfile.name ? userProfile.name : random}</span> !
      </h3>
      {/* <button type="button" className="btn primary" onClick={updateUser}>
        Update
      </button> */}
      <div className="box">
        <For each={props}>{(section) => <Card props={section} />}</For>
      </div>
      <Show when={adminUsers.includes(user().uid)}>
        <button className="btn secondary" onClick={() => navigate('/admin')}>
          Admin
        </button>
      </Show>
    </>
  );
};

export { UserDashboard };
