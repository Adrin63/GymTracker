import { useEffect, useState } from "react";

function Register(){
    
    useEffect(() => {
        
    })

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const register = (e) => {
        e.preventdefault();
        console.log('submitea')

        
    }

    return (
        <div className="bg-slate-700">
            <button className="bg-orange-300 rounded-full flex items-center justify-center w-[50px] h-[50px] p-3">
                X
            </button>
            <div className=" w-full h-screen flex flex-col items-center justify-center">
                <form onSubmit={register} className=" text-center space-y-10">
                    <div>
                        <label style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }} className="block text-gray-200 text-sm font-bold mb-2" htmlFor="nombre">
                            Name
                        </label>
                        <input
                            onInput={(e) => setName(e.target.value)}
                            value={name}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Username" />
                    </div>
                    <div>
                        <label style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }} className="block text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            onInput={(e) => setPassword(e.target.value)}
                            value={password} className="shadow appearance-none border
                        rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="*****************************" />
                    </div>
                    <div>
                        <button className="font-bold bg-orange-400 rounded p-3 text-white" type="submit">
                            <h1 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>Crear Usuario</h1>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    
    )
}

export default Register;