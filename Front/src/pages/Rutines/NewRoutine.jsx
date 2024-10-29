import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

import Loading from "../../components/Loading";
import Context from "../../Context";

import { API_URL } from "../../config";
import Header from "../../components/Header";

function NewRoutine() {
    
    //NAME AND COLOR
    const [selectedName, setSelectedName] = useState("");
    const [selectedColor, setSelectedColor] = useState("blue");
    
    const [isLoading, setIsLoading] = useState(true);
    const [onExercises, setOnExercises] = useState(false);

    //MUSCLES
    const [MuscularGroups, setMuscularGroups] = useState([{}]);
    const [selectedMuscularGroups, setSelectedMuscularGroups] = useState([]);

    //EXERCISES
    const [exercisesByGroup, setExercisesByGroup] = useState([{}]);

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
            
            <Header title={onExercises ? selectedName : "Nueva Rutina"} route={onExercises ? `/newRoutine/muscles` : `/home`}/>

            <div className="pt-14">
                {isLoading ? <div className="flex items-center justify-center h-screen"><Loading /></div> :
                    <>
                        <Context.Provider value={{ MuscularGroups, selectedMuscularGroups, handleGroupSelected, selectedName, setSelectedName, selectedColor, setSelectedColor, setOnExercises, setSelectedMuscularGroups, exercisesByGroup,setExercisesByGroup }}>
                            <Outlet />
                        </Context.Provider>

                        <div className="flex items-center justify-center pt-2 pb-4">
                            <Link to={selectedMuscularGroups.length > 0 ? 'exercises' : '#'}>
                                <button
                                    className={`p-3 rounded-3xl w-full font-bold text-xl ${selectedMuscularGroups.length > 0
                                            ? 'bg-orange-300 text-slate-700'
                                            : 'bg-slate-500 text-slate-400 cursor-not-allowed'
                                        }`}
                                    disabled={selectedMuscularGroups.length == 0}
                                >
                                    CREAR RUTINA
                                </button>
                            </Link>
                        </div>

                    </>
                }
            </div>

        </div>
    )
}

export default NewRoutine;