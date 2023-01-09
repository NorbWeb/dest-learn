import { createSignal, createContext, useContext } from "solid-js";

const AuthContext = createContext();

export function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = createSignal(props.loggedIn || false),
    store = [
      loggedIn,
      {
        logIn() {
          setLoggedIn(() => true);
          localStorage.setItem("userLoggedIn", "true");
        },

        logOut() {
          setLoggedIn(() => false);
          localStorage.removeItem("userLoggedIn");
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
