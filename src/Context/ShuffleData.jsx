import {
  createSignal,
  createContext,
  useContext,
  createEffect,
} from "solid-js";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../firebase";

const ShuffleDataContext = createContext();

export function ShuffleDataProvider(props) {
  const getDrugs = async () => {
    const querySnapshot = await getDocs(collection(db, "drugs"));
    setData(querySnapshot.docs.map((doc) => doc.data()));
  };

  createEffect(() => {
    getDrugs();
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
