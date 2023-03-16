import { Route } from "@solidjs/router";
import { For, Match, Show, Switch } from "solid-js";
import { LoadingSpinner } from "../components/Helper/LoadingSpinner/LoadingSpinner";
import { DocLayout } from "../components/Info/DocLayout";
import { item } from "../components/Sidebar/Sidebar";
import { useContent } from "../Context/ContentContext";

const Routes = () => {
  const [data, { getArticle }] = useContent();
  let navData = item().filter((f) => f.name === "Mathematik")[0];

  const Components = (props) => {
    return (
      <Switch>
        <Match when={props.item}>
          <Show when={data().mathematik} fallback={<LoadingSpinner />}>
            <DocLayout {...getArticle("mathematik", props.item.label)} />
          </Show>
        </Match>
      </Switch>
    );
  };

  return (
    <>
      <For each={navData.navItems}>
        {(item) => (
          <Route path={item.path} component={<Components item={item} />} />
        )}
      </For>
    </>
  );
};

export { Routes as Routes_Mathematik };
