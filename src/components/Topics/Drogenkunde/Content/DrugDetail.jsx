import "./DrugCard.scss";
import Enzian from "../../../../assets/enzianwurzel.png";

const DrugDetail = () => {
    const data = {
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
        note: "Eine typische Bitterstoffdroge, die magenberuhigend und verdauungsfördernd wirkt. Wurde früher als Fiebermittel eingesetz",
    };

    return (
        <>
            <div className="card">
                <img src={Enzian} alt="Enzianwurzel" />
                <div className="profile">
                    <div className="card-title">{data.name}</div>
                    <p>{data.note}</p>
                    <p>
                        <span className="bold">Art: </span>
                        {data.type}
                    </p>
                    <p>
                        <span className="bold">Familie: </span>
                        {data.family}
                    </p>
                    <p>
                        <span className="bold">Herkunft: </span>
                        {data.origin}
                    </p>
                    <div className="list-box">
                        <label htmlFor="list-ingredients">
                            <span className="bold">Inhaltsstoffe: </span>
                        </label>
                        <ul name="list-ingredients">
                            <For each={data.ingredients}>
                                {(ingredient) => <li>{ingredient}</li>}
                            </For>
                        </ul>
                    </div>
                    <p>
                        <span className="bold">Verarbeitung: </span>
                        {data.treatment}
                    </p>
                    <div className="list-box">
                        <label htmlFor="list-use">
                            <span className="bold">Verwendung: </span>
                        </label>
                        <ul name="list-use">
                            <For each={data.use}>{(use) => <li>{use}</li>}</For>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export { DrugDetail };
