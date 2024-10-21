import { Link } from "react-router-dom";
import Context from "../Context";
import { useContext } from "react";

function NuevaRutina() {

    const {actualUser} = useContext(Context);
    
    return (
        <div className="p-4 my-2 bg-blue-100  rounded-lg w-full">
            <h3 className="text-center">+</h3>
        </div>
    )
}

export default NuevaRutina;