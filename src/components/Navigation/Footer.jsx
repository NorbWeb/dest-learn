import { A } from "@solidjs/router";
import "./Footer.scss";

const Footer = () => {
  return <div id="footer-menu">
    <nav>
        <A href="/impressum">Impressum</A>
    </nav>
  </div>;
};

export { Footer };
