import { Link } from "react-router-dom";

function NewRoutineTag() {    
    return (
        <Link className="p-4 my-2 bg-orange-300  rounded-lg w-1/6" to="/newRoutine/muscles">
            <h3 className="text-center font-bold font-2xl text-slate-500">+</h3>
        </Link>
    )
}

export default NewRoutineTag;