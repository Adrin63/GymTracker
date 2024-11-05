import { useParams } from "react-router-dom";

function Routine(){
    const {routineName} = useParams();

    return (<div className="bg-slate-300">
        {routineName}
    </div>
    )
}

export default Routine;
