import "./DrugCard.scss";
import Enzian from "../../../../assets/enzianwurzel.png";

const DrugCard = () => {
    const items = [{
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
        use: [
            "Stonsdorfer",
            "Altbitter",
            "Boonekamp",
            "Alpenkräuter",
            "Angostura",
        ],
        note: "Früher eines der wichtigsten Heilkräuter. Ein Magenmittel bei Koliken. Wirkt gegen Flatulenzen.",
        img: "/src/assets/angelikawurzel.png",

    }];

    function handleClick() {
        alert(`###### TODO ######\nZur Detailansicht ${data.name} navigieren.`)
    }

    const data = { ...items[0] }

    return (
        <>
            <div onClick={handleClick} className="card">
                <img src={data.img} alt={data.name} />
                <div className="card-body">
                    <h4 className="card-title">{data.name}</h4>
                    <p>{data.note}</p>
                </div>
            </div>
        </>
    );
};

export { DrugCard };
