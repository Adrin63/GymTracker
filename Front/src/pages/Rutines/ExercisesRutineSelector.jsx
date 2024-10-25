import { useContext, useEffect, useState } from 'react';
import Context from '../../Context';
import NewExerciseTag from '../../components/Exercises/NewExerciseTag';

function ExercisesRutineSelector() {

    const { selectedMuscularGroups, selectedName, setSelectedName, selectedColor, setOnExercises, setSelectedMuscularGroups } = useContext(Context);


    useEffect(() => {
        setOnExercises(true);

        setSelectedName("placeholder")

        setSelectedMuscularGroups(['Triceps', 'Biceps', 'Pecho']);

        // if(selectedName == '')
        // {
        //     const newName = selectedMuscularGroups.map((a, index) => a.slice(0, 2)).join('')
        //     setSelectedName(newName);
        // }
    }, [])

    const changeBetweenLbsAndKg = (exercice) => {
        console.log(exercice)
    }

    return (
        <div className='flex flex-col'>
            {selectedMuscularGroups.map((musculparGroup, index) => (
                <div className='flex flex-col p-3 space-y-4'>
                    <h1 key={index} className='text-white font-bold text-2xl uppercase'>{musculparGroup}</h1>
                    <div className='flex flex-row space-x-2'>
                        <input
                            //onInput={(e) => { if(e.target.value.length < 38) }}
                            value={""}
                            className="appearance-none border rounded w-full p-3 text-gray-700 leading-tight" id="name" type="text" placeholder={"Ejercicio 1"} />
                        <input
                            //onInput={(e) => { if(e.target.value.length < 38) }}
                            value={""}
                            className="appearance-none border rounded w-1/6 p-3 text-gray-700 leading-tight text-center" id="name" type="text" placeholder={"10"} />
                        <button className='flex justify-center items-center p-3 uppercase bg-orange-300 text-slate-500 font-bold rounded' onClick={() => changeBetweenLbsAndKg('20')}>
                            kg
                        </button>
                    </div>
                    <div className='flex justify-center items-center'>

                        <NewExerciseTag />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ExercisesRutineSelector;