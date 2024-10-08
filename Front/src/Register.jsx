import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "./Context";

function Register(){
    
    const {setActualUser} = useContext(Context);
    const redirect = useNavigate();

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        fetch('/db.json')
        .then(resp => resp.json())
        .then(data => {
            setAllUsers(data);
        })
        .catch(err => console.log(err))
    }, []);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [status, setStatus] = useState("");

    const register = (e) => {
        e.preventDefault();

        if (name.trim() === "") {
            setStatus("Falta el nombre");
            return;
        }
        if (password.trim() === "") {
            setStatus("Falta la contraseña");
            return;
        }

        const userFound = allUsers.find(data => data.name.toLowerCase() === name)

        console.log(userFound)

        if(userFound == null){

            redirect('/')
        }
        else{
            setStatus("Este usuario ya existe");
        }
    }

    return (
        <div className="bg-slate-700">
            <Link to='/'>
                <button className="bg-orange-400 rounded-full flex items-center justify-center w-[50px] h-[50px] p-3 absolute top-5 left-5 text-white">
                   <h1 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>X</h1>
                </button>
            </Link>
            <div className=" w-full h-screen flex flex-col items-center justify-center">
                <h1 className="text-white font-bold italic text-2xl p-3">
                    Crear Usuario
                </h1>
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
                    <h1 className="text-red-600 p-4 mt-3">{status || '\u00A0'}</h1>
            </div>
        </div>
    
    )
}

export default Register;