import {  useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Loading from "./components/Loading";
import Context from "./Context";

import { API_URL } from "./config";

function NewRoutine(){

    const [isLoading, setIsLoading] = useState(true);
    //MUSCLES
    const [MuscularGroups, setMuscularGroups] = useState([{}]);
    const [selectedMuscularGroups, setSelectedMuscularGroups] = useState([]);

    useEffect(() => {
        fetch(API_URL + '/muscularGroups')
        .then(resp => resp.json())
        .then(data => {setMuscularGroups(data); setIsLoading(false);})
        .catch(err => console.log(err));
    }, [])

    const handleGroupSelected = (muscle) => {
        if (selectedMuscularGroups.includes(muscle.name)) {
            setSelectedMuscularGroups(selectedMuscularGroups.filter(aux => aux !== muscle.name));
        } else {
            setSelectedMuscularGroups([...selectedMuscularGroups, muscle.name]);
        }
    }

    return (
        <div className="bg-slate-700">
                <div className="flex flex-row justify-between items-center w-screen px-4 py-1 fixed bg-slate-700 border-b-2 border-slate-400">
                    <Link to='/home'>
                        <button className=" rounded-full flex items-center justify-center w-[40px] h-[40px] p-3 text-xl text-orange-300">
                            <h1 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>X</h1>
                        </button>
                    </Link>
                    <h2 className="text-white text-center text-xl w-1/2 uppercase">Nueva Rutina</h2>
                    <div>ㅤ</div>
                </div>

            <div className="pt-14">
                {isLoading ? <Loading/> :
                    <Context.Provider value={{MuscularGroups, selectedMuscularGroups, handleGroupSelected}}>
                            <Outlet/>
                    </Context.Provider>
                }
            </div>

            <Link className="flex items-center justify-center pt-2 pb-4" to='exercises'>
                <>
                    <button className="bg-orange-300 p-3 rounded-3xl w-1/2 font-bold text-xl text-slate-700">
                        CREAR RUTINA
                    </button>
                </>
            </Link>
        </div>
    )
}

export default NewRoutine;