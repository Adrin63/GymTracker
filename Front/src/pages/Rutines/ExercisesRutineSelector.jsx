import { useContext, useEffect, useState } from 'react';
import Context from '../../Context';
import NewExerciseTag from '../../components/Exercises/NewExerciseTag';

function ExercisesRutineSelector() {

    const { selectedMuscularGroups, selectedName, setSelectedName, selectedColor, setOnExercises, setSelectedMuscularGroups, exercisesByGroup, setExercisesByGroup } = useContext(Context);


    useEffect(() => {
        setSelectedName("placeholder")
        //setSelectedMuscularGroups(['Triceps', 'Biceps', 'Pecho']);

        setOnExercises(true);

        const aux = selectedMuscularGroups.map((musc) => ({ name: musc, exercises: [{ name: '', info: ''}] }));

        setExercisesByGroup(aux)

        // if(selectedName == '')
        // {
        //     const newName = selectedMuscularGroups.map((a, index) => a.slice(0, 2)).join('')
        //     setSelectedName(newName);
        // }
    }, [])

    const addExercise = (muscleGroupToChange) => {

        const newExercises = exercisesByGroup.map((exercise) => (
                exercise.name === muscleGroupToChange ? 
                {
                    ...exercise,
                    exercises: [...exercise.exercises, { name: '', info: ''}] 
                } : exercise
            ))    

        setExercisesByGroup(newExercises);
    }

    useEffect(() => console.log(exercisesByGroup), [exercisesByGroup])

    const changeBetweenLbsAndKg = (exercice, state) => {
        console.log(exercice)
    }

    return (
        <div className='flex flex-col'>
            {selectedMuscularGroups.map((muscularGroup, index) => (
                <div className='flex flex-col p-3 space-y-4'>
                    <h1 key={index} className='text-white font-bold text-2xl uppercase'>{muscularGroup}</h1>

                    {
                        exercisesByGroup.map((exercise, index) => (
                        exercise.name == muscularGroup ? 
                        <div key={index} className='flex flex-row space-x-2'>
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
                        </div> : ''
                        ))
                    }
                    <button className='flex justify-center items-center' onClick={() => {addExercise(muscularGroup)}}>
                        <NewExerciseTag/>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default ExercisesRutineSelector;