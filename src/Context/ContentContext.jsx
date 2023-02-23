import {
  createSignal,
  createContext,
  useContext,
  createEffect,
} from "solid-js";
import { getDocs, collection } from "firebase/firestore/lite";
import { db } from "../firebase";

const ContentContext = createContext();

export function ContentProvider(props) {
  const getContent = async () => {
    const getTechnologie = await getDocs(collection(db, "technologie"));
    let techData = getTechnologie.docs.map((doc) => doc.data());
    let techId = getTechnologie.docs.map((doc) => doc.id);
    techData.map((data, index) => (data.id = techId[index]));

    const getMathematik = await getDocs(collection(db, "mathematik"));
    let mathData = getMathematik.docs.map((doc) => doc.data());
    let mathId = getMathematik.docs.map((doc) => doc.id);
    mathData.map((data, index) => (data.id = mathId[index]));

    const getSpirituosen = await getDocs(collection(db, "spirituosen"));
    let spirtData = getSpirituosen.docs.map((doc) => doc.data());
    let spiritId = getSpirituosen.docs.map((doc) => doc.id);
    spirtData.map((data, index) => (data.id = spiritId[index]));

    setData({
      technologie: techData,
      mathematik: mathData,
      spirituosen: spirtData,
    });
  };

  createEffect(() => {
    getContent();
  });

  const [data, setData] = createSignal({
      technologie: false,
      mathematik: false,
      spirituosen: false,
    }),
    store = [
      data,
      {
        getArticle(topic, article) {
          if (data()) {
            let request = data()[topic].filter((f) => f.title === article);
            return request[0];
          }
        },
      },
    ];

  return (
    <ContentContext.Provider value={store}>
      {props.children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
