import { Match, Switch } from "solid-js";

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
          {(headline) => (
            <div className="headline-box">
              <h2 className="headline" id={headline.name}>
                {headline.name}
              </h2>
              <For each={headline.content}>
                {(content) => (
                  <Switch>
                    <Match when={content.type === "text"}>
                      <div className="text-box">{content.value}</div>
                      <br />
                    </Match>
                    <Match when={content.type === "formula"}>
                      <pre className="code-box">
                        <code>{content.value}</code>
                      </pre>
                      <br />
                    </Match>
                    <Match when={content.type === "img"}>
                      <div className="img-box">
                        <img src={content.value} />
                      </div>
                    </Match>
                    <Match when={content.type === "link"}>
                      <a
                        className="external-link"
                        href={content.value.split("|")[1]}
                        target="_blank"
                      >
                        {content.value.split("|")[0]}
                      </a>
                    </Match>
                    <Match when={content.type === "quote"}>
                      <div className="block-quote">
                        <span className="bold">
                          {content.value.includes("|")
                            ? content.value.split("|")[0]
                            : ""}
                        </span>
                        {content.value.includes("|")
                          ? content.value.split("|")[1]
                          : content.value}
                      </div>
                      <br />
                    </Match>
                  </Switch>
                )}
              </For>
            </div>
          )}
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

{
  /* content.value === "text" ? (
                    <div>{headline.content}</div>
                    <br />

                content.value === "formula" ? (
                  <div>
                    <h2 className="headline" id={headline.name}>
                      {headline.name}
                    </h2>
                    <code>{headline.formula}</code>
                    <div>{headline.content}</div>
                    <br /> */
}
