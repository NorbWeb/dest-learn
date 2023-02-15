import {
  createSignal,
  createContext,
  useContext,
  createEffect,
} from "solid-js";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../firebase";

const DrugDataContext = createContext();

export function DrugDataProvider(props) {
  const getDrugs = async () => {
    const querySnapshot = await getDocs(collection(db, "drugs"));
    let data = querySnapshot.docs.map((doc) => doc.data());
    let id = querySnapshot.docs.map((doc) => doc.id);
    data.map((drug, index) => (drug.id = id[index]));

    let drugData = {
      allDrugs: data,
      categories: [],
    };

    let list = [];
    for (let i = 0; i < data.length; i++) {
      if (!list.includes(data[i].category)) {
        list.push(data[i].category);
      }
    }
    for (let i = 0; i < list.length; i++) {
      let obj = {};
      obj.category = list[i];
      obj.drugList = [];
      for (let j = 0; j < data.length; j++) {
        if (data[j].category === list[i]) {
          obj.drugList.push(data[j]);
        }
      }
      drugData.categories.push(obj);
    }

    // console.log(drugData);
    setData(drugData);
  };
  //   const fetchData = () => {
  //     fetch("../../drugdata.json", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     })
  //       .then(function (response) {
  //         // console.log(response);
  //         return response.json();
  //       })
  //       .then(function (data) {
  //         // console.log(data.drugs);
  //         setData(data.drugs);
  //       });
  //   };

  // createEffect(() => {
  //   fetchData();
  // });
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

        drugById(item) {
          if (!data()) {
            [];
          } else {
            return data().allDrugs.filter((drug) => drug.id === item);
          }
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
