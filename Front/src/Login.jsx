import { useEffect, useState } from "react";

function Login(){

    const [msg, setMsg] = useState("vacio");

    useEffect(() => {

        fetch('http://localhost:3006/api/users')
        .then(a => a.json())
        .then(a => setMsg(a))
        .catch(err => console.log());
    }, [])

    return (
        <>
        <h1>{msg}</h1>
        </>
    )
}

export default Login;