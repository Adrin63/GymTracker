import { Link, Outlet, useNavigate } from "react-router-dom";
import Context from "../Context";
import { useEffect, useState } from "react";
import { API_URL } from '../config.js';


function App() {

    const [actualUser, setActualUser] = useState("");

    const redirect = useNavigate();

    useEffect(() => {
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }

        fetch(API_URL + '/actualUser', options)
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    redirect('/')
                    return;
                }

                setActualUser(data.userId)
                redirect('/home')
            })
            .catch(err => console.log("No hay usuario"));
    }, [])

    return (
        <>
            <Context.Provider value={{ actualUser, setActualUser }}>
                <Outlet />
            </Context.Provider>
        </>
    )
}

export default App;