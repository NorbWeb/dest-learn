import "./AddDrug.scss";
import { createStore } from "solid-js/store";
import { createEffect, createSignal, For, Show } from "solid-js";
import { useDrugData } from "../../../../Context/DrugDataContext.jsx";

const AddDrug = () => {
  const [data, { getCategories, addNewDrug }] = useDrugData();
  const [checked, setChecked] = createSignal(false);
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
  });

  const onInputChange = (e) => {
    e.preventDefault();
    setNewDrug([e.target.name], e.currentTarget.value);
  };

  function multipleInputs() {
    let value = document.getElementById("ingredients").value;
    setNewDrug("ingredients", [...newDrug.ingredients, value]);
    document.getElementById("ingredients").value = "";
  }

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
    alert("New drug added");
  }

  // const MultipleOptions = () => {
  //   const [count, setCount] = createSignal(1);
  //   const arr = Array.from({ length: count() }).map(() => true);

  //   return <For each={arr}>{(item) => <input value={item} />}</For>;
  // };
  return (
    <>
      <div id="add-drug" className="">
        <div className="wrapper aligne-center gap-1"></div>
        <div id="drug-detail">
          <div className="wrapper aligne-base justify-between"></div>
          <div className="divider mb-1" />
          <form className="wrapper col gap-1">
            <input
              autofocus
              name="name"
              type="text"
              value={newDrug.name}
              onInput={onInputChange}
              placeholder="Name"
            />
            <input
              name="type"
              type="text"
              value={newDrug.type}
              onInput={onInputChange}
              placeholder="Art"
            />
            <div className="wrapper gap-1">
              <Show
                when={checked() === false}
                fallback={
                  <input
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
              name="family"
              type="text"
              value={newDrug.family}
              onInput={onInputChange}
              placeholder="Familie"
            />
            <input
              name="origin"
              type="text"
              value={newDrug.origin}
              onInput={onInputChange}
              placeholder="Herkunft"
            />
            <div className="wrapper gap-1">
              <input
                name="ingredients"
                id="ingredients"
                type="text"
                placeholder="Inhaltsstoffe"
              />
              <button
                type="button"
                onClick={multipleInputs}
                className="btn primary btn-sm"
              >
                Add
              </button>
              <div>Inhaltsstoffe {newDrug.ingredients}</div>
            </div>
            <input
              name="treatment"
              type="text"
              value={newDrug.treatment}
              onInput={onInputChange}
              placeholder="Verarbeitung"
            />
            <div className="wrapper gap-1">
              <input
                name="use"
                type="text"
                value={newDrug.use}
                onInput={onInputChange}
                placeholder="Verwendung"
              />
              <div>Verwendung {newDrug.use}</div>
            </div>
            <textarea
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
            <button
              className="btn primary"
              type="button"
              onClick={handelSubmit}
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export { AddDrug };
