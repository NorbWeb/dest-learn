import {
  createSignal,
  createContext,
  useContext,
  createEffect,
} from "solid-js";

const ShuffleDataContext = createContext();

export function ShuffleDataProvider(props) {
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
            setData(random);
          }
        },
      },
    ];

  return (
    <ShuffleDataContext.Provider value={store}>
      {props.children}
    </ShuffleDataContext.Provider>
  );
}

export function useShuffleData() {
  return useContext(ShuffleDataContext);
}
