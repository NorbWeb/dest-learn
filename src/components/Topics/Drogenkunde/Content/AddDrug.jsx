import "./AddDrug.scss";
import { createStore } from "solid-js/store";
import { createEffect, createSignal, For, Index, Show } from "solid-js";
import { useDrugData } from "../../../../Context/DrugDataContext.jsx";
import { showToast, Toast } from "../../../Helper/Toast/Toast";

const AddDrug = () => {
  const [data, { getCategories, addNewDrug }] = useDrugData();
  const [checked, setChecked] = createSignal(false);
  const [countIngredients, setCountIngredients] = createSignal(["", "", ""]);
  const [countUse, setCountUse] = createSignal(["", "", ""]);
  const [newDrug, setNewDrug] = createStore({
    id: "",
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

  createEffect(() => {
    getCategories();
    setNewDrug(["ingredients"], countIngredients());
    setNewDrug(["use"], countUse());
  });

  const onInputChange = (e) => {
    e.preventDefault();
    setNewDrug([e.target.name], e.currentTarget.value);
  };

  const onInputChangeIngredient = (e, index) => {
    e.preventDefault();
    let arr = [...countIngredients()];
    arr[index] = e.currentTarget.value;
    setCountIngredients([...arr]);
  };

  const onInputChangeUse = (e, index) => {
    e.preventDefault();
    let arr = [...countUse()];
    arr[index] = e.currentTarget.value;
    setCountUse([...arr]);
  };

  const addIngredient = () => {
    setCountIngredients([...countIngredients(), ""]);
  };

  const removeIngredient = () => {
    let arr = [...countIngredients()];
    arr.pop();
    setCountIngredients([...arr]);
  };

  const addUse = () => {
    setCountUse([...countUse(), ""]);
  };

  const removeUse = () => {
    let arr = [...countUse()];
    arr.pop();
    setCountUse([...arr]);
  };

  function handleCategoryCheck(event) {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

  function handelSubmit(event) {
    event.preventDefault();
    addNewDrug(newDrug);
    showToast(toastProps.id);
  }

  const toastProps = {
    id: "add-drug-taost",
    message:
      "Droge hinzugefügt!",
  };
  const isRequired = false;

  return (
    <>
      <div id="add-drug" className="">
        <button className="btn primary btn-back" onClick={() => history.back()}>
          Zurück
        </button>
        <form onSubmit={handelSubmit}>
          <div className="left wrapper col gap-1">
            <input
              autofocus
              required={isRequired}
              name="name"
              type="text"
              value={newDrug.name}
              onInput={onInputChange}
              placeholder="Name"
            />
            <input
              required={isRequired}
              name="type"
              type="text"
              value={newDrug.type}
              onInput={onInputChange}
              placeholder="Art"
            />
            <div className="wrapper col gap-1">
              <Show
                when={checked() === false}
                fallback={
                  <input
                    required={isRequired}
                    name="category"
                    type="text"
                    value={newDrug.category}
                    onInput={onInputChange}
                    placeholder="Kategorie"
                  />
                }
              >
                <select
                  name="category"
                  required={isRequired}
                  value={newDrug.category}
                  onInput={onInputChange}
                >
                  <option value="">Kategorie</option>
                  <For each={getCategories()}>
                    {(item) => <option value={item}>{item}</option>}
                  </For>
                </select>
              </Show>
              <div className="wrapper aligne-center">
                <input
                  type="checkbox"
                  name="new-category"
                  id="new-category"
                  checked={checked()}
                  onClick={handleCategoryCheck}
                />
                <label htmlFor="new-category">Neue Kategorie?</label>
              </div>
            </div>
            <input
              required={isRequired}
              name="family"
              type="text"
              value={newDrug.family}
              onInput={onInputChange}
              placeholder="Familie"
            />
            <input
              required={isRequired}
              name="origin"
              type="text"
              value={newDrug.origin}
              onInput={onInputChange}
              placeholder="Herkunft"
            />

            <input
              required={isRequired}
              name="treatment"
              type="text"
              value={newDrug.treatment}
              onInput={onInputChange}
              placeholder="Verarbeitung"
            />
            <textarea
              required={isRequired}
              name="note"
              type="text"
              value={newDrug.note}
              onInput={onInputChange}
              placeholder="Notiz"
            />
            <input
              name="drug-img"
              type="file"
              // value={newDrug().img}
              // onInput={(e)=> setNewDrug({img: e.target.value})}
              placeholder="Bild"
            />
          </div>
          <div className="right wrapper gap-1">
            <div className="wrapper gap-1">
              <div className="wrapper col gap-1">
                <label for="ingredients-list">Inhaltsstoffe</label>
                <div name="ingredients-list" className="wrapper col gap-1">
                  <ol id="ingredients-list">
                    <For each={countIngredients()}>
                      {(ingredient, index) => (
                        <li>
                          <input
                            required={isRequired}
                            id={"ingredient-" + index()}
                            value={ingredient}
                            onChange={(e) =>
                              onInputChangeIngredient(e, index())
                            }
                          />
                        </li>
                      )}
                    </For>
                  </ol>
                </div>
              </div>
              <div className="wrapper gap-1">
                <button
                  type="button"
                  onClick={addIngredient}
                  className="btn icon-btn primary btn-sm"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
                <button
                  type="button"
                  onClick={removeIngredient}
                  className="btn icon-btn primary btn-sm"
                  disabled={countIngredients().length === 1}
                >
                  <i class="bi bi-dash-lg"></i>
                </button>
              </div>
            </div>
            <div className="wrapper gap-1">
              <div className="wrapper col gap-1">
                <label for="use-list">Verwendung</label>
                <div name="use-list" className="wrapper col gap-1">
                  <ol id="use-list">
                    <For each={countUse()}>
                      {(use, index) => (
                        <li>
                          <input
                            required={isRequired}
                            id={"use-" + index()}
                            value={use}
                            onChange={(e) => onInputChangeUse(e, index())}
                          />
                        </li>
                      )}
                    </For>
                  </ol>
                </div>
              </div>
              <div className="wrapper gap-1">
                <button
                  type="button"
                  onClick={addUse}
                  className="btn icon-btn primary btn-sm"
                >
                  <i class="bi bi-plus-lg"></i>
                </button>
                <button
                  type="button"
                  onClick={removeUse}
                  className="btn icon-btn primary btn-sm"
                  disabled={countUse().length === 1}
                >
                  <i class="bi bi-dash-lg"></i>
                </button>
              </div>
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
