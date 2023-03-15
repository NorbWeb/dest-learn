import { Route } from "@solidjs/router";
import { Show } from "solid-js";
import { LoadingSpinner } from "../components/Helper/LoadingSpinner/LoadingSpinner";
import { DocLayout } from "../components/Info/DocLayout";
import { useContent } from "../Context/ContentContext";

const Routes = () => {
  const [data, { getArticle }] = useContent();

  const Kategorien = () => {
    return (
      <>
        <Show when={data().spirituosen} fallback={<LoadingSpinner />}>
          <DocLayout {...getArticle("spirituosen", "Kategorien")} />
        </Show>
      </>
    );
  };


  const Verordnung = () => {
    return (
      <>
        <Show when={data().spirituosen} fallback={<LoadingSpinner />}>
          <DocLayout {...getArticle("spirituosen", "Rechtliches")} />
        </Show>
      </>
    );
  };

  return (
    <>
      <Route path="kategorien" component={Kategorien} />
      <Route path="rechtliches" component={Verordnung} />
    </>
  );
};

export { Routes as Routes_Spirituosen };
