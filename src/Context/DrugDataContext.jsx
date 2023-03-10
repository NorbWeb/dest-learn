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
  let categorieList = "";
  const getDrugs = async () => {
    const querySnapshot = await getDocs(collection(db, "drugs"));
    let data = querySnapshot.docs.map((doc) => doc.data());
    let id = querySnapshot.docs.map((doc) => doc.id);
    data.map((drug, index) => (drug.id = id[index]));
    data.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));

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
    categorieList = list;
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

    categorieList.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

    drugData.categories.sort((a, b) =>
      a.category > b.category ? 1 : b.category > a.category ? -1 : 0
    );

    // console.log(drugData, categorieList);
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
          if (!data()) {
            [];
          } else {
            return categorieList;
          }
        },

        drugById(item) {
          if (!data()) {
            [];
          } else {
            return data().allDrugs.filter((drug) => drug.id === item);
          }
        },

        reload() {
          getDrugs();
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
