import { onMount } from "solid-js";

const DocLayout = (props) => {
  let item = props;

  return (
    <>
      <div className="intro">
        <h1>{item.title}</h1>
        {item.description}
      </div>
      <br />
      <div className="content">
        <For each={item.headline}>
          {(headline) =>
            // ################ text ################ //
            headline.type.code === "text" ? (
              <div>
                <h2 className="headline" id={headline.name}>
                  {headline.name}
                </h2>
                <div>{headline.content}</div>
                <br />
              </div>
            ) : // ################ math ################ //

            headline.type.code === "math" ? (
              <div>
                <h2 className="headline" id={headline.name}>
                  {headline.name}
                </h2>
                <code>{headline.formula}</code>
                <div>{headline.content}</div>
                <br />
              </div>
            ) : null
          }
        </For>
      </div>
      <div className="toc">
        <h3>Auf dieser Seite</h3>
        <div className="divider"></div>
        <nav id="TableOfContents">
          <ul>
            <For each={item.headline}>
              {(item) => (
                <li>
                  <a href={`#${item.name}`}>{item.name}</a>
                </li>
              )}
            </For>
          </ul>
        </nav>
      </div>
    </>
  );
};

export { DocLayout };
