import "./AddDrug.scss";
import { createStore } from "solid-js/store";
import { createEffect, createSignal, For, Index, Show } from "solid-js";
import { useDrugData } from "../../../Context/DrugDataContext.jsx";
import { showToast, Toast } from "../../Helper/Toast/Toast";
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
    treatment: "",
    use: [],
    note: "",
    img: "",
  });

  function handelSubmit(event) {
    const storageRef = ref(storage, `drug-images/${newDrug.img.name}`);
    event.preventDefault();
    uploadBytes(storageRef, newDrug.img).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        saveDrug({
          name: newDrug.name,
          type: newDrug.type,
          category: newDrug.category,
          family: newDrug.family,
          origin: newDrug.origin,
          ingredients: newDrug.ingredients,
          treatment: newDrug.treatment,
          use: newDrug.use,
          note: newDrug.note,
          img: downloadUrl,
        });
      });
    });
    console.log(newDrug);
  }

  const saveDrug = async (drug) => {
    try {
      await addDoc(collection(db, "drugs"), drug);
      showToast(toastProps.id);
      window.location.reload(false);
    } catch (error) {
      console.debug(error);
    }
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

  const toastProps = {
    id: "add-drug-taost",
    message: "Droge hinzugefügt!",
  };

  createEffect(() => {
    setNewDrug(["ingredients"], countIngredient());
    setNewDrug(["use"], countUse());
  });

  const InputButton = (props) => {
    return (
      <button type="button" onClick={() => props.method}>
        {props.add ? (
          <i class="bi bi-plus-lg"></i>
        ) : (
          <i class="bi bi-dash-lg"></i>
        )}
      </button>
    );
  };

  const isRequired = true;
  return (
    <>
      <div id="add-drug">
        <button className="btn primary btn-back" onClick={() => history.back()}>
          Zurück
        </button>
        <form onSubmit={handelSubmit}>
          <label for="name">Name</label>
          <input
            autofocus
            required={isRequired}
            name="name"
            type="text"
            value={newDrug.name}
            onInput={onInputChange}
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
          <label for="type">Verarbeitung</label>
          <input
            required={isRequired}
            name="treatment"
            type="text"
            value={newDrug.treatment}
            onInput={onInputChange}
          />
          <label for="type">Notiz</label>
          <textarea
            required={isRequired}
            name="note"
            type="text"
            value={newDrug.note}
            onInput={onInputChange}
          />
          <label for="type">Bild</label>
          <input
            className="image"
            name="img"
            type="file"
            files={newDrug.img.files[0]}
            onChange={onInputChangeFile}
          />
          {/* <img src={newDrug.img}/> */}
          <div className="multi-input">
            <label for="ingredients-list">Inhaltsstoffe</label>
            <div name="ingredients-list" className="multi-input-body">
              <ol id="ingredients-list">
                <For each={countIngredient()}>
                  {(ingredient, index) => (
                    <li>
                      <div>
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
          <div className="multi-input">
            <label for="use-list">Verwendung</label>
            <div name="use-list" className="multi-input-body">
              <ol id="use-list">
                <For each={countUse()}>
                  {(use, index) => (
                    <div className="wrapper item">
                      <li>
                        <input
                          required={isRequired}
                          id={"use-" + index()}
                          value={use}
                          onChange={(e) => onInputChangeUse(e, index())}
                        />
                      </li>
                      {index() === 0 ? (
                        <InputButton method={addUse()} add />
                      ) : (
                        <InputButton method={removeUse(index())} />
                      )}
                    </div>
                  )}
                </For>
              </ol>
            </div>
          </div>
          <span className="btn-span">
            <button className="btn primary submit-btn" type="submit">
              submit
            </button>
          </span>
        </form>
        <Toast props={toastProps} />
      </div>
    </>
  );
};

export { AddDrug };
