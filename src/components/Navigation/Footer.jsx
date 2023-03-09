import { A } from "@solidjs/router";
import "./Footer.scss";

const Footer = () => {
  return (
    <div id="footer-menu">
      <A href="/impressum">Impressum</A>
      <div className="icon-section">
          <ul className="icon-wrapper">
            <li>
              <a
                target="_blank"
                href="https://icons8.com/icon/74502/chemiefabrik-2"
              >
                Chemiefabrik 2
              </a>
            </li>
            <li>
              <a target="_blank" href="https://icons8.com/icon/20875/naturkost">
                Naturkost
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://icons8.com/icon/JP7aAaZkeAEs/rum"
              >
                Rum
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://icons8.com/icon/12780/taschenrechner"
              >
                Taschenrechner
              </a>
            </li>
            <li>
              <a
                target="_blank"
                href="https://icons8.com/icon/19733/whiskydestillation"
              >
                Whiskydestillation
              </a>
            </li>
          </ul>
        icons by{" "}
        <a target="_blank" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </div>
  );
};

export { Footer };
