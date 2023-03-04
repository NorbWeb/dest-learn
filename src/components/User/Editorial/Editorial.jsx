import { doc, updateDoc } from "firebase/firestore/lite";
import { createEffect, createSignal, For, Match, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { useContent } from "../../../Context/ContentContext";
import { db } from "../../../firebase";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { Toast } from "../../Helper/Toast/Toast";
import "./Editorial.scss";

const Editorial = () => {
  const [data] = useContent();
  const [openToastDelete, setOpenToastDelete] = createSignal(false);
  const [openToastSave, setOpenToastSave] = createSignal(false);
  const [topic, setTopic] = createSignal("");
  const [imageList, setImageList] = createSignal();
  const [article, setArticle] = createStore({
    id: "",
    title: "",
    description: "",
    headline: "",
  });
  const storage = getStorage();

  function handleToastDelete() {
    setOpenToastDelete(true);
  }

  function handleToastSave() {
    setOpenToastSave(true);
    setTimeout(() => setOpenToastSave(false), 5000);
  }

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
      // console.log(article);
    } else {
      setArticle({
        id: "",
        title: "",
        description: "",
        headline: "",
      });
    }
  }

  function onInputChangeDescription(e) {
    let value = e.target.value;
    setArticle("description", value);
  }

  function addHeadline() {
    let arr = [...article.headline];
    setArticle({
      headline: [...arr, { name: "", content: "", id: arr.length + 1 }],
    });
  }

  function removeHeadline(index) {
    let arr = [...article.headline];
    arr.splice(index, 1);
    setArticle("headline", [...arr]);
    setOpenToastDelete(false);
  }

  function onInputChangeField(e, index, field) {
    let value = e.target.value;
    setArticle("headline", index, field, value);
  }

  function addContent(index, type) {
    let arr = [...article.headline[index].content];
    setArticle("headline", index, {
      content: [...arr, { type: type, value: "" }],
    });
    if (type === "img") {
      getList();
    }
  }

  function editContent(e, indexHeadline, indexContent) {
    let value = e.target.value;
    let arr = [...article.headline[indexHeadline].content];
    let type = arr[indexContent].type;
    arr.splice(indexContent, 1, { type: type, value: value });
    setArticle("headline", indexHeadline, { content: [...arr] });
    // console.log(article.headline[indexHeadline].content[indexContent].value);
  }

  function editContentFile(e, indexHeadline, indexContent) {
    if (e.target.value) {
      let name = e.target.value;
      let arr = [...article.headline[indexHeadline].content];
      let type = arr[indexContent].type;
      name;
      const storageRef = ref(storage, `content-images/${name}`);
      getDownloadURL(storageRef).then((downloadUrl) => {
        arr.splice(indexContent, 1, {
          type: type,
          value: downloadUrl,
          name: name,
        });
        setArticle("headline", indexHeadline, { content: [...arr] });
      });
    }
  }

  function removeContent(indexHeadline, indexContent) {
    let arr = [...article.headline[indexHeadline].content];
    arr.splice(indexContent, 1);
    setArticle("headline", indexHeadline, { content: [...arr] });
  }

  function toggleView(name) {
    // let input = document.getElementById(`${name}-input`);
    let content = document.getElementById(`${name}-content`);
    let button = document.getElementById(`${name}-button`);
    if (
      // input.classList.contains("hide") ||
      content.classList.contains("hide")
    ) {
      // input.classList.remove("hide");
      content.classList.remove("hide");
      button.innerHTML = '<i class="bi bi-caret-up"></i>';
    } else {
      // input.classList.add("hide");
      content.classList.add("hide");
      button.innerHTML = '<i class="bi bi-caret-down"></i>';
    }
  }

  function getList() {
    const listRef = ref(storage, "content-images");
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {});
        setImageList(res.items);
        res.items.forEach((itemRef) => {});
      })
      .catch((error) => {
        console.debug(error);
      });
  }

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
    handleToastSave();
  }

  createEffect(() => {
    // console.log(imageList());
  });

  getList();

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
            {/* <button
              className="btn primary"
              type="button"
              onClick={() => handleReset()}
            >
              Reset
            </button> */}
          </div>
          <button
            className="btn primary submit-btn"
            type="button"
            onClick={() => handleSubmit()}
            disabled={article.id != "" ? false : true}
          >
            Speichern
          </button>
        </div>
        <div className="selection-wrapper">
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
          <button
            className="btn secondary"
            onClick={() => addHeadline()}
            disabled={article.id != "" ? false : true}
          >
            Neuer Abschnitt
          </button>
        </div>
      </div>
      <div className="editorial-content">
        <label htmlFor="description">Beschreibung</label>
        <textarea
          type="text"
          name="description"
          className="description"
          value={article.description}
          onChange={(e) => onInputChangeDescription(e)}
        />
        <For each={article.headline}>
          {(headline, indexHeadline) => (
            <>
              <fieldset id={headline.name} className="headline-body">
                <legend className="wrapper aligne-end gap-1">
                  <div className="legend-text">
                    {headline.name != "" ? headline.name : "Neuer Abschnitt"}
                  </div>
                </legend>
                <div
                  className="input-wrapper show"
                  id={`${headline.name}-input`}
                >
                  <label htmlFor="id">Laufende-Nr.</label>
                  <input
                    className="field"
                    type="number"
                    name="id"
                    value={headline.id}
                    onChange={(e) =>
                      onInputChangeField(e, indexHeadline(), "id")
                    }
                  />
                  <label htmlFor="name">Name</label>
                  <input
                    className="field"
                    type="text"
                    name="name"
                    value={headline.name}
                    onChange={(e) =>
                      onInputChangeField(e, indexHeadline(), "name")
                    }
                  />
                </div>
                <div
                  className="content-wrapper show"
                  id={`${headline.name}-content`}
                >
                  <label htmlFor="content">Inhalt</label>
                  <div className="wrapper gap-1 content-buttons">
                    <button
                      className="btn secondary content-btn content-text"
                      onClick={() => addContent(indexHeadline(), "text")}
                    >
                      Text
                    </button>
                    <button
                      className="btn secondary content-btn content-quote"
                      onClick={() => addContent(indexHeadline(), "quote")}
                    >
                      Block-Quote
                    </button>
                    <button
                      className="btn secondary content-btn content-formula"
                      onClick={() => addContent(indexHeadline(), "formula")}
                    >
                      Formel
                    </button>
                    <button
                      className="btn secondary content-btn content-img"
                      onClick={() => addContent(indexHeadline(), "img")}
                    >
                      Bild
                    </button>
                    <button
                      className="btn secondary content-btn content-link"
                      onClick={() => addContent(indexHeadline(), "link")}
                    >
                      Link
                    </button>
                  </div>
                  <For each={headline.content}>
                    {(item, indexContent) => (
                      <Switch>
                        <Match when={item.type === "text"}>
                          <div className="content-element content-text">
                            <textarea
                              className="area content-input"
                              name="text"
                              placeholder="Jede Textbox ist ein Absatz. Absätze innerhalb einer Textbox sind nicht möglich."
                              value={item.value}
                              onChange={(e) =>
                                editContent(e, indexHeadline(), indexContent())
                              }
                            />
                            <button
                              className="btn secondary btn-sm content-btn"
                              onClick={() =>
                                removeContent(indexHeadline(), indexContent())
                              }
                            >
                              <i class="bi bi-x"></i>
                            </button>
                          </div>
                        </Match>
                        <Match when={item.type === "formula"}>
                          <div className="content-element content-formula">
                            <textarea
                              className="area content-input"
                              name="formula"
                              placeholder="Formeln werden später so angezeigt, wie sie hier eingetragen werden."
                              value={item.value}
                              onChange={(e) =>
                                editContent(e, indexHeadline(), indexContent())
                              }
                            />
                            <button
                              className="btn secondary btn-sm content-btn"
                              onClick={() =>
                                removeContent(indexHeadline(), indexContent())
                              }
                            >
                              <i class="bi bi-x"></i>
                            </button>
                          </div>
                        </Match>
                        <Match when={item.type === "img"}>
                          <div className="content-element content-img">
                            <input
                              type="text"
                              name="image-list"
                              value={item.name ? item.name : ""}
                              onChange={(e) =>
                                editContentFile(
                                  e,
                                  indexHeadline(),
                                  indexContent()
                                )
                              }
                              list="images"
                              className="content-input"
                            />
                            <datalist id="images">
                              <For each={imageList()}>
                                {(img) => (
                                  <option value={img.name}>{img.name}</option>
                                )}
                              </For>
                            </datalist>
                            <button
                              className="btn secondary btn-sm content-btn"
                              onClick={() =>
                                removeContent(indexHeadline(), indexContent())
                              }
                            >
                              <i class="bi bi-x"></i>
                            </button>
                          </div>
                        </Match>
                        <Match when={item.type === "link"}>
                          <div className="content-element content-link">
                            <textarea
                              className="area content-input"
                              name="link-url"
                              placeholder="Den Link folgendermaßen mit senkrechten Trennstrich eintragen: text|url."
                              value={item.value}
                              onChange={(e) =>
                                editContent(e, indexHeadline(), indexContent())
                              }
                            />
                            <button
                              className="btn secondary btn-sm content-btn"
                              onClick={() =>
                                removeContent(indexHeadline(), indexContent())
                              }
                            >
                              <i class="bi bi-x"></i>
                            </button>
                          </div>
                        </Match>
                        <Match when={item.type === "quote"}>
                          <div className="content-element content-quote">
                            <textarea
                              className="area content-input"
                              name="text"
                              placeholder="Ein Info-Feld für Anmerkungen oder Hinweise. Um Text auf der linken Seite fett zu machen einen senkrechten Trennstrich benutzen: fett|normal"
                              value={item.value}
                              onChange={(e) =>
                                editContent(e, indexHeadline(), indexContent())
                              }
                            />
                            <button
                              className="btn secondary btn-sm content-btn"
                              onClick={() =>
                                removeContent(indexHeadline(), indexContent())
                              }
                            >
                              <i class="bi bi-x"></i>
                            </button>
                          </div>
                        </Match>
                      </Switch>
                    )}
                  </For>
                </div>
                <div className="content-menu">
                  <button
                    className="btn secondary icon-btn view-button"
                    id={`${headline.name}-button`}
                    onClick={() => toggleView(headline.name)}
                  >
                    <i class="bi bi-caret-up"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToastDelete()}
                    className="secondary btn icon-btn view-button"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </fieldset>
              <Toast
                open={openToastDelete()}
                type="warn"
                message="Abschnitt wirklich löschen?"
              >
                <div className="wrapper gap-1 justify-center">
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => removeHeadline(indexHeadline())}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => setOpenToastDelete(false)}
                  >
                    Nein
                  </button>
                </div>
              </Toast>
              <Toast
                open={openToastSave()}
                type="success"
                message="Artikel erfolgreich gespeichert!"
              />
            </>
          )}
        </For>
      </div>
    </div>
  );
};

export { Editorial };
