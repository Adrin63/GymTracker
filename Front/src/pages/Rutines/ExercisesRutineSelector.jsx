import { useContext, useEffect, useState } from 'react';
import Context from '../../Context';
import NewExerciseTag from '../../components/Exercises/NewExerciseTag';

function ExercisesRutineSelector(){

    const {selectedMuscularGroups, selectedName, setSelectedName, selectedColor, setOnExercises, setSelectedMuscularGroups} = useContext(Context);

    
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
    
    return (
        <div className='flex flex-col'>
            {selectedMuscularGroups.map((musculparGroup, index) => (
                <div className='flex flex-col p-3 space-y-4'>
                    <h1 key={index} className='text-white font-bold text-2xl uppercase'>{musculparGroup}</h1>
                    <input
                            //onInput={(e) => { if(e.target.value.length < 38) }}
                            value={""}
                            className="appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight" id="name" type="text" placeholder={"Ejercicio 1"} />
                        
                        <div className='flex justify-center items-center'>

                        <NewExerciseTag/>
                        </div>
                </div>
                ))}
        </div>
    )
}

export default ExercisesRutineSelector;