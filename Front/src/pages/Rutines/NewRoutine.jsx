import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Loading from "../../components/Loading";
import Context from "../../Context";

import { API_URL } from "../../config";

function NewRoutine() {

    //MUSCLES
    const [MuscularGroups, setMuscularGroups] = useState([{}]);
    const [selectedMuscularGroups, setSelectedMuscularGroups] = useState([]);

    //NAME AND COLOR
    const [selectedName, setSelectedName] = useState("");
    const [selectedColor, setSelectedColor] = useState("blue");

    const [isLoading, setIsLoading] = useState(true);
    const [onExercises, setOnExercises] = useState(false);

    useEffect(() => {
        fetch(API_URL + '/muscularGroups')
            .then(resp => resp.json())
            .then(data => { setMuscularGroups(data); setIsLoading(false); })
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
            <div className="flex flex-row justify-between items-center w-screen px-4 py-2 fixed bg-slate-700 border-b-2 border-slate-400">
                <Link to={onExercises ? `/newRoutine/muscles` : `/home`}>
                    <button className=" rounded-full flex items-center justify-center w-[35px] h-[35px] text-xl">
                        <img src='/back.svg' />
                    </button>
                </Link>
                <h2 className="text-white font-bold text-center text-xl flex-grow uppercase">{onExercises ? selectedName : "Nueva Rutina"}</h2>
                <div className="w-[44px]"></div>
            </div>

            <div className="pt-14">
                {isLoading ? <div className="flex items-center justify-center h-screen"><Loading /></div> :
                    <>
                        <Context.Provider value={{ MuscularGroups, selectedMuscularGroups, handleGroupSelected, selectedName, setSelectedName, selectedColor, setSelectedColor, setOnExercises, setSelectedMuscularGroups }}>
                            <Outlet />
                        </Context.Provider>

                        {selectedMuscularGroups.length > 0 ?
                            <Link className="flex items-center justify-center pt-2 pb-4" to='exercises'>
                                <>
                                    <button className="bg-orange-300 p-3 rounded-3xl w-1/2 font-bold text-xl text-slate-700">
                                        CREAR RUTINA
                                    </button>
                                </>
                            </Link>
                            :
                            <div className="flex items-center justify-center pt-2 pb-4">
                                <button className="bg-slate-500 p-3 rounded-3xl w-1/2 font-bold text-xl text-slate-400">
                                    CREAR RUTINA
                                </button>
                            </div>

                        }
                    </>
                }
            </div>

        </div>
    )
}

export default NewRoutine;