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
  const [view, setView] = createSignal("Tile");
  let matches = document.getElementsByClassName("card");
  let drugViewPreference = "";
  if(!localStorage.getItem('drugViewPreference')) {
    drugViewPreference = view();
  } else {
    drugViewPreference = localStorage.getItem('drugViewPreference')
  }

  createEffect(() => {
    localStorage.setItem("drugViewPreference",`${view()}`)
    console.log(view(), drugViewPreference)
  });

  function handleClick() {
    if (view() === "Tile") {
      setView(() => "Small");
      for (let i = 0; i < matches.length; i++) {
        matches[i].classList.remove("tile");
        matches.item(i).classList.add("small");
      }
    } else if (view() === "Small") {
      setView(() => "List");
      for (let i = 0; i < matches.length; i++) {
        matches[i].classList.remove("small");
        matches.item(i).classList.add("list");
      }
    } else if (view() === "List") {
      setView(() => "Tile");
      for (let i = 0; i < matches.length; i++) {
        matches[i].classList.remove("list");
        matches.item(i).classList.add("tile");
      }
    }drugViewPreference = localStorage.getItem('drugViewPreference')
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
        {view() != "List" ? (
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
