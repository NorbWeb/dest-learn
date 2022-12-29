import { createEffect, createSignal } from "solid-js";
import { DrugCard } from "./DrugCard";
import "./DrugOverview.scss";

const items = [
  {
    id: 1,
    name: "Enzianwurzel",
    type: "Wurzel",
    family: "Enziangewächse",
    origin: "Hochgebirge Europas",
    ingredients: [
      "bis 30% Gentianose (vergä. Dreifachzucker)",
      "Gentin (gelber Farbstoff)",
      "Gentiopikrin (Bitterstoff)",
      "Amarogentin (Bitterstoff)",
      "Pektine",
      "6% fettes Öl",
    ],
    treatment: "Extraktionsverfahren",
    use: [
      "Alpenkräuter",
      "Abteilikör",
      "Boonekamp",
      "Feinbitter",
      "Halb und Halb",
    ],
    note: "Eine typische Bitterstoffdroge, die magenberuhigend und verdauungsfördernd wirkt. Wurde früher als Fiebermittel eingesetz.",
    img: "/src/assets/enzianwurzel.png",
  },
  {
    id: 2,
    name: "Angelikawurzel",
    type: "Wurzel",
    family: "Doldengewächse",
    origin: "Europa, China, Rußland",
    ingredients: [
      "1% etherisches Öl (Angelikaöl)",
      "Bitterstoffe",
      "Gerbstoffe",
      "bis 6% Harz",
      "Säuren (Baldriansäure, Angelikasäure)",
      "bis 24% Zucker",
      "Wachse",
    ],
    treatment: ["Extraktionsverfahren", "Destillation (wird feiner)"],
    use: ["Stonsdorfer", "Altbitter", "Boonekamp", "Alpenkräuter", "Angostura"],
    note: "Früher eines der wichtigsten Heilkräuter. Ein Magenmittel bei Koliken. Wirkt gegen Flatulenzen.",
    img: "/src/assets/angelikawurzel.png",
  },
  {
    id: 2,
    name: "Angelikawurzel",
    type: "Wurzel",
    family: "Doldengewächse",
    origin: "Europa, China, Rußland",
    ingredients: [
      "1% etherisches Öl (Angelikaöl)",
      "Bitterstoffe",
      "Gerbstoffe",
      "bis 6% Harz",
      "Säuren (Baldriansäure, Angelikasäure)",
      "bis 24% Zucker",
      "Wachse",
    ],
    treatment: ["Extraktionsverfahren", "Destillation (wird feiner)"],
    use: ["Stonsdorfer", "Altbitter", "Boonekamp", "Alpenkräuter", "Angostura"],
    note: "Früher eines der wichtigsten Heilkräuter. Ein Magenmittel bei Koliken. Wirkt gegen Flatulenzen.",
    img: "/src/assets/angelikawurzel.png",
  },
];

const DrugOverview = () => {
  // view is variable for the layout in DrugOverview
  const [view, setView] = createSignal();
  // viewOptions is the array with all possible options
  const viewOptions = ["tile", "small", "list"];

  // onMount checks if a viewOption is in local store
  // if no, set it to first option, if yes, set view to local store
  if (!localStorage.getItem("drugViewPreference")) {
    setView(viewOptions[0])
  } else {
    setView(localStorage.getItem("drugViewPreference"));
    console.debug("Get view from local store accomplished")
  }

  // remove and add css class to displayed component
  function setClass(remove, add) {
    let matches = document.getElementsByClassName("card");
    for (let i = 0; i < matches.length; i++) {
      matches[i].classList.remove(remove);
      matches.item(i).classList.add(add);
    }
  }

  // updates local store to view and run setClass
  // remove actual class (previous view()) and add new (new view())
  createEffect((prev) => {
    localStorage.setItem("drugViewPreference", `${view()}`);
    setClass(prev, view());
  });

  // on click function for button
  // set view to the next option from viewOption array
  function handleClick() {
    let index = viewOptions.indexOf(view());
    if (index < viewOptions.length - 1) {
      setView(viewOptions[index + 1]);
    } else {
      setView(viewOptions[0]);
    }
  }

  return (
    <>
      <div className="intro drug-intro">
        <div>
          <h1>Drogensammlung</h1>
          Eine Sammlung typischer und weniger typischer Drogen, die Verwendung
          in Spirituosen finden.
        </div>
        <div className="button-group">
          <button onClick={handleClick}>{view()}</button>
        </div>
      </div>
      <div id="drug-content" className="content">
        {view() != "list" ? (
          <For each={items}>{(drug) => <DrugCard {...drug} />}</For>
        ) : (
          <ul>
            <For each={items}>{(drug) => <li>{drug.name}</li>}</For>
          </ul>
        )}
      </div>
      <div className="toc"></div>
    </>
  );
};

export { DrugOverview };
