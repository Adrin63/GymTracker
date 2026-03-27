import { useContext, useEffect, useState } from 'react';
import Context from '../../../Context';
import AddButton from '../../../components/AddButton';
import ExerciseInputTag from '../../../components/Exercises/ExerciseInputTag';

function ExercisesSelector() {

    const { selectedMuscularGroups, selectedName, setSelectedName, selectedColor, setSelectedMuscularGroups, selectedExercises, setSelectedExercises } = useContext(Context);


    useEffect(() => {
    }, [])

    const addExercise = (muscleGroupToChange) => {

        const newExercises = selectedExercises.map((exercise) => (
            exercise.name === muscleGroupToChange ?
                {
                    ...exercise,
                    exercises: [...exercise.exercises, { name: '', info: '', unit: '' }]
                } : exercise
        ))

        setSelectedExercises(newExercises);
    }

    useEffect(() => {console.log(selectedMuscularGroups)}, [selectedMuscularGroups])

    return (
        <div className='flex flex-col'>
            {selectedMuscularGroups.map((muscularGroup, index) => (
                <div key={index} className='flex flex-col p-3 space-y-4'>
                    <h1 className='text-white font-bold text-2xl uppercase'>{muscularGroup.name}</h1>
                    <div>
                        {
                            muscularGroup.exercises.map((exercise, index) => (
                                <div key={index} className='bg-white'>
                                    <h1>{exercise.name}</h1>
                                    <h1>{exercise.info}</h1>
                                    <h1>{exercise.unit}</h1>
                                </div>
                            ))
                        }
                    </div>
                    <AddButton functionToDo={() => addExercise(muscularGroup)} />
                </div>
            ))}
        </div>
    )
}

export default ExercisesSelector;