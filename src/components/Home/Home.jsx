import "./Home.scss";
const Home = () => {
  return (
    <div id="home" className="container">
      <div className="welcome-banner">
        <h1>Destillearn</h1>
        <h4>Die Seite rund ums Lernen für Profi- und Hobbydestillateure.</h4>
      </div>
      <div className="info-message">
        <h4>### Hinweis ###</h4>
        Diese Seite befindet sich noch im Aufbau! Es können Einschränkungen in der
        Bedienung auftreten und Inhalte können einen geringen oder unvollständigen
        Umfang aufweisen.
      </div>
      <div className="help-us">
        <p>
          Du willst Teil von Destillearn werden und mit uns zusammen Großes
          schaffen? Dann{" "}
          <a href="mailto:destillearn@gmail.com">melde dich bei uns!</a>{" "}
        </p>
      </div>
    </div>
  );
};

export { Home };
