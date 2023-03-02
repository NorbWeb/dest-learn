import "./About.scss";

const About = () => {
  return (
    <div id="about" className="container">
      <h1>Über Destillearn</h1>
      <div className="grid-container">
        <section id="about-the-project" className="grid-item">
          <h2>Die Motivation</h2>
          <p>
            Als Destillateur-Anfänger, war ich ein wenig verwundert darüber, wie
            alt alles ist, was mit Destillieren zu tun hat - fast schon
            traditionell! Es gibt wahnsinnig alte Bücher, deren vergilbte Seiten
            vorsichtig umgeblättert werden müssen, damit sie nicht ausversehen
            kaputt gehen. Manches Gerät, was noch immer verwendet wird, sieht
            abenteuerlich aus und ohne Erklärung, kann man seinen Zweck nicht
            erkennen. Ich war in eine myhstische, geheimnissvolle Welt geraten
            und ich hatte keine Ahnung was mich erwartet.
          </p>
          <p>
            Der Eindruck, in eine Fantasy Welt eingetaucht zu sein, wurde immer
            deutlicher. Was sich vielleicht spannend und abenteuerlich anhört,
            birgt auch Schattenseiten. Dieser Beruf - Destillateur - ist nahezu
            unbekannt! Was auf Partys eine Gesprächseröffnung erleichtert, ist
            in der Realität hinderlich. Zum einen gibt es nur eine sehr kleine
            Community, die nicht immer so gut vernetzt ist, wie es heutzutage
            möglich wäre. Zum anderen gibt es wenig Material zum Nachschlagen,
            wenn einmal Fragen auftauchen.
          </p>
          <p>
            Doch ich muss eine Lanze für diese, zwar kleine, aber feine
            Community brechen! Aus der Not heraus, bildete sich eine so
            unfassbar unterstützende Gemeinschaft, wie ich es noch nie zuvor
            erlebt habe. Hilfsbereit, ohne etwas dafür zu verlangen. Auf jede
            frage eine Antwort, und wenn man keine Antwort hat, wird jemand
            gesucht, der sie kennt.
          </p>
          <p>
            Es gibt dabei nur ein ungeschriebenes Gesetz:
            <span className="bold"> Gebe weiter, was dir gegeben wird! </span>
            Und so halte ich es auch seit dem. Diese Website ist mein Beitrag
            dazu, das Wissen was wir als Destillateure haben, jeden Menschen
            zugänglich zu machen. Es ist kein Geheimwissen oder verboten,
            sondern ein Handwerk, was nicht aussterben soll.
          </p>
          <p>
            Wissen sollte barrierefrei, einfach, verständlich und allen
            zugänglich sein. Ich bin nicht der Urheber dieses Wissens, noch
            alleine dafür verantwortlich, es zu teilen. Ich möchte eine
            Plattform schaffen, die vielleicht dazu beitragen kann, Menschen zu
            erreichen und zu informieren.
          </p>
        </section>
        <section id="about-me" className="grid-item">
          <h2>Über mich</h2>
          <img src="/placeholder.svg" alt="Bild von Norbert" />
          <p>Hi, ich bin Norbert!</p>
          <ul>
            <li>
              2014 - Ausbildung zum Destillateur bei der{" "}
              <a href="https://www.august-ernst.de/" target="_blank">
                August Ernst Gmbh
              </a>
            </li>
            <li>
              2017 - Arbeit als Destillateur und Qualitätsmanagementbeauftragter
              ebenda
            </li>
            <li>
              2018 - Wechsel zur{" "}
              <a href="https://d-s-m.com/" target="_blank">
                Deutschen Spirituosen Manufaktur
              </a>
              , Aufbau der Produktion und destillieren, destillieren...
            </li>
            <li>
              ab 2022 -{" "}
              <a href="https://norbert-madauss.com" target="_blank">
                Webentwickler 😎
              </a>
            </li>
            <li>
              ab Okt 2022 - Fullstack Webentwickler bei{" "}
              <a href="https://www.delphi-imm.de/" target="_blank">
                Delphi IMM
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export { About };
