import { Link } from "react-router-dom";

function NewRoutineTag() {    
    return (
        <Link className="p-4 my-2 bg-blue-100  rounded-lg w-full" to="/NewRoutine">
            <h3 className="text-center">+</h3>
        </Link>
    )
}

export default NewRoutineTag;