import { useNavigate } from "@solidjs/router";
import { addDoc, collection } from "firebase/firestore/lite";
import { createEffect, createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { useAuth } from "../../Context/AuthContext";
import { db } from "../../firebase";
import "./Admin.scss";

const Admin = () => {
  const [user] = useAuth();
  const navigate = useNavigate();
  const [topic, setTopic] = createSignal("");
  const [success, setSuccess] = createSignal(false);
  const [doc, setDoc] = createStore({
    description: "",
    title: "",
    headline: [
      {
        id: 1,
        name: "",
        content: [{}],
      },
    ],
  });

  function redirect() {
    if (!user()) {
      if (!sessionStorage.getItem("logedInUser")) {
        navigate("/user/login");
      }
    }
  }

  const onInputChange = (e) => {
    e.preventDefault();
    setDoc([e.target.name], e.currentTarget.value);
  };

  const successTimer = () => {
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  const saveNewDoc = async (doc) => {
    try {
      setSuccess(true);
      await addDoc(collection(db, topic()), doc);
      successTimer();
      setDoc({
        description: "",
        title: "",
        headline: [
          {
            id: 1,
            name: "",
            content: [{}],
          },
        ],
      });
    } catch (error) {
      console.debug(error);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    saveNewDoc({
      description: doc.description,
      title: doc.title,
      headline: doc.headline,
    });
  }

  createEffect(() => {
    redirect();
    // console.log(topic());
  });

  return (
    <div id="admin" className="container">
      <div className="admin-header">
        <h1>Admin</h1>
        <div className="divider"></div>
      </div>

      <div className="admin-body">
        <div className="topic-wrapper">
          <label htmlFor="topic">Thema</label>
          <select
            id="topic"
            name="topic"
            value={""}
            onInput={(e) => setTopic(e.target.value)}
          >
            <option value=""></option>
            <option value="technologie">Technologie</option>
            <option value="mathematik">Mathematik</option>
            <option value="spirituosen">Spirituosen</option>
          </select>
        </div>
        <form method="dialog">
          <fieldset className="new-doc">
            <legend>Neues Dokument anlegen</legend>
            <div className="input-wrapper">
              <label htmlFor="title">Titel</label>
              <input
                className="input-item"
                type="text"
                name="title"
                value={doc.title}
                onInput={onInputChange}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="description">Beschreibung</label>
              <textarea
                className="input-item"
                type="text"
                name="description"
                value={doc.description}
                onInput={onInputChange}
              />
            </div>
            <Show
              when={!success()}
              fallback={<div className="success message">Gespeichert!</div>}
            >
              <button
                className="btn primary"
                disabled={topic() === ""}
                onClick={handleSubmit}
              >
                Anlegen
              </button>
            </Show>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export { Admin };
