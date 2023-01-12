import "./About.scss";

const About = () => {
  return (
    <div id="about" className="container">
      <section id="about-me">
        <h1>Über mich</h1>
        <div className="wrapper aligne-center">
          <div>
            <p>Hi, ich bin Norbert!</p>
            <p>
              Als Destillateur-Anfänger, war ich schockiert darüber, wie alt und
              wie schlecht die Arbeitsmaterialien sind, mit denen wir lernen
              sollten. Später, als Ausbilder, machte ich die Erfahrung, dass
              sich daran nichts geändert hatte. Meine Azubis berichteten mir
              über wechselnde Lehrer*innen und Probleme im Verständnis.
            </p>
            <p>
              Das dieser Beruf so Stiefmütterlich behandelt wird, liegt meiner
              Ansicht nach daran, dass es niemanden so richtig interessiert -
              denn wir sind klein. Alleine in der Stadt Dortmund gibt es mehr
              Bäcker, als Brennereien in ganz Deutschland.
            </p>
            <p>
              Also müssen wir uns selber helfen, das haben wir immer schon
              getan. Und schon damals, 2014, entschloss ich mich, etwas zu tun.
              Aber <span>was</span> kann ich machen? Nun, ich kann meine
              Programmierkenntnisse dazu nutzen, das vorhandenen Wissen zu
              Sammeln, aufzubereiten und ins 21. Jhd. zu befördern. Wissen
              sollte barrierefrei, einfach, verständlich und allen zugänglich
              sein. Ich hoffe hier mit einen Beitrag leisten zu können, dass
              dieser Beruf nicht in Vergessenheit gerät.
            </p>
          </div>
          <img src="/placeholder.svg" alt="Bild von Norbert" />
        </div>
      </section>
    </div>
  );
};

export { About };
