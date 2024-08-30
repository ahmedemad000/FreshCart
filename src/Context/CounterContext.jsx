import { createContext } from "react";
import { useState } from "react";

// The reason of making counter context to have the token (data) and start to share it only with allowed components like specific componenets

export const CounterContext = createContext();


 export default function CounterContextProvider(props){
    const [counter, setCounter] = useState(0)
    function changeCounter() {
        setCounter(Math.random)
    }
    return <CounterContext.Provider value={{counter, changeCounter}}>
        {/* any one located in this place will be allowed to see the value  */}
        {props.children}
    </CounterContext.Provider>
}