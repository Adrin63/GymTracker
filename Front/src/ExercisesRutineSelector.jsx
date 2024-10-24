import { useContext, useEffect, useState } from 'react';
import Context from './Context';

function ExercisesRutineSelector(){

    const {selectedMuscularGroups, selectedName, setSelectedName, selectedColor, setOnExercises} = useContext(Context);

    // setOnExercises(true);
    
    useEffect(() => {
        
        if(selectedName == '')
        {
            let newName = "";
            selectedMuscularGroups?.map((a, index) => (newName.includes(a[0] + a[1])))
            setSelectedName(newName);
        }
    }, [])
    
    return (
        <>
            {selectedMuscularGroups?.map((a, index) => (<h1 className='text-white'>{a}</h1>))}
            <h1>test del outlet</h1>
        </>
    )
}

export default ExercisesRutineSelector;