import { createEffect, For, Match, Switch } from "solid-js";

const DocLayout = (props) => {
  let item = props;

  let worker = {};
  for (let i = 0; i < item.headline.length; i++) {
    worker[item.headline[i].name] = {
      content: item.headline[i].content.filter(
        (f) => f.type === "text" && f.value.includes("|")
      ),
    };
  }

  createEffect(() => {
    // console.log(item.headline);
    // console.log(worker);
  });

  return (
    <>
      <div className="intro">
        <h1>{item.title}</h1>
        {item.description}
      </div>
      <div className="content">
        <For each={item.headline}>
          {(headline) => (
            <div className="headline-box" id={headline.name}>
              <h2 className="headline">{headline.name}</h2>
              <div className="content-box">
                <For each={headline.content}>
                  {(content) => (
                    <Switch>
                      <Match when={content.type === "text"}>
                        <div className="text-box">
                          {content.value.includes("|") ? (
                            <h4 id={content.value.split("|")[0]}>
                              {content.value.split("|")[0]}
                            </h4>
                          ) : null}
                          {content.value.includes("|")
                            ? content.value.split("|")[1]
                            : content.value}
                        </div>
                      </Match>
                      <Match when={content.type === "formula"}>
                        <div className="code-box">
                          <pre>
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
                        <p className="block-quote">
                          {content.value.includes("|") ? (
                            <span className="bold">
                              {content.value.split("|")[0]}
                            </span>
                          ) : null}
                          {content.value.includes("|")
                            ? content.value.split("|")[1]
                            : content.value}
                        </p>
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
          <ul className="main-list">
            <For each={item.headline}>
              {(item) => (
                <li>
                  <a href={`#${item.name}`}>{item.name}</a>
                  {worker[item.name].content.length > 0 ? (
                    <ul className="sub-list">
                      <For
                        each={item.content.filter(
                          (f) => f.type === "text" && f.value.includes("|")
                        )}
                      >
                        {(content) => (
                          <li>
                            <a href={`#${content.value.split("|")[0]}`}>
                              {content.value.split("|")[0]}
                            </a>
                          </li>
                        )}
                      </For>
                    </ul>
                  ) : null}
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
