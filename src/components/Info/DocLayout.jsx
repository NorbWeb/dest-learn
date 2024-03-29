import { createEffect, createSignal, For, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { FullScreenImage } from "../Helper/FullScreenImage/FullScreenImage";

const DocLayout = (props) => {
  let item = props;
  const [openToc, setOpenToc] = createSignal(false);
  const [handleFullScreenImage, setHandleFullScreenImage] = createStore({
    open: false,
    src: "",
    alt: "",
    name: "",
  });

  let worker = {};
  for (let i = 0; i < item.headline.length; i++) {
    worker[item.headline[i].name] = {
      content: item.headline[i].content.filter((f) => f.type === "heading"),
    };
  }

  function listSplit(content) {
    let list = content.value.split("\n");
    let result = [];
    let target = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i].charAt(0) != ">") {
        result.push(list[i]);
      } else if (list[i].charAt(0) === ">" && list[i - 1].charAt(0) != ">") {
        target = i;
        result.push([list[i].split(">").join("")]);
      } else if (list[i].charAt(0) === ">" && list[i - 1].charAt(0) === ">") {
        result[result.length - 1].push(list[i].split(">").join(""));
      }
    }

    return (
      <For each={result}>
        {(item) => (
          <Switch>
            <Match when={typeof item === "string"}>
              <li>{item}</li>
            </Match>
            <Match when={typeof item === "object"}>
              <ul className="secondary-content-list">
                <For each={item}>{(sub) => <li>{sub}</li>}</For>
              </ul>
            </Match>
          </Switch>
        )}
      </For>
    );
  }

  function highlightText(content) {
    if (!content.includes("|")) {
      return <p>{content}</p>;
    } else {
      let text = content.split("");
      let OESwitch = 0;
      for (let i = 0; i < text.length; i++) {
        if (OESwitch === 0 && text[i] === "|") {
          text.splice(i, 1, "<strong class='highlight-text'>");
          OESwitch = 1;
        } else if (OESwitch === 1 && text[i] === "|") {
          text.splice(i, 1, "</strong>");
          OESwitch = 0;
        }
      }
      let result = text.join("");
      let element = document.createElement("p");
      element.innerHTML = result;

      return element;
    }
  }

  const introImages = {
    Destillation: {
      src: "/moonshine.jpg",
      alt: "Destillations Intro-Bild",
    },
  };
  createEffect(() => {});

  return (
    <>
      <div className="intro">
        <h1 className="intro-title">{item.title}</h1>
        <Show when={introImages[item.title]}>
          <img
            src={introImages[item.title].src}
            alt={introImages[item.title].alt}
            className="intro-img"
          />
        </Show>
        {item.description}
      </div>
      <div className="content">
        <FullScreenImage
          src={handleFullScreenImage.src}
          open={handleFullScreenImage.open}
          setOpen={setHandleFullScreenImage}
          name={handleFullScreenImage.name}
          alt={handleFullScreenImage.alt}
        />
        <For each={item.headline}>
          {(headline) => (
            <div className="headline-box" id={headline.name}>
              <h2 className="headline">{headline.name}</h2>
              <div className='divider headline-divider'></div>
              <div className="content-box">
                <For each={headline.content}>
                  {(content) => (
                    <Switch>
                      {/* >>>>>>>>>>>>>>>> text <<<<<<<<<<<<<<<< */}
                      <Match when={content.type === "text"}>
                        <div
                          className="text-box content-block"
                          style={{ overflow: "auto" }}
                        >
                          {/* <img src="/placeholder.svg" style={{float: 'right', 'margin-left': '2rem'}}/> */}
                          <For each={content.value.split("\n")}>
                            {(item) => highlightText(item)}
                          </For>
                        </div>
                      </Match>
                      {/* >>>>>>>>>>>>>>>> formula <<<<<<<<<<<<<<<< */}
                      <Match when={content.type === "formula"}>
                        <div className="code-box content-block">
                          <pre>
                            <code>{content.value}</code>
                          </pre>
                        </div>
                      </Match>
                      {/* >>>>>>>>>>>>>>>> img <<<<<<<<<<<<<<<< */}
                      <Match when={content.type === "img"}>
                        <div className="img-box content-block">
                          <img
                            alt={content.alt}
                            onClick={() =>
                              setHandleFullScreenImage({
                                open: true,
                                alt: content.alt,
                                name: content.name,
                                src: content.value,
                              })
                            }
                            src={content.value}
                          />
                        </div>
                      </Match>
                      {/* >>>>>>>>>>>>>>>> text-img <<<<<<<<<<<<<<<< */}
                      <Match when={content.type === "text-img"}>
                        <div className="text-img-box content-block">
                          <img
                            alt={content.alt ? content.alt : ""}
                            onClick={() =>
                              setHandleFullScreenImage({
                                open: true,
                                alt: content.alt,
                                name: content.name,
                                src: content.value,
                              })
                            }
                            src={content.value ? content.value : ""}
                          />
                          <For
                            each={content.text ? content.text.split("\n") : ""}
                          >
                            {(item) => highlightText(item)}
                          </For>
                        </div>
                      </Match>
                      {/* >>>>>>>>>>>>>>>> link <<<<<<<<<<<<<<<< */}
                      <Match when={content.type === "link"}>
                        <div className="external-link content-block">
                          <a href={content.value.split("|")[1]} target="_blank">
                            {content.value.split("|")[0]}
                          </a>
                        </div>
                      </Match>
                      {/* >>>>>>>>>>>>>>>> quote <<<<<<<<<<<<<<<< */}
                      <Match when={content.type === "quote"}>
                        <p className="block-quote content-block">
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
                      {/* >>>>>>>>>>>>>>>> list <<<<<<<<<<<<<<<< */}
                      <Match when={content.type === "list"}>
                        <ul className="primary-content-list content-block">
                          {listSplit(content)}
                        </ul>
                      </Match>
                      {/* >>>>>>>>>>>>>>>> heading <<<<<<<<<<<<<<<< */}
                      <Match when={content.type === "heading"}>
                        <h3
                          id={content.value}
                          className="heading content-block"
                        >
                          {content.value}
                        </h3>
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
        <button className="toc-btn" onClick={() => setOpenToc(!openToc())}>
          Auf dieser Seite
          <i
            classList={{
              "bi-caret-up": openToc(),
              "bi-caret-down": !openToc(),
            }}
          ></i>
        </button>
        <h3>Auf dieser Seite</h3>
        <div className="divider"></div>
        <nav id="table-of-contents" classList={{ show: openToc() }}>
          <ul className="main-list">
            <For each={item.headline}>
              {(item) => (
                <li>
                  <a href={`#${item.name}`}>{item.name}</a>
                  {worker[item.name].content.length > 0 ? (
                    <ul className="sub-list">
                      <For
                        each={item.content.filter((f) => f.type === "heading")}
                      >
                        {(content) => (
                          <li>
                            <a href={`#${content.value}`}>{content.value}</a>
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
