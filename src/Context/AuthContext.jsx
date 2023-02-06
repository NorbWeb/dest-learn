import { onAuthStateChanged } from "firebase/auth";
import {
  createSignal,
  createContext,
  useContext,
  createEffect,
} from "solid-js";
import { auth } from "../firebase";
const AuthContext = createContext();

export function UserProvider(props) {
  const monitorAuthState = async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        sessionStorage.setItem("logedInUser", user.refreshToken);
      } else {
        sessionStorage.removeItem("logedInUser");
        setUser(false);
      }
    });
  };

  monitorAuthState();

  createEffect(() => {});

  const [user, setUser] = createSignal(false),
    store = [user];

  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
