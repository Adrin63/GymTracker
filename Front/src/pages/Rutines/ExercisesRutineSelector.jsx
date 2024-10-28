import { useContext, useEffect, useState } from 'react';
import Context from '../../Context';
import NewExerciseTag from '../../components/Exercises/NewExerciseTag';
import ExerciseInputTag from '../../components/Exercises/ExerciseInputTag';

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

    // useEffect(() => console.log(exercisesByGroup), [exercisesByGroup])

    const handleNameChange = (muscleGroupToUpdate, index, newName) => {
        const updatedExercises = exercisesByGroup.map((group) =>
            group.name === muscleGroupToUpdate
                ? {
                    ...group,
                    exercises: group.exercises.map((ex, idx) => (idx === index ? { ...ex, name: newName } : ex)),
                }
                : group
        );
        setExercisesByGroup(updatedExercises);
    };

    const handleInfoChange = (muscleGroupToUpdate, index, newInfo) => {
        const updatedExercises = exercisesByGroup.map((group) =>
            group.name === muscleGroupToUpdate
                ? {
                    ...group,
                    exercises: group.exercises.map((ex, idx) => (idx === index ? { ...ex, info: newInfo } : ex)),
                }
                : group
        );
        setExercisesByGroup(updatedExercises);
    };

    return (
        <div className='flex flex-col'>
            {selectedMuscularGroups.map((muscularGroup, index) => (
                <div className='flex flex-col p-3 space-y-4'>
                    <h1 key={index} className='text-white font-bold text-2xl uppercase'>{muscularGroup}</h1>
                    {
                        exercisesByGroup.map((group) => (
                        group.name == muscularGroup ? 
                        group.exercises.map((ex, index) => (
                        <ExerciseInputTag key={index} name={ex.name} info={ex.info}
                            onNameChange={(newName) => handleNameChange(muscularGroup, index, newName)}
                            onInfoChange={(newInfo) => handleInfoChange(muscularGroup, index, newInfo)}
                        />)) : ''
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