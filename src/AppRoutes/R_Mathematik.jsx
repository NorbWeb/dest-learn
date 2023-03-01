import { Route } from "@solidjs/router";
import { Show } from "solid-js";
import { LoadingSpinner } from "../components/Helper/LoadingSpinner/LoadingSpinner";
import { DocLayout } from "../components/Info/DocLayout";
import { useContent } from "../Context/ContentContext";

const Routes = () => {
  const [data, { getArticle }] = useContent();

  const Einheiten = () => {
    return (
      <>
        <Show when={data().mathematik} fallback={<LoadingSpinner />}>
          <DocLayout {...getArticle("mathematik", "Einheiten")} />
        </Show>
      </>
    );
  };

  return (
    <>
      <Route path="einheiten" component={Einheiten} />
    </>
  );
};

export { Routes as Routes_Mathematik };
