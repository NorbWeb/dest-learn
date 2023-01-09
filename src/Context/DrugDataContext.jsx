import {
  createSignal,
  createContext,
  useContext,
  createEffect,
} from "solid-js";

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
        // console.log(data.drugs);
        setData(data.drugs);
      });
  };

  createEffect(() => {
    fetchData();
  });
  const [data, setData] = createSignal(),
    store = [
      data,
      {
        getRandom() {
          
          let random = [];
          if (!data()) {
            [];
          } else {
            let item = [...data()];
            random = item.sort(function (a, b) {
              return 0.5 - Math.random();
            });
            return random;
          }
        },

        getCategories() {
          let item = data();
          const category = [];
          if (!data()) {
            [];
          } else {
            for (let i = 0; i < item.length; i++) {
              if (!category.includes(item[i].category)) {
                category.push(item[i].category);
              }
            }
            return category.sort();
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
