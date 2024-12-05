import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../Context";
import { API_URL } from "../../config";
import Header from "../../components/Header";

function Register() {

    const { setActualUser } = useContext(Context);
    const redirect = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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

        if (password != confirmPassword) {
            setStatus("Las dos contraseñas no coinciden");
            return;
        }

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

        fetch(API_URL + "/register", options)
            .then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    setStatus("Este usuario ya existe");
                    return;
                }

                console.log('Register:', data)
                setActualUser(data);
                redirect('/home');
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <Header title='Crear Usuario' route='/'/>

            <div className="bg-slate-700">
                <div className=" w-full h-screen flex flex-col items-center justify-center">
                    <form onSubmit={register} className=" text-center space-y-4">
                        <div>
                            <input
                                onInput={(e) => setName(e.target.value)}
                                value={name}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" />
                        </div>
                        <div>
                            <input
                                onInput={(e) => setPassword(e.target.value)}
                                value={password} className="shadow appearance-none border
                            rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Contraseña" />
                        </div>
                        <div>
                            <input
                                onInput={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword} className="shadow appearance-none border
                            rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Confirmar Contraseña" />
                        </div>
                        <div>
                            <button className="font-bold bg-orange-400 rounded w-1/2 p-2 text-white" type="submit">
                                <h1 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>CREAR</h1>
                            </button>
                        </div>
                    </form>
                    <h1 className="text-red-600 p-4 mt-3">{status || '\u00A0'}</h1>
                </div>
            </div>

        </>
    )
}

export default Register;