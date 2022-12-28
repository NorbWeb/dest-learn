import './DrugCard.scss';
import Enzian from '../../../../assets/enzianwurzel.png'

const DrugCard = () => {


    const data = {
        id: 1,
        name: "Enzianwurzel",
        type: "Wurzel",
        family: "Enziangewächse",
        origin: "Hochgebirge Europas",
        ingredients: ["bis 30% Gentianose (vergä. Dreifachzucker)", "Gentin (gelber Farbstoff)", "Gentiopikrin (Bitterstoff)", "Amarogentin (Bitterstoff)", "Pektine", "6% fettes Öl"],
        treatment: "Extraktionsverfahren",
        use: ["Alpenkräuter", "Abteilikör", "Boonekamp", "Feinbitter", "Halb und Halb"],
        note: ["früher Fiebermittel", "magenberuhigend", "verdauungsfördernd", "typische Bitterstoffdroge"]
    }

    return (
        <>
            <div className="card-body">
                <div className="card-title">{data.name}</div>
                <div className="card-image"><img src={Enzian} alt="Enzianwurzel" /></div>
                <div className="profile">
                    <p>Art: {data.type}</p>
                    <p>{data.family}</p>
                    <p>{data.origin}</p>

                    <ul>
                        <For each={data.ingredients}>
                            {(ingredient) => (
                                <li>{ingredient}</li>
                            )}
                        </For>
                    </ul>

                    <p>{data.treatment}</p>

                    <ul>
                        <For each={data.use}>
                            {(use) => (
                                <li>{use}</li>
                            )}
                        </For>
                    </ul>


                    <ul>
                        <For each={data.note}>
                            {(note) => (
                                <li>{note}</li>
                            )}
                        </For>
                    </ul>

                </div>
            </div>
        </>
    )
};

export { DrugCard };
