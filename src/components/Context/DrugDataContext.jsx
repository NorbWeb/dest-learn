import { createSignal, createContext, useContext } from "solid-js";

const DrugDataContext = createContext();

export function DrugDataProvider(props) {
  const [data, setData] = createSignal(props.data || []),
    store = [
      data,
      {
        getCategories(item) {
          item = data();
          const category = [];
          for (let i = 0; i < item.length; i++) {
            if (!category.includes(item[i].category)) {
              category.push(item[i].category);
            }
          }
          return category;
        },

        addNewDrug(item) {
          setData([...data(), item]);
        },
      },
    ];

  return (
    <DrugDataContext.Provider value={store}>
      {props.children}
    </DrugDataContext.Provider>
  );
}

export function useDrugData() {
  return useContext(DrugDataContext);
}
