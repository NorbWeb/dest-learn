import { Match, Switch } from "solid-js";

const DocLayout = (props) => {
  let item = props;

  return (
    <>
      <div className="intro">
        <h1>{item.title}</h1>
        {item.description}
      </div>
      <div className="content">
        <For each={item.headline}>
          {(headline) => (
            <div className="headline-box">
              <h2 className="headline" id={headline.name}>
                {headline.name}
              </h2>
              <div className="content-box">
                <For each={headline.content}>
                  {(content) => (
                    <Switch>
                      <Match when={content.type === "text"}>
                        <div className="text-box">{content.value}</div>
                      </Match>
                      <Match when={content.type === "formula"}>
                        <div className="code-box">
                          <pre >
                            <code>{content.value}</code>
                          </pre>
                        </div>
                      </Match>
                      <Match when={content.type === "img"}>
                        <div className="img-box">
                          <img src={content.value} />
                        </div>
                      </Match>
                      <Match when={content.type === "link"}>
                        <div className="external-link">
                          <a href={content.value.split("|")[1]} target="_blank">
                            {content.value.split("|")[0]}
                          </a>
                        </div>
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
                      </Match>
                    </Switch>
                  )}
                </For>
              </div>
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