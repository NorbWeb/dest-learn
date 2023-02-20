import "./AddDrug.scss";
import { createStore } from "solid-js/store";
import { createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import { useDrugData } from "../../../Context/DrugDataContext.jsx";
import { Toast } from "../../Helper/Toast/Toast";
import { storage, db } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore/lite";
import { DrugImage } from "./DrugImage";

const AddDrug = () => {
  const [data, { getCategories, reload }] = useDrugData();
  const [drug, setDrug] = createStore({
    name: "",
    type: "",
    category: "",
    family: "",
    origin: "",
    ingredients: ["", "", "", "", ""],
    treatment: ["", "", "", "", "", ""],
    use: ["", "", "", "", ""],
    note: "",
    img: "",
    highlight: "",
    create: "",
    change: "",
  });
  const [hover, setHover] = createSignal(false);
  const [open, setOpen] = createSignal(false);
  const [drugExist, setDrugExist] = createSignal(false);
  const [editDrug, setEditDrug] = createSignal(false);
  const [drugId, setDrugId] = createSignal("");
  const isRequired = false;

  function handelSubmit(event) {
    if (editDrug() === false) {
      event.preventDefault();
      if (drug.img != "") {
        const storageRef = ref(storage, `drug-images/${drug.img.name}`);
        uploadBytes(storageRef, drug.img).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadUrl) => {
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
              img: downloadUrl,
              highlight: drug.highlight,
              create: new Date(),
              change: drug.change,
            });
          });
        });
      } else {
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
          img: drug.img,
          highlight: drug.highlight,
          create: new Date(),
          change: drug.change,
        });
      }
    } else if (editDrug() === true) {
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
        img: drug.img,
        highlight: drug.highlight,
        change: new Date(),
      });
    }
    showToast();

    // console.log(drug.treatment);
  }

  const saveNewDrug = async (drug) => {
    try {
      await addDoc(collection(db, "drugs"), drug);
      reload();
      setDrug({
        name: "",
        type: "",
        category: "",
        family: "",
        origin: "",
        ingredients: ["", "", "", "", ""],
        treatment: ["", "", "", "", "", ""],
        use: ["", "", "", "", ""],
        note: "",
        img: "",
        highlight: "",
      });
    } catch (error) {
      console.debug(error);
    }
  };

  const saveEditDrug = async (drug) => {
    const docRef = doc(db, "drugs", drugId());
    try {
      await updateDoc(docRef, drug);
      reload();
      setDrug({
        name: "",
        type: "",
        category: "",
        family: "",
        origin: "",
        ingredients: ["", "", "", "", ""],
        treatment: ["", "", "", "", "", ""],
        use: ["", "", "", "", ""],
        note: "",
        img: "",
        highlight: "",
      });
    } catch (error) {
      console.debug(error);
    }
  };

  const handleEditDrug = (e) => {
    if (e.target.value != "") {
      setEditDrug(true);
      const drug = data().allDrugs.find((f) => f.name === e.target.value);
      setDrug(drug);
      setDrugId(drug.id);
    } else {
      setEditDrug(false);
      setDrugId("");
      setDrug({
        name: "",
        type: "",
        category: "",
        family: "",
        origin: "",
        ingredients: ["", "", "", "", ""],
        treatment: ["", "", "", "", "", ""],
        use: ["", "", "", "", ""],
        note: "",
        img: "",
        highlight: "",
      });
    }
  };

  const showToast = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const onInputChange = (e) => {
    e.preventDefault();
    setDrug([e.target.name], e.currentTarget.value);
  };

  const onInputChangeFile = (e) => {
    e.preventDefault();
    setDrug([e.target.name], e.currentTarget.files[0]);
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
    const alltreatments = [
      "Destillation",
      "Wasserdampf-Destillation",
      "Extraktionsverfahren",
      "Mazeration",
      "Perkulation",
      "Digestion",
    ];
    if (e.target.checked) {
      setDrug("treatment", e.target.value, alltreatments[e.target.value]);
    } else if (!e.target.checked) {
      setDrug("treatment", e.target.value, 0);
    }
  };

  const onInputChangeHighlight = (e) => {
    let test = document.getElementsByClassName("highlight");
    for (let i = 0; i < test.length; i++) {
      test[i].classList.remove("highlight");
    }
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

  createEffect(() => {
    checkIfDrugNameIsInDb();
    // console.log(drugExist());
  });

  return (
    <>
      <div id="add-drug">
        <Toast type="success" open={open()}>
          {editDrug()
            ? "Droge erfolgreich beareitet"
            : "Droge erfolgreich hinzugefügt"}
        </Toast>
        <div className="header-menu">
          <button
            className="btn primary btn-back"
            onClick={() => history.back()}
          >
            Zurück
          </button>
          <div className="edit-select">
            <label for="edit">Vorhandene Droge bearbeiten</label>
            <select id="edit" name="edit" onChange={handleEditDrug}>
              <option value="" selected></option>
              <For each={data() ? data().allDrugs : []}>
                {(drug) => <option value={drug.name}>{drug.name}</option>}
              </For>
            </select>
          </div>
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
            <fieldset onChange={onInputChangeTreatment}>
              <legend>Verarbeitung</legend>
              <div>
                <input
                  type="checkbox"
                  id="destillation"
                  name="destillation"
                  value="0"
                  checked={drug.treatment[0]}
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
                  value="1"
                  checked={drug.treatment[1] ? true : false}
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
                  value="2"
                  checked={drug.treatment[2]}
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
                  value="3"
                  checked={drug.treatment[3]}
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
                  value="4"
                  checked={drug.treatment[4]}
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
                  value="5"
                  checked={drug.treatment[5]}
                />
                <label id="digestion-label" for="digestion">
                  Digestion
                </label>
              </div>
              <div className="wrapper aligne-center">
                <label for="highlight">Bevorzugt</label>
                <select
                  id="highlight"
                  name="highlight"
                  onChange={onInputChangeHighlight}
                >
                  <option value="" selected></option>
                  <option value="Destillation">Destillation</option>
                  <option value="Wasserdampf-Destillation">
                    Wasserdampf-Destil.
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
            </fieldset>
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
            {/* <label for="type">Bild</label>
            <input
              className="image"
              name="img"
              type="file"
              files={drug.img}
              onChange={onInputChangeFile}
            />
            <Switch
              fallback={<img className="preview" src="/placeholder.svg" />}
            >
              <Match when={editDrug() && typeof drug.img === "string"}>
                <img
                  className="preview"
                  src={drug.img === "" ? "/placeholder.svg" : drug.img}
                />
              </Match>
              <Match when={!editDrug() && typeof drug.img === "object"}>
                <img className="preview" src={URL.createObjectURL(drug.img)} />
              </Match>
            </Switch> */}
            <DrugImage />
          </div>

          <div className="btn-span grid-item">
            <button
              className="btn primary submit-btn"
              type="submit"
              disabled={drugExist() && !editDrug()}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export { AddDrug };
