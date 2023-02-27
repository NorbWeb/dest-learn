import { addDoc, collection, doc, updateDoc } from "firebase/firestore/lite";
import { createEffect, createSignal, For, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { useContent } from "../../../Context/ContentContext";
import { db } from "../../../firebase";
import "./Editorial.scss";

const Editorial = () => {
  const [data] = useContent();
  const [topic, setTopic] = createSignal("");
  const [article, setArticle] = createStore({
    id: "",
    title: "",
    description: "",
    headline: "",
  });

  function selectTopic(e) {
    let selected = e.target.value.toLowerCase();
    setArticle({
      id: "",
      title: "",
      description: "",
      headline: "",
    });
    if (selected != "") {
      setTopic(data()[selected]);
    } else {
      setTopic("");
    }
  }

  function selectArticle(e) {
    if (e.target.value != "") {
      let selected = e.target.value;
      let filter = topic().filter((f) => f.title === selected);
      if (filter[0]) {
        setArticle({
          id: filter[0].id,
          title: filter[0].title,
          description: filter[0].description,
          headline: filter[0].headline,
        });
      }
    } else {
      setArticle({
        id: "",
        title: "",
        description: "",
        headline: "",
      });
    }
  }

  function onInputChangeField(e, index, field) {
    let value = e.target.value;
    setArticle("headline", index, field, value);
  }

  function toggleView(name) {
    let input = document.getElementById(`${name}-input`);
    let content = document.getElementById(`${name}-content`);
    let button = document.getElementById(`${name}-button`);
    if (
      input.classList.contains("hide") ||
      content.classList.contains("hide")
    ) {
      input.classList.remove("hide");
      content.classList.remove("hide");
      button.innerHTML = '<i class="bi bi-caret-up"></i>';
    } else {
      input.classList.add("hide");
      content.classList.add("hide");
      button.innerHTML = '<i class="bi bi-caret-down"></i>';
    }
  }

  function addContent(type) {
    let typeArr = ["text", "formula", "img"];
    let arr = article[index];
  }

  const saveNewTopic = async (topic) => {
    try {
      await addDoc(collection(db, topic));
    } catch (error) {
      console.debug(error);
    }
  };

  const saveEditTopic = async (item) => {
    let topic = document.getElementById("topic").value;
    let id = article.id;
    const docRef = doc(db, topic, id);
    try {
      await updateDoc(docRef, item);
    } catch (error) {
      console.debug(error);
    }
  };

  function handleSubmit() {
    saveEditTopic({
      title: article.title,
      description: article.description,
      headline: article.headline,
    });
    // console.log(article.headline)
  }

  createEffect(() => {
    // console.log(data().technologie[1].headline[0].content);
  });

  return (
    <div id="editorial">
      <h1 className="editorial-title">Redaktion</h1>
      <p>Hier kannst du Artikel erstellen und bearbeiten.</p>
      <div className="divider" />
      <div className="wrapper col justify-center">
        <div className="header-menu">
          <div className="buttons">
            <button
              type="button"
              className="btn primary btn-back"
              onClick={() => history.back()}
            >
              Zurück
            </button>
            <button
              className="btn primary"
              type="button"
              // onClick={() => handleReset()}
            >
              Reset
            </button>
          </div>
          <button
            className="btn primary submit-btn"
            type="button"
            onClick={() => handleSubmit()}
          >
            Speichern
          </button>
        </div>
        <div className="wrapper gap-1">
          <div className="wrapper col">
            <label htmlFor="topic">Thema</label>
            <select id="topic" name="topic" value={""} onInput={selectTopic}>
              <option value=""></option>
              <option value="technologie">Technologie</option>
              <option value="mathematik">Mathematik</option>
              <option value="spirituosen">Spirituosen</option>
            </select>
          </div>
          <div className="wrapper col">
            <label htmlFor="article">Artikel</label>
            <select
              id="article"
              name="article"
              value={""}
              onInput={selectArticle}
            >
              <option value=""></option>
              <For each={topic()}>
                {(article) => (
                  <option value={article.title}>{article.title}</option>
                )}
              </For>
            </select>
          </div>
        </div>
      </div>
      <div className="editorial-content">
        <label htmlFor="title">Titel</label>
        <input
          type="text"
          name="title"
          className="field"
          value={article.title}
        />
        <label htmlFor="description">Beschreibung</label>
        <textarea type="text" name="description" value={article.description} />
        <For each={article.headline}>
          {(headline, index) => (
            <fieldset id={headline.name} className="headline-body">
              <legend>{headline.name}</legend>
              <div className="input-wrapper show" id={`${headline.name}-input`}>
                <label htmlFor="id">Laufende-Nr.</label>
                <input
                  className="field"
                  type="number"
                  name="id"
                  value={headline.id}
                  onChange={(e) => onInputChangeField(e, index(), "id")}
                />
                <label htmlFor="name">Name</label>
                <input
                  className="field"
                  type="text"
                  name="name"
                  value={headline.name}
                  onChange={(e) => onInputChangeField(e, index(), "name")}
                />
              </div>
              <div
                className="content-wrapper show"
                id={`${headline.name}-content`}
              >
                <label htmlFor="content">Inhalt</label>
                <div>
                  <button>Text</button>
                  <button>Formel</button>
                  <button>Bild</button>
                </div>
                <For each={headline.content}>{(item)=>
                  <div className="input-button-group">
                    <textarea
                      className="area big"
                      id="content"
                      name="content"
                      value={item.value}
                      onChange={(e) =>
                        onInputChangeField(e, index(), "content")
                      }
                    />
                    <button>
                      <i class="bi bi-x-square"></i>
                    </button>
                  </div>}
                </For>
              </div>
              <button
                className="btn secondary icon-btn view-button"
                id={`${headline.name}-button`}
                onClick={() => toggleView(headline.name)}
              >
                <i class="bi bi-caret-up"></i>
              </button>
            </fieldset>
          )}
        </For>
      </div>
    </div>
  );
};

export { Editorial };
