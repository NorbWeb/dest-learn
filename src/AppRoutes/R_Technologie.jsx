import { Route } from "@solidjs/router";
import { Show } from "solid-js";
import { LoadingSpinner } from "../components/Helper/LoadingSpinner/LoadingSpinner";
import { DocLayout } from "../components/Info/DocLayout";
import { useContent } from "../Context/ContentContext";

const Routes = () => {
  const [data] = useContent();

  const Destillation = () => {
    return (
      <>
        <Show when={data()} fallback={<LoadingSpinner />}>
          <DocLayout {...data()[0]} />
        </Show>
      </>
    );
  };

  return (
    <>
      <Route path="destillation" component={Destillation} />
    </>
  );
};

export { Routes as Routes_Technologie };
