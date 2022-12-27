import { A } from "@solidjs/router";
import { createSignal } from "solid-js";

const Verordnung = () => {
  const [navItem, setNavItem] = createSignal(["Headline 1", "Headline 2"]);
  return (
    <>
      <div className="intro">
        <h1>Verordnung</h1>Die <a className="no-style" href="http://data.europa.eu/eli/reg/2019/787" target="_blank">aktuelle
        Spirituosenverordnung</a> der EU.
      </div>
      <br />
      <div className="content">
        <h2 className="headline" id={navItem()[0]}>
        {navItem()[0]}
        </h2>
        <p>
          dictumst vestibulum rhoncus est pellentesque elit ullamcorper
          dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu
          dictum varius duis at consectetur lorem donec massa sapien faucibus et
          molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed
          ullamcorper morbi tincidunt ornare massa eget egestas purus viverra
          accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut
          lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem
          dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida
          neque convallis a cras semper auctor neque vitae tempus quam
          pellentesque nec nam aliquam sem et tortor consequat id
        </p>
        <h2 className="headline" id={navItem()[1]}>
        {navItem()[1]}
        </h2>
        <p>
          dictumst vestibulum rhoncus est pellentesque elit ullamcorper
          dignissim cras tincidunt lobortis feugiat vivamus at augue eget arcu
          dictum varius duis at consectetur lorem donec massa sapien faucibus et
          molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed
          ullamcorper morbi tincidunt ornare massa eget egestas purus viverra
          accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu augue ut
          lectus arcu bibendum at varius vel pharetra vel turpis nunc eget lorem
          dolor sed viverra ipsum nunc aliquet bibendum enim facilisis gravida
          neque convallis a cras semper auctor neque vitae tempus quam
          pellentesque nec nam aliquam sem et tortor consequat id
        </p>
      </div>
      <div className="toc">
        <h3>Auf dieser Seite</h3>
        <div className="divider"></div>
        <nav id="TableOfContents">
          <ul>
            <For each={navItem()}>
              {(item) => (
                <li>
                  <A href={`#${item}`}>{item}</A>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </div>
    </>
  );
};

export { Verordnung };
