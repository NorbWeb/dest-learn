import { doc, updateDoc } from "firebase/firestore/lite";
import { createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { useContent } from "../../../Context/ContentContext";
import { db } from "../../../firebase";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { Toast } from "../../Helper/Toast/Toast";
import "./Editorial.scss";
import clickOutside from "../../Helper/click-outside";

const Editorial = () => {
  const [data] = useContent();
  const [openToastDelete, setOpenToastDelete] = createSignal(false);
  const [openToastSave, setOpenToastSave] = createSignal(false);
  const [openInfo, setOpenInfo] = createSignal(false);
  const [topic, setTopic] = createSignal("");
  const [imageList, setImageList] = createSignal();
  const [isTouch, setIsTouch] = createSignal(false);
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
      setArticle({
        id: data()[selected][0].id,
        title: data()[selected][0].title,
        description: data()[selected][0].description,
        headline: data()[selected][0].headline,
      });
      setDragOperator(data()[selected][0].headline.length);
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
      setDragOperator(filter[0].headline.length);
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
    if (field === "id") {
      let sortHeadlines = [...article.headline];
      sortHeadlines.sort((a, b) => a.id - b.id);
      setArticle({
        headline: [...sortHeadlines],
      });
      setDragOperator(article.headline.length);
    }
  }

  function addContent(index, type) {
    let arr = [...article.headline[index].content];
    setArticle("headline", index, {
      content: [...arr, { type: type, value: "" }],
    });
    if (type === "img") {
      getList();
    }
    setDragOperator(article.headline.length);
  }

  function editContent(e, indexHeadline, indexContent) {
    let value = e.target.value;
    let arr = [...article.headline[indexHeadline].content];
    let type = arr[indexContent].type;
    arr.splice(indexContent, 1, { type: type, value: value });
    setArticle("headline", indexHeadline, { content: [...arr] });
  }

  function editContentFile(e, indexHeadline, indexContent) {
    if (e.target.value) {
      let name = e.target.value;
      const storageRef = ref(storage, `content-images/${name}`);
      getDownloadURL(storageRef).then((downloadUrl) => {
        setArticle("headline", indexHeadline, "content", indexContent, {
          value: downloadUrl,
          name: name,
        });
      });
    }
  }

  function editContentFileAlt(e, indexHeadline, indexContent) {
    let inputValue = e.target.value;
    setArticle(
      "headline",
      indexHeadline,
      "content",
      indexContent,
      "alt",
      inputValue
    );
  }

  function editContentTextAndFile_text(e, indexHeadline, indexContent) {
    let inputValue = e.target.value;
    setArticle(
      "headline",
      indexHeadline,
      "content",
      indexContent,
      "text",
      inputValue
    );
  }

  function removeContent(indexHeadline, indexContent) {
    let arr = [...article.headline[indexHeadline].content];
    arr.splice(indexContent, 1);
    setArticle("headline", indexHeadline, { content: [...arr] });
  }

  function toggleView(name) {
    let content = document.getElementById(`${name}-content`);
    let button = document.getElementById(`${name}-button`);
    if (content.classList.contains("hide")) {
      content.classList.remove("hide");
      button.innerHTML = '<i class="bi bi-caret-up"></i>';

      let list = document.getElementsByClassName("area");
      for (let i = 0; i < list.length; i++) {
        let s = list[i].scrollHeight;
        list[i].style.height = `${s + 10}px`;
      }
    } else {
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

  function detectTouch() {
    if ("ontouchstart" in document.documentElement) {
      setIsTouch(true);
    } else {
      setIsTouch(false);
    }
  }

  function setHeight(e) {
    let h = e.target.clientHeight;
    let s = e.target.scrollHeight;
    if (h < s) {
      e.target.style.height = `${s + 10}px`;
    }
  }

  const contentTamplates = [
    {
      name: "quote",
      label: "Block-Quote",
      placeholder:
        "Ein Info-Feld für Anmerkungen oder Hinweise. Um Einführungstext fett zu machen, einen senkrechten Trennstrich benutzen: fett|normal.",
    },
    {
      name: "text",
      label: "Text",
      placeholder:
        "Text kann mit Absätzen versehen werden. Um Wörter fett zu machen, diese in '|' einschließen: text |fett| text.",
    },
    {
      name: "formula",
      label: "Formel",
      placeholder:
        "Formeln werden später so angezeigt, wie sie hier eingetragen werden.",
    },
    {
      name: "link",
      label: "Link",
      placeholder:
        "Den Link folgendermaßen mit senkrechtem Trennstrich eintragen: text|url.",
    },
    {
      name: "list",
      label: "Liste",
      placeholder:
        "Jeder Listeneintrag ist eine Zeile. Unterlisteneinträge werden mit '>' eingeleitet.",
    },
    {
      name: "heading",
      label: "Überschrift",
      placeholder:
        "Simple Zwischenüberschrift. Erzeugt einen Link in der Seitenliste.",
    },
    {
      name: "img",
      label: "Bild",
      special: true,
    },
    {
      name: "text-img",
      label: "Text & Bild",
      special: true,
      placeholder:
        'Text kann mit Absätzen versehen werden. Das Bild hat eine max Breite und Höhe, und wird immer rechts angezeigt. Um Wörter fett zu machen, diese in "|" einschließen: text |fett| text.',
    },
  ];

  contentTamplates.sort((a, b) =>
    a.label > b.label ? 1 : b.label > a.label ? -1 : 0
  );

  // ################## DRAG & DROP ##################

  function dragOperator(target, index) {
    let items = target.getElementsByClassName("content-element"),
      current = null;

    for (let i of items) {
      i.draggable = true;
      i.ondragstart = (e) => {
        current = i;
      };
      i.ondragover = (e) => {
        e.preventDefault();
      };
      i.ondrop = (e) => {
        e.preventDefault();
        let arr = [...article.headline[index].content];
        if (i != current) {
          let currentpos = 0,
            droppedpos = 0;
          for (let it = 0; it < items.length; it++) {
            if (current == items[it]) {
              currentpos = it;
            }
            if (i == items[it]) {
              droppedpos = it;
            }
          }

          arr.splice(droppedpos, 0, arr.splice(currentpos, 1)[0]);
          setArticle("headline", index, { content: [...arr] });
        }
      };
    }
  }

  function setDragOperator(length) {
    for (let i = 0; i < length; i++) {
      dragOperator(document.getElementById(`content-dragarea-${i}`), i);
    }
  }

  // ################## PARTIAL COMPONENTS ##################

  const PositionChangeButton = (props) => {
    function indexDown() {
      let iC = props.indexContent;
      let iH = props.indexHeadline;
      let arr = [...article.headline[iH].content];
      if (iC < arr.length - 1) {
        arr.splice(iC, 0, arr.splice(iC + 1, 1)[0]);
      }
      setArticle("headline", iH, { content: [...arr] });
    }

    function indexUp() {
      let iC = props.indexContent;
      let iH = props.indexHeadline;
      let arr = [...article.headline[iH].content];
      if (iC > 0) {
        arr.splice(iC, 0, arr.splice(iC - 1, 1)[0]);
      }
      setArticle("headline", iH, { content: [...arr] });
    }

    return (
      <>
        <Show when={isTouch()}>
          <div className="drag-handle-wrapper">
            <button
              className="btn secondary drag-handle"
              onClick={() => indexUp()}
            >
              <i class="bi bi-caret-up"></i>
            </button>
            <button
              className="btn secondary drag-handle"
              onClick={() => indexDown()}
            >
              <i class="bi bi-caret-down"></i>
            </button>
          </div>
        </Show>
      </>
    );
  };

  const DeleteContentButton = (props) => {
    return (
      <button
        className="btn btn-sm secondary close-btn"
        onClick={() => removeContent(props.indexHeadline, props.indexContent)}
      >
        <i class="bi bi-x"></i>
      </button>
    );
  };

  createEffect(() => {});

  detectTouch();
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
              value={article.title}
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
          <div className="info-element" onClick={() => setOpenInfo(true)}>
            <i class="bi bi-info-circle"></i>
          </div>

          <div
            className="info-element-text"
            classList={{ show: openInfo() }}
            onClick={() => setOpenInfo(false)}
            use:clickOutside={() => setOpenInfo(false)}
          >
            Einige Inhalte können mit einem Modifikator angepasst werden. Genaue
            Anweisung, wie und ob ein Modifikator eingesetzt werden kann,
            erfolgt in dem jeweiligen Inhaltselement. Elemente können mit drag &
            drop oder mit den Pfeilen (nur auf Touchscreens) neu angeordnet
            werden.
          </div>
        </div>
      </div>
      <div className="editorial-content">
        <label htmlFor="description">Beschreibung</label>
        <textarea
          type="text"
          name="description"
          className="description"
          id="description"
          value={article.description}
          onChange={(e) => onInputChangeDescription(e)}
          onInput={(e) => setHeight(e)}
        />
        <For each={article.headline}>
          {(headline, indexHeadline) => (
            <>
              <fieldset id={headline.name} className="headline-body">
                <legend className="wrapper align-end gap-1">
                  <div className="legend-text">
                    {headline.name != "" ? headline.name : "Neuer Abschnitt"}
                  </div>
                </legend>
                <div className="structure-wrapper">
                  <div className="input-wrapper" id={`${headline.name}-input`}>
                    <div className="wrapper col">
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
                    </div>
                    <div className="wrapper col">
                      <label htmlFor="name">Titel</label>
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
                  </div>
                  <div
                    className="content-wrapper hide"
                    id={`${headline.name}-content`}
                  >
                    <label htmlFor="content">Inhalt</label>
                    <div className="wrapper gap-1 content-buttons flex-wrap">
                      <For each={contentTamplates}>
                        {(button) => (
                          <button
                            className="btn secondary btn-sm"
                            onClick={() =>
                              addContent(indexHeadline(), button.name)
                            }
                          >
                            {button.label}
                          </button>
                        )}
                      </For>
                    </div>
                    <div
                      id={`content-dragarea-${indexHeadline()}`}
                      className="content-box"
                    >
                      {/* <<<<<<<<<<<<<<<< Normal Content >>>>>>>>>>>>>>>> */}
                      <For each={headline.content}>
                        {(item, indexContent) => (
                          <Switch>
                            <For each={contentTamplates}>
                              {(template) => (
                                <Match
                                  when={
                                    item.type === template.name &&
                                    !template.special
                                  }
                                >
                                  <div className="content-element">
                                    <div className="content-header">
                                      <label className="content-label">
                                        {template.label}
                                      </label>
                                      <PositionChangeButton
                                        indexHeadline={indexHeadline()}
                                        indexContent={indexContent()}
                                      />
                                    </div>
                                    <div className="content-body">
                                      <textarea
                                        className={`area content-input area-${template.name}`}
                                        name={template.name}
                                        placeholder={template.placeholder}
                                        value={item.value}
                                        onChange={(e) =>
                                          editContent(
                                            e,
                                            indexHeadline(),
                                            indexContent()
                                          )
                                        }
                                        onInput={(e) => setHeight(e)}
                                        onFocus={(e) => setHeight(e)}
                                        resize={false}
                                      />
                                      <DeleteContentButton
                                        indexHeadline={indexHeadline()}
                                        indexContent={indexContent()}
                                      />
                                    </div>
                                  </div>
                                </Match>
                              )}
                            </For>
                            {/* <<<<<<<<<<<<<<<< Special Content - img >>>>>>>>>>>>>>>> */}
                            <Match when={item.type === "img"}>
                              <div className="content-element">
                                <div className="content-header">
                                  <label className="content-label">Bild</label>
                                  <PositionChangeButton
                                    indexHeadline={indexHeadline()}
                                    indexContent={indexContent()}
                                  />
                                </div>
                                <div className="content-body">
                                  <div className="img-body">
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
                                      className="content-input img-input"
                                      placeholder="Bild wählen..."
                                    />
                                    <datalist id="images">
                                      <For each={imageList()}>
                                        {(img) => (
                                          <option value={img.name}>
                                            {img.name}
                                          </option>
                                        )}
                                      </For>
                                    </datalist>
                                    <input
                                      type="text"
                                      className="content-input img-alt"
                                      name="image-alt"
                                      value={item.alt ? item.alt : ""}
                                      placeholder="Beschreibung"
                                      onChange={(e) =>
                                        editContentFileAlt(
                                          e,
                                          indexHeadline(),
                                          indexContent()
                                        )
                                      }
                                    />
                                  </div>
                                  <DeleteContentButton
                                    indexHeadline={indexHeadline()}
                                    indexContent={indexContent()}
                                  />
                                </div>
                              </div>
                            </Match>
                            {/* <<<<<<<<<<<<<<<< Special Content - text-img >>>>>>>>>>>>>>>> */}
                            <Match when={item.type === "text-img"}>
                              <div className="content-element">
                                <div className="content-header">
                                  <label className="content-label">
                                    Text & Bild
                                  </label>
                                  <PositionChangeButton
                                    indexHeadline={indexHeadline()}
                                    indexContent={indexContent()}
                                  />
                                </div>
                                <div className="content-body">
                                  <div className="text-img-body">
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
                                      className="content-input img-input"
                                      placeholder="Bild wählen..."
                                    />
                                    <datalist id="images">
                                      <For each={imageList()}>
                                        {(img) => (
                                          <option value={img.name}>
                                            {img.name}
                                          </option>
                                        )}
                                      </For>
                                    </datalist>
                                    <input
                                      type="text"
                                      className="content-input img-alt"
                                      name="image-alt"
                                      value={item.alt ? item.alt : ""}
                                      placeholder="Bild Beschreibung"
                                      onChange={(e) =>
                                        editContentFileAlt(
                                          e,
                                          indexHeadline(),
                                          indexContent()
                                        )
                                      }
                                    />
                                    <textarea
                                      className={`area content-input area-${
                                        contentTamplates.filter(
                                          (f) => f.name === "text-img"
                                        )[0].name
                                      }`}
                                      name={
                                        contentTamplates.filter(
                                          (f) => f.name === "text-img"
                                        )[0].name
                                      }
                                      placeholder={
                                        contentTamplates.filter(
                                          (f) => f.name === "text-img"
                                        )[0].placeholder
                                      }
                                      value={item.text ? item.text : ""}
                                      onChange={(e) =>
                                        editContentTextAndFile_text(
                                          e,
                                          indexHeadline(),
                                          indexContent()
                                        )
                                      }
                                      onInput={(e) => setHeight(e)}
                                      onFocus={(e) => setHeight(e)}
                                      resize={false}
                                    />
                                  </div>
                                  <DeleteContentButton
                                    indexHeadline={indexHeadline()}
                                    indexContent={indexContent()}
                                  />
                                </div>
                              </div>
                            </Match>
                          </Switch>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
                <div className="content-menu">
                  <button
                    className="btn secondary icon-btn view-button"
                    id={`${headline.name}-button`}
                    onClick={() => toggleView(headline.name, indexHeadline())}
                  >
                    <i class="bi bi-caret-down"></i>
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
            </>
          )}
        </For>
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
      </div>
      <div className="wrapper justify-end">
        <button
          className="btn primary submit-btn"
          type="button"
          onClick={() => handleSubmit()}
          disabled={article.id != "" ? false : true}
        >
          Speichern
        </button>
      </div>
    </div>
  );
};

export { Editorial };
