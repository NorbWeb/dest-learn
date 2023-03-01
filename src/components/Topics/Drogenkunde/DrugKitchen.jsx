import "./DrugKitchen.scss";
import { createStore } from "solid-js/store";
import { createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import { useDrugData } from "../../../Context/DrugDataContext.jsx";
import { Toast } from "../../Helper/Toast/Toast";
import { db } from "../../../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore/lite";
import { DrugImage } from "./DrugImage";
import { useAuth } from "../../../Context/AuthContext";
import { ImageUpload } from "../../Helper/ImageUpload/ImageUpload";

const DrugKitchen = () => {
  const [data, { getCategories, reload }] = useDrugData();
  const [user] = useAuth();
  const [drug, setDrug] = createStore({
    name: "",
    type: "",
    category: "",
    family: "",
    origin: "",
    ingredients: ["", "", "", "", ""],
    treatment: [],
    use: ["", "", "", "", ""],
    note: "",
    img: { name: "", url: "" },
    highlight: "",
    create: { editor: { id: "", name: "" }, date: "" },
    change: { editor: { id: "", name: "" }, date: "" },
  });
  const [hover, setHover] = createSignal(false);
  const [openToast, setOpenToast] = createSignal(false);
  const [toastMessage, setToastMessage] = createSignal();
  const [drugExist, setDrugExist] = createSignal(false);
  const [editDrug, setEditDrug] = createSignal(false);
  const [drugId, setDrugId] = createSignal("");
  const isRequired = true;

  function clearDrugStore() {
    setDrug({
      name: "",
      type: "",
      category: "",
      family: "",
      origin: "",
      ingredients: ["", "", "", "", ""],
      treatment: [],
      use: ["", "", "", "", ""],
      note: "",
      img: { name: "", url: "" },
      highlight: "",
      create: { editor: { id: "", name: "" }, date: "" },
      change: { editor: { id: "", name: "" }, date: "" },
    });
  }

  function handelSubmit(event) {
    if (editDrug() === false) {
      setToastMessage("Droge erfolgreich erstellt");
      event.preventDefault();
      saveNewDrug({
        name: drug.name,
        type: drug.type,
        category: drug.category,
        family: drug.family,
        origin: drug.origin,
        ingredients: drug.ingredients,
        treatment: drug.treatment,
        use: drug.use,
        note: drug.note,
        img: { name: drug.img.name, url: drug.img.url },
        highlight: drug.highlight,
        create: {
          editor: { id: user().uid, name: user().displayName },
          date: new Date(),
        },
        change: {
          editor: { id: drug.change.editor.id, name: drug.change.editor.name },
          date: drug.change,
        },
      });
    } else if (editDrug() === true) {
      setToastMessage("Droge erfolgreich bearbeitet");
      event.preventDefault();
      saveEditDrug({
        name: drug.name,
        type: drug.type,
        category: drug.category,
        family: drug.family,
        origin: drug.origin,
        ingredients: drug.ingredients,
        treatment: drug.treatment,
        use: drug.use,
        note: drug.note,
        img: { name: drug.img.name, url: drug.img.url },
        highlight: drug.highlight,
        change: {
          editor: { id: user().uid, name: user().displayName },
          date: new Date(),
        },
      });
    }
  }

  const saveNewDrug = async (drug) => {
    try {
      await addDoc(collection(db, "drugs"), drug);
      reload();
      clearDrugStore();
      resetEditDrugInput();
      clearHighlight();
      showToast();
    } catch (error) {
      console.debug(error);
    }
  };

  const saveEditDrug = async (drug) => {
    const docRef = doc(db, "drugs", drugId());
    try {
      await updateDoc(docRef, drug);
      reload();
      clearDrugStore();
      resetEditDrugInput();
      clearHighlight();
      showToast();
    } catch (error) {
      console.debug(error);
    }
  };

  const handleEditDrug = (e) => {
    const drugList = [];
    if (data()) {
      for (let i = 0; i < data().allDrugs.length; i++) {
        drugList.push(data().allDrugs[i].name);
      }
      if (e.target.value != "" && drugList.includes(e.target.value)) {
        setEditDrug(true);
        const drug = data().allDrugs.find((f) => f.name === e.target.value);
        setDrug(drug);
        setDrugId(drug.id);
      } else {
        setEditDrug(false);
        setDrugId("");
        clearDrugStore();
      }
    }
  };

  const showToast = () => {
    setOpenToast(true);
    setTimeout(() => {
      setOpenToast(false);
    }, 5000);
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setDrug([e.target.name], e.currentTarget.value);
  };

  // Methods for handling ingredients
  const onInputChangeIngredient = (e, index) => {
    e.preventDefault();
    let arr = [...drug.ingredients];
    arr[index] = e.currentTarget.value;
    setDrug("ingredients", [...arr]);
  };

  const addIngredient = () => {
    setDrug("ingredients", [...drug.ingredients, ""]);
  };

  const removeIngredient = (index) => {
    let arr = [...drug.ingredients];
    arr.splice(index, 1);
    setDrug("ingredients", [...arr]);
  };

  // Methods for handling uses
  const onInputChangeUse = (e, index) => {
    e.preventDefault();
    let arr = [...drug.use];
    arr[index] = e.currentTarget.value;
    setDrug("use", [...arr]);
  };

  const addUse = () => {
    setDrug("use", [...drug.use, ""]);
  };

  const removeUse = (index) => {
    let arr = [...drug.use];
    arr.splice(index, 1);
    setDrug("use", [...arr]);
  };

  const onInputChangeTreatment = (e) => {
    if (e.target.checked) {
      setDrug("treatment", [...drug.treatment, e.target.value]);
    } else if (!e.target.checked) {
      let arr = [...drug.treatment];
      let index = arr.indexOf(e.target.value);
      arr.splice(index, 1);
      setDrug("treatment", arr);
    }
  };

  function clearHighlight() {
    let clear = document.getElementsByClassName("highlight");
    for (let i = 0; i < clear.length; i++) {
      clear[i].classList.remove("highlight");
    }
  }

  const onInputChangeHighlight = (e) => {
    clearHighlight();
    let selected = e.target.value.toLowerCase() + "-label";
    let label = document.getElementById(selected);
    if (selected != "-label") {
      label.classList.add("highlight");
      setDrug("highlight", e.target.value);
    } else {
      setDrug("highlight", "");
    }
  };

  const checkIfDrugNameIsInDb = () => {
    let tester = false;
    if (data()) {
      for (let i = 0; i < data().allDrugs.length; i++) {
        if (drug.name.toLowerCase() === data().allDrugs[i].name.toLowerCase()) {
          tester = true;
        }
      }
      if (tester === true) {
        setDrugExist(true);
      } else {
        setDrugExist(false);
      }
    }
  };

  const InputButton = (props) => {
    return (
      <button
        classList={{
          "primary btn icon-btn": props.add,
          "secondary btn icon-btn": !props.add,
        }}
        type="button"
        onClick={() => props.method}
      >
        {props.add ? (
          <i class="bi bi-plus-lg"></i>
        ) : (
          <i class="bi bi-dash-lg"></i>
        )}
      </button>
    );
  };

  function resetEditDrugInput() {
    document.getElementById("edit-select-form").reset();
  }

  function handleReset() {
    resetEditDrugInput();
    clearDrugStore();
    setEditDrug(false);
    clearHighlight();
  }

  createEffect(() => {
    checkIfDrugNameIsInDb();
    // if (tester) {
    // console.log(drug.treatment);
    // }
  });

  return (
    <>
      <div id="drug-kitchen">
        <Toast type="success" open={openToast()} message={toastMessage()} />
        <h1 className="drug-title">Drogenlabor</h1>
        <p>Hier kannst du neue Drogen anlegen oder vorhandene bearbeiten</p>
        <div className="divider" />
        <div className="header-menu">
          <form id="edit-select-form" method="dialog">
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
                onClick={() => handleReset()}
              >
                Reset
              </button>
            </div>
            <div className="wrapper col edit-input">
              <label for="edit">Vorhandene Droge bearbeiten</label>
              <input
                type="text"
                name="edit"
                onChange={handleEditDrug}
                list="drug"
              />
              <datalist id="drug">
                <For each={data() ? data().allDrugs : []}>
                  {(drug) => <option value={drug.name}>{drug.name}</option>}
                </For>
              </datalist>
            </div>
            {/* <DrugImageUpload /> */}
            {/* <ImageUpload folder='drug-images'/> */}
          </form>
        </div>
        <form onSubmit={handelSubmit} className="grid-container">
          <div className="grid-item">
            <label classList={{ error: drugExist() && !editDrug() }} for="name">
              {drugExist() && !editDrug() ? "Droge schon vorhanden " : "Name"}
            </label>
            <input
              autofocus
              required={isRequired}
              name="name"
              type="text"
              value={drug.name}
              onInput={onInputChange}
              classList={{ error: drugExist() && !editDrug() }}
            />
            <label for="type">Art</label>
            <input
              required={isRequired}
              name="type"
              type="text"
              value={drug.type}
              onInput={onInputChange}
            />
            <label for="category">Kategorie</label>
            <input
              type="text"
              required={isRequired}
              name="category"
              value={drug.category}
              onInput={onInputChange}
              list="category"
            />
            <datalist id="category">
              <For each={getCategories()}>
                {(item) => <option value={item}>{item}</option>}
              </For>
            </datalist>
            <label for="family">Familie</label>
            <input
              required={isRequired}
              name="family"
              type="text"
              value={drug.family}
              onInput={onInputChange}
            />
            <label for="type">Herkunft</label>
            <input
              required={isRequired}
              name="origin"
              type="text"
              value={drug.origin}
              onInput={onInputChange}
            />
          </div>
          <div className="grid-item">
            <fieldset
              onChange={onInputChangeTreatment}
              className="treatment-fieldset"
            >
              <legend>Verarbeitung</legend>
              <div>
                <input
                  type="checkbox"
                  id="destillation"
                  name="destillation"
                  value="Destillation"
                  checked={drug.treatment.includes("Destillation")}
                />
                <label id="destillation-label" for="destillation">
                  Destillation
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="dampf"
                  name="dampf"
                  value="Wasserdampf-Destillation"
                  checked={drug.treatment.includes("Wasserdampf-Destillation")}
                />
                <label id="wasserdampf-destillation-label" for="dampf">
                  Wasserdampf-Destillation
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="extraktion"
                  name="extraktion"
                  value="Extraktionsverfahren"
                  checked={drug.treatment.includes("Extraktionsverfahren")}
                />
                <label id="extraktionsverfahren-label" for="extraktion">
                  Extraktionsverfahren (alle)
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="mazeration"
                  name="mazeration"
                  value="Mazeration"
                  checked={drug.treatment.includes("Mazeration")}
                />
                <label id="mazeration-label" for="mazeration">
                  Mazeration
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="perkulation"
                  name="perkulation"
                  value="Perkulation"
                  checked={drug.treatment.includes("Perkulation")}
                />
                <label id="perkulation-label" for="perkulation">
                  Perkulation
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="digestion"
                  name="digestion"
                  value="Digestion"
                  checked={drug.treatment.includes("Digestion")}
                />
                <label id="digestion-label" for="digestion">
                  Digestion
                </label>
              </div>
            </fieldset>
            <div className="highlight-container">
              <label for="highlight">Bevorzugt</label>
              <select
                id="highlight"
                name="highlight"
                onChange={onInputChangeHighlight}
                value={drug.highlight}
              >
                <option value="" selected></option>
                <option value="Destillation">Destillation</option>
                <option value="Wasserdampf-Destillation">
                  Wasserdampf-Destillation
                </option>
                <option value="Extraktionsverfahren">
                  Extraktionsverfahren
                </option>
                <option value="Mazeration">Mazeration</option>
                <option value="Perkulation">Perkulation</option>
                <option value="Digestion">Digestion</option>
              </select>

              <div
                className="highlight-info"
                onMouseOver={() => setHover(() => true)}
                onMouseLeave={() => setHover(() => false)}
              >
                <i class="bi bi-info-circle"></i>
              </div>
              <div
                className="highlight-info-text"
                classList={{ show: hover() }}
              >
                Wähle ein bevorzugtes Verfahren, um zu verdeutlichen, dass es
                hauptsächlich verwendet wird, bzw. die besten Ergebnisse
                liefert.
              </div>
            </div>
          </div>
          <div className="multi-input grid-item">
            <label for="ingredients-list">Inhaltsstoffe</label>
            <div name="ingredients-list" className="multi-input-body">
              <ol id="ingredients-list">
                <For each={drug.ingredients}>
                  {(ingredient, index) => (
                    <li>
                      <div className="group">
                        <input
                          required={isRequired}
                          id={"ingredient-" + index()}
                          value={ingredient}
                          onChange={(e) => onInputChangeIngredient(e, index())}
                        />
                        {index() === 0 ? (
                          <InputButton method={addIngredient()} add />
                        ) : (
                          <InputButton method={removeIngredient(index())} />
                        )}
                      </div>
                    </li>
                  )}
                </For>
              </ol>
            </div>
          </div>
          <div className="multi-input grid-item">
            <label for="use-list">Verwendung</label>
            <div name="use-list" className="multi-input-body">
              <ol id="use-list">
                <For each={drug.use}>
                  {(use, index) => (
                    <li>
                      <div className="group">
                        <input
                          required={isRequired}
                          id={"use-" + index()}
                          value={use}
                          onChange={(e) => onInputChangeUse(e, index())}
                        />
                        {index() === 0 ? (
                          <InputButton method={addUse()} add />
                        ) : (
                          <InputButton method={removeUse(index())} />
                        )}
                      </div>
                    </li>
                  )}
                </For>
              </ol>
            </div>
          </div>
          <div className="grid-item">
            <label for="type">Notiz</label>
            <textarea
              required={isRequired}
              name="note"
              type="text"
              value={drug.note}
              onInput={onInputChange}
            />
          </div>
          <div className="grid-item">
            <DrugImage setDrug={setDrug} drug={drug} editDrug={editDrug} />
          </div>

          <div className="btn-span grid-item">
            <button
              className="btn primary submit-btn"
              type="submit"
              disabled={drugExist() && !editDrug()}
            >
              {editDrug() ? "Änderungen speichern" : "Speichern"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export { DrugKitchen };
