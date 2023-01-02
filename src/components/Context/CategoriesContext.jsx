import { createSignal, createContext, useContext } from "solid-js";

const CategoriesContext = createContext();

export function CategoriesProvider(props) {
  const [categories, setCategories] = createSignal(props.categories || []),
    store = [categories];

  return (
    <CategoriesContext.Provider value={store}>
      {props.children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
