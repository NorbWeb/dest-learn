import "./Impressum.scss";

const Impressum = () => {
  return (
    <div id="impressum" className="container">
      <div>
        <h4>Anschrift:</h4>
        <p>Name</p>
        <p>Straße</p>
        <p>Plz Stadt</p>
      </div>
      <div>
        <h4>Telefon:</h4>
        <p>Nummer</p>
      </div>
      <div>
        <h4>E-Mail:</h4>
        <p>
          <a href="mailto:destillearn@gmail.com"> destillearn@gmail.com</a>
        </p>
      </div>
      <div>
        <h4>Haftungshinweise:</h4>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
          für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
          sind ausschließlich deren Betreiber verantwortlich. Sämtliche
          angebotenen Informationen dürfen – auch auszugsweise – nur mit
          schriftlicher Genehmigung von Destillearn weiterverbreitet oder
          anderweitig veröffentlicht werden. Keinesfalls ist es gestattet, die
          abgerufenen Informationen online oder in anderen Medien
          weiterzuverbreiten oder kommerziell zu nutzen, insofern keine
          Absprache mit Destillearn getroffen wurde!
        </p>
      </div>
      <div>
        <h4>Technische Gesamtrealisation:</h4>
        <p>Name</p>
        <p>Straße</p>
        <p>Plz Stadt</p>
      </div>
      <div>
        <h4>Verantwortlich für den Inhalt gemäß § 18 Abs. 2 MStV:</h4>
        <p>Name</p>
        <p>Straße</p>
        <p>Plz Stadt</p>
      </div>
    </div>
  );
};

export { Impressum };
