import { createSignal, createContext, useContext } from "solid-js";
const AuthContext = createContext();

export function AuthProvider(props) {
  const [logedIn, setLogedIn] = createSignal(props.observer || false),
    store = [
      logedIn,
      {
        toggleLogInState() {
          setLogedIn(() => !logedIn());
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
