import "./AddDrug.scss";
import { createStore } from "solid-js/store";
import { createEffect, createSignal, For, Index, Show } from "solid-js";
import { useDrugData } from "../../../Context/DrugDataContext.jsx";
import { Toast } from "../../Helper/Toast/Toast";
import { storage, db } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore/lite";

const AddDrug = () => {
  const [data, { getCategories }] = useDrugData();
  const [countIngredient, setCountIngredient] = createSignal([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [countUse, setCountUse] = createSignal(["", "", "", "", ""]);
  const [newDrug, setNewDrug] = createStore({
    name: "",
    type: "",
    category: "",
    family: "",
    origin: "",
    ingredients: [],
    treatment: [],
    use: [],
    note: "",
    img: "",
    highlight: "",
  });
  const [hover, setHover] = createSignal(false);
  const [open, setOpen] = createSignal(false);
  const [drugExist, setDrugExist] = createSignal(false);
  const isRequired = false;

  function handelSubmit(event) {
    const storageRef = ref(storage, `drug-images/${newDrug.img.name}`);
    event.preventDefault();
    // uploadBytes(storageRef, newDrug.img).then((snapshot) => {
    //   getDownloadURL(snapshot.ref).then((downloadUrl) => {
    //     saveDrug({
    //       name: newDrug.name,
    //       type: newDrug.type,
    //       category: newDrug.category,
    //       family: newDrug.family,
    //       origin: newDrug.origin,
    //       ingredients: newDrug.ingredients,
    //       treatment: newDrug.treatment,
    //       use: newDrug.use,
    //       note: newDrug.note,
    //       img: downloadUrl,
    //       highlight: newDrug.highlight,
    //     });
    //   });
    // });

    showToast();

    // console.log(newDrug.highlight);
  }

  const saveDrug = async (drug) => {
    try {
      await addDoc(collection(db, "drugs"), drug);
      window.location.reload(false);
    } catch (error) {
      console.debug(error);
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
    setNewDrug([e.target.name], e.currentTarget.value);
  };

  const onInputChangeFile = (e) => {
    e.preventDefault();
    setNewDrug([e.target.name], e.currentTarget.files[0]);
  };

  const onInputChangeIngredient = (e, index) => {
    e.preventDefault();
    let arr = [...countIngredient()];
    arr[index] = e.currentTarget.value;
    setCountIngredient([...arr]);
  };

  const onInputChangeUse = (e, index) => {
    e.preventDefault();
    let arr = [...countUse()];
    arr[index] = e.currentTarget.value;
    setCountUse([...arr]);
  };

  const addIngredient = () => {
    setCountIngredient([...countIngredient(), ""]);
  };

  const removeIngredient = (index) => {
    let arr = [...countIngredient()];
    arr.splice(index, 1);
    setCountIngredient([...arr]);
  };

  const addUse = () => {
    setCountUse([...countUse(), ""]);
  };

  const removeUse = (index) => {
    let arr = [...countUse()];
    arr.splice(index, 1);
    setCountUse([...arr]);
  };

  const onInputChangeTreatment = (e) => {
    if (e.target.checked) {
      setNewDrug("treatment", [...newDrug.treatment, e.target.value]);
    } else if (!e.target.checked) {
      let arr = [...newDrug.treatment];
      const index = arr.indexOf(e.target.value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      setNewDrug("treatment", [...arr]);
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
      setNewDrug("highlight", e.target.value);
    } else {
      setNewDrug("highlight", "");
    }
  };

  createEffect(() => {
    setNewDrug(["ingredients"], countIngredient());
    setNewDrug(["use"], countUse());
    if (checkIfDrugNameIsInDb() === true) {
      setDrugExist(true);
    } else {
      setDrugExist(false);
    }
  });

  const checkIfDrugNameIsInDb = () => {
    let tester = false;
    if (data()) {
      for (let i = 0; i < data().allDrugs.length; i++) {
        if (
          newDrug.name.toLowerCase() === data().allDrugs[i].name.toLowerCase()
        ) {
          tester = true;
        }
      }
      if (tester === true) {
        return true;
      } else {
        return false;
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

  return (
    <>
      <div id="add-drug">
        <Toast type="success" open={open()}>
          Droge erfolgreich hinzugefügt
        </Toast>
        <button className="btn primary btn-back" onClick={() => history.back()}>
          Zurück
        </button>
        <form onSubmit={handelSubmit} className="grid-container">
          <div className="grid-item">
            <label classList={{ error: drugExist() }} for="name">
              {drugExist() ? "Droge schon vorhanden " : "Name"}
            </label>
            <input
              autofocus
              required={isRequired}
              name="name"
              type="text"
              value={newDrug.name}
              onInput={onInputChange}
              classList={{ error: drugExist() }}
            />
            <label for="type">Art</label>
            <input
              required={isRequired}
              name="type"
              type="text"
              value={newDrug.type}
              onInput={onInputChange}
            />
            <label for="category">Kategorie</label>
            <input
              type="text"
              required={isRequired}
              name="category"
              value={newDrug.category}
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
              value={newDrug.family}
              onInput={onInputChange}
            />
            <label for="type">Herkunft</label>
            <input
              required={isRequired}
              name="origin"
              type="text"
              value={newDrug.origin}
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
                  value="Destillation"
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
                <For each={countIngredient()}>
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
                <For each={countUse()}>
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
              value={newDrug.note}
              onInput={onInputChange}
            />
          </div>
          <div className="grid-item">
            <label for="type">Bild</label>
            <input
              className="image"
              name="img"
              type="file"
              files={newDrug.img}
              onChange={onInputChangeFile}
            />
            <img
              className="preview"
              src={
                newDrug.img
                  ? URL.createObjectURL(newDrug.img)
                  : "/placeholder.svg"
              }
            />
          </div>

          <div className="btn-span grid-item">
            <button
              className="btn primary submit-btn"
              type="submit"
              disabled={drugExist()}
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
