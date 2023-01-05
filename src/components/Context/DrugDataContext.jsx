import { createSignal, createContext, useContext } from "solid-js";

const DrugDataContext = createContext();

export function DrugDataProvider(props) {
  const fetchData = () => {
    fetch("../../drugdata.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        // console.log(response);
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        setData(data);
      });
  };

  const [data, setData] = createSignal(),
    store = [
      data,
      {
        getData(item) {
          setData(item);
        },

        getCategories(item) {
          item = data();
          const category = [];
          if (!data()) {
            [];
          } else {
            for (let i = 0; i < item.length; i++) {
              if (!category.includes(item[i].category)) {
                category.push(item[i].category);
              }
            }
            return category;
          }
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
