import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import Loading from "../../../components/Loading";
import Context from "../../../Context";

import { API_URL } from "../../../config";
import Header from "../../../components/Header";

function NewRoutine() {

    const redirect = useNavigate();

    const {actualUser} = useContext(Context);

    //NAME AND COLOR
    const [selectedName, setSelectedName] = useState("");
    const [selectedColor, setSelectedColor] = useState("blue");

    const [allRoutineNames, setAllRoutineNames] = useState([]);
    const [doesRoutineExist, setDoesRoutineExist] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [onExercises, setOnExercises] = useState(false);

    //MUSCLES
    const [muscularGroups, setMuscularGroups] = useState([{}]);
    const [selectedMuscularGroups, setSelectedMuscularGroups] = useState([]);

    //EXERCISES
    const [selectedExercises, setSelectedExercises] = useState([{}]);

    useEffect(() => {

        fetch(API_URL + '/muscularGroups')
            .then(resp => resp.json())
            .then(data => { setMuscularGroups(data); setIsLoading(false); })
            .catch(err => console.log(err));

        fetch(API_URL + '/allRoutineNames')
            .then(resp => resp.json())
            .then(data => { const aux = data?.map((routine) => routine.name); setAllRoutineNames(aux) })
            .catch(err => console.log(err));
    }, [])

    const createRoutine = () => {

        const values = {
            userId: actualUser,
            name: selectedName,
            color: selectedColor,
            muscularGroups: selectedMuscularGroups.map(muscle => ({
                name: muscle,
                exercises: selectedExercises
            }))
        };

        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }

        fetch(API_URL + '/routines', options)
            .then(resp => resp.json())
            .then(data => {
                redirect('/home');
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        const matchedRoutines = allRoutineNames?.filter((rutine) => rutine.toUpperCase() == selectedName.toUpperCase());

        matchedRoutines.length > 0 ? setDoesRoutineExist(true) : setDoesRoutineExist(false)
    }, [selectedName])

    const onButtonPressed = () => {

        if (canBePressedTheButton()) {
            if (onExercises) {
                createRoutine();
            }
            else {
                redirect('exercises')
            }
        }
    }

    const canBePressedTheButton = () => {
        let aux = false;

        if (onExercises) {
            //recorrer ejercicios que todos tengan nombre
            aux = true;
        }
        else {
            aux = (selectedMuscularGroups.length > 0 && !doesRoutineExist && selectedName != '')
        }

        return aux;
    }

    const handleGroupSelected = (muscle) => {
        if (selectedMuscularGroups.includes(muscle.name)) {
            setSelectedMuscularGroups(selectedMuscularGroups.filter(aux => aux !== muscle.name));
        } else {
            setSelectedMuscularGroups([...selectedMuscularGroups, muscle.name]);
        }
    }



    return (
        <div className="bg-slate-700">

            <Header title={onExercises ? selectedName : "Nueva Rutina"} route={onExercises ? `/CreateRoutine/muscles` : `/home`} />

            <div className="pt-14">
                {isLoading ? <div className="flex items-center justify-center h-screen"><Loading /></div> :
                    <>
                        <Context.Provider value={{ muscularGroups, selectedMuscularGroups, handleGroupSelected, selectedName, setSelectedName, selectedColor, setSelectedColor, setOnExercises, setSelectedMuscularGroups, selectedExercises, setSelectedExercises, doesRoutineExist }}>
                            <Outlet />
                        </Context.Provider>

                        <div className="flex items-center justify-center pt-2 pb-4">
                            <button
                                className={`p-3 rounded-3xl w-1/2 font-bold text-xl ${canBePressedTheButton() ? 'bg-orange-300 text-slate-700'
                                    : 'bg-slate-500 text-slate-400 cursor-not-allowed'
                                    }`}
                                onClick={() => onButtonPressed()}>
                                CREAR RUTINA
                            </button>
                        </div>
                    </>
                }
            </div>

        </div>
    )
}

export default NewRoutine;