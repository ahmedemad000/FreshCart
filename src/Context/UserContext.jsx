import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

// The reason of making counter context to have the token (data) and start to share it only with allowed components like specific componenets

export const UserContext = createContext();

// (token) to Navbar we will send this token to navbar if its null register button will be displayed on navbar if there is token it will be not there

//(setToken) will go to login and register
export default function UserContextProvider(props) {
  const [token, setToken] = useState(localStorage.getItem('token')); //it will get token from local storage
  //prevent logout once we refresh so we make useEffect using localstorage
  useEffect(() => {
  token ?
  localStorage.setItem("token", token) :
  localStorage.removeItem("token");
  }, [token])
  return (
    <UserContext.Provider value={{ token, setToken }}>
      {/* any one located in this place will be allowed to see the value  */}
      {props.children}
    </UserContext.Provider>
  );
}
