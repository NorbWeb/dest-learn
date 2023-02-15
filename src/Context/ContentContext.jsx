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
    const querySnapshot = await getDocs(collection(db, "technologie"));
    setData(querySnapshot.docs.map((doc) => doc.data()));
  };

  createEffect(() => {
    getContent();
  });

  const [data, setData] = createSignal(),
    store = [data];

  return (
    <ContentContext.Provider value={store}>
      {props.children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
