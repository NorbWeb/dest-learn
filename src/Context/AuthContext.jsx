import { getAuth } from "firebase/auth";
import { createSignal, createContext, useContext, createEffect } from "solid-js";
const AuthContext = createContext();

export function AuthProvider(props) {


createEffect(()=>{
  const auth = getAuth();
  if(auth){
    console.log(auth.name)
  }
})




  const [loggedIn, setLoggedIn] = createSignal(props.loggedIn || false),
    store = [
      loggedIn,
      {
        logIn() {
          setLoggedIn(() => true);
        },

        logOut() {
          setLoggedIn(() => false);
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
