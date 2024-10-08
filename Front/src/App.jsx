import { Link, Outlet } from "react-router-dom";
import Context from "./Context";
import { useState } from "react";

function App(){

    const [actualUser, setActualUser] = useState("");

    return (
        <>
            <Context.Provider value={{actualUser, setActualUser}}>
                <Outlet/>
            </Context.Provider>
        </>
    )
}

export default App;