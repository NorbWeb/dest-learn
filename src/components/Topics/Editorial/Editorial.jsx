import { addDoc, collection, doc, updateDoc } from "firebase/firestore/lite";
import { createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { useContent } from "../../../Context/ContentContext";
import { db } from "../../../firebase";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { Toast } from "../../Helper/Toast/Toast";
import "./Editorial.scss";

const Editorial = () => {
  const [data] = useContent();
  const [openToast, setOpenToast] = createSignal(false);
  const [topic, setTopic] = createSignal("");
  const [imageList, setImageList] = createSignal();
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
    setOpenToast(false);
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
      let value = e.target.value;
      let url = "";
      const storageRef = ref(storage, `content-images/${value}`);
      getDownloadURL(storageRef).then((downloadUrl) => {
        url = downloadUrl;
      });
      console.log(url)
      let arr = [...article.headline[indexHeadline].content];
      let type = arr[indexContent].type;
      arr.splice(indexContent, 1, { type: type, value: url, name: value });
      setArticle("headline", indexHeadline, { content: [...arr] });
    }
    console.log(article.headline[indexHeadline].content[indexContent]);
  }

  function removeContent(indexHeadline, indexContent) {
    let arr = [...article.headline[indexHeadline].content];
    arr.splice(indexContent, 1);
    setArticle("headline", indexHeadline, { content: [...arr] });
  }

  const saveNewTopic = async (topic) => {
    try {
      await addDoc(collection(db, topic));
    } catch (error) {
      console.debug(error);
    }
  };

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

  const storage = getStorage();

  function getList() {
    const listRef = ref(storage, "content-images");
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {});
        setImageList(res.items);
        res.items.forEach((itemRef) => {});
      })
      .catch((error) => {});
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
    // console.log(article.headline)
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
        <div className="title-button-wrapper">
          <div className="wrapper col">
            <label htmlFor="title">Titel</label>
            <input
              type="text"
              name="title"
              className="field"
              value={article.title}
            />
          </div>
          <button
            className="btn secondary"
            onClick={() => addHeadline()}
            disabled={article.id != "" ? false : true}
          >
            Neuer Abschnitt
          </button>
        </div>
        <label htmlFor="description">Beschreibung</label>
        <textarea type="text" name="description" value={article.description} />
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
                  <div className="wrapper gap-1">
                    <button
                      className="btn secondary"
                      onClick={() => addContent(indexHeadline(), "text")}
                    >
                      Text
                    </button>
                    <button
                      className="btn secondary"
                      onClick={() => addContent(indexHeadline(), "formula")}
                    >
                      Formel
                    </button>
                    <button
                      className="btn secondary"
                      onClick={() => addContent(indexHeadline(), "img")}
                    >
                      Bild
                    </button>
                  </div>
                  <For each={headline.content}>
                    {(item, indexContent) => (
                      <Switch>
                        <Match when={item.type === "text"}>
                          <div className="input-button-group">
                            <textarea
                              className="area content-input"
                              id="content"
                              name="content"
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
                              <i class="bi bi-x-square"></i>
                            </button>
                          </div>
                        </Match>
                        <Match when={item.type === "formula"}>
                          <div className="input-button-group">
                            <textarea
                              className="area content-input"
                              id="content"
                              name="content"
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
                              <i class="bi bi-x-square"></i>
                            </button>
                          </div>
                        </Match>
                        <Match when={item.type === "img"}>
                          <div className="input-button-group">
                            <input
                              type="text"
                              name="image-list"
                              value={item.name}
                              onInput={(e) =>
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
                              <i class="bi bi-x-square"></i>
                            </button>
                          </div>
                        </Match>
                      </Switch>
                    )}
                  </For>
                </div>
                <div className="wrapper col gap-1 justify-between">
                  <button
                    className="btn secondary icon-btn view-button"
                    id={`${headline.name}-button`}
                    onClick={() => toggleView(headline.name)}
                  >
                    <i class="bi bi-caret-up"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenToast(true)}
                    className="warn btn icon-btn view-button"
                  >
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </fieldset>
              <Toast open={openToast()} type="warn">
                <div className="wrapper gap-1 col aligne-center">
                  <div className="warn ">Abschnitt wirklich löschen?</div>
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
                      onClick={() => setOpenToast(false)}
                    >
                      Nein
                    </button>
                  </div>
                </div>
              </Toast>
            </>
          )}
        </For>
      </div>
    </div>
  );
};

export { Editorial };
