import {
  createSignal,
  createContext,
  useContext,
  createEffect,
} from "solid-js";
const AuthContext = createContext();

export function AuthProvider(props) {
  createEffect(() => {
    // console.log(logedIn());
  });
  const [logedIn, setLogedIn] = createSignal(props.observer || false),
    store = [
      logedIn,
      {
        changeLogInState(item) {
          setLogedIn(() => item);
        },
      },
    ];

  return (
    <AuthContext.Provider value={store}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
