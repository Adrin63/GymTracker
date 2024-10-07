import { Link, Outlet } from "react-router-dom";
import Context from "./Context";
import { useState } from "react";

function Landing(){

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const register = (e) => {
        e.preventdefault();
        console.log('submitea')
    }
    
    return (
        <div className="bg-slate-700 w-full h-screen flex flex-col items-center justify-center space-y-5">
            <img src="/GymTracker.png" className="w-1/2 mb-3"/>
            <form onSubmit={register} className="space-y-4">
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
            </form>
            <Link className="font-bold bg-orange-400 w-1/2 text-center rounded p-2 text-white" to="/login">
                <h1 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>LOGIN</h1>
            </Link>
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