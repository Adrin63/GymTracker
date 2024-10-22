import { useEffect, useState } from "react";
import MuscularGroupTag from './components/MuscularGroupTag'
import { API_URL } from "./config";
import { Link } from "react-router-dom";

function NewRoutine(){

    const [selectedMuscularGroups, setSelectedMuscularGroups] = useState([{}]);
    
    useEffect(() => {
        fetch(API_URL + '/muscularGroups')
        .then(resp => resp.json())
        .then(data => setSelectedMuscularGroups(data))
        .catch(err => console.error("Error fetching data:", err));
    }, [])
    
    return (
        <div className="bg-slate-700">
            <h2 className="text-white text-center p-2 text-xl">¿Que grupos musculares quieres añadir?</h2>
            <Link to='/home'>
                <button className="bg-orange-400 rounded-full flex items-center justify-center w-[50px] h-[50px] p-3 fixed top-5 left-5 text-white">
                    <h1 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>X</h1>
                </button>
            </Link>
            <div className="flex flex-wrap items-center justify-between">
                {
                    selectedMuscularGroups?.map((a, index) => (
                        <div className="w-1/2 p-5 flex">
                            <MuscularGroupTag key={index} name={a.name} img={a.image}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default NewRoutine;