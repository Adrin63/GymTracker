import { Link, Outlet } from "react-router-dom";
import Context from "./Context";
import { useState } from "react";
import { API_URL } from "./config";

function Landing(){
    
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        
        e.preventDefault();

        console.log('Intenta log', name," ", password);

        const values = {
            name: name,
            password: password
        }

        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(values)
        }

        
        fetch(API_URL+'/login', options)
        .then(resp => resp.json())
        .then(data => {        
            if (!data.error){
            setActualUser(data.name)
            redirect('/home')
        }
        })
        .catch(err => console.log(err))
    }


    return (
        <div className="bg-slate-700 w-full h-screen flex flex-col items-center justify-center space-y-5">
            <img src="/GymTracker.png" className="w-1/2 mb-3"/>
            <form onSubmit={login} className="space-y-4 flex flex-col items-center justify-center">
                <div>
                    <input
                        onInput={(e) => setName(e.target.value)}
                        value={name}
                        className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Username" />
                </div>
                <div>
                    <input
                        onInput={(e) => setPassword(e.target.value)}
                        value={password} className="shadow appearance-none border
                    rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="*****************************" />
                </div>
            <button className="font-bold bg-orange-400 w-1/2 text-center rounded p-2 text-white" type="submit">
                <h1 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>LOGIN</h1>
            </button>
            </form>
            <div className="flex flex-row w-screen items-center justify-center">
                <hr className="w-1/3 h-0.5 my-4 bg-white border-0 rounded"/>
                <h3 className="text-white p-3">OR</h3>
                <hr className="w-1/3 h-0.5 my-4 bg-white border-0 rounded"/>
            </div>

                <Link to='/register' className="text-orange-300">REGISTER</Link>
        </div>
    )
}

export default Landing;