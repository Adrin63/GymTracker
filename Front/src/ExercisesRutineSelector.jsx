import { useContext, useEffect, useState } from 'react';
import Context from './Context';

function ExercisesRutineSelector(){

    const {selectedMuscularGroups} = useContext(Context);
    return (
        <>
            {selectedMuscularGroups?.map((a, index) => (<h1 className='text-white'>{a}</h1>))}
            <h1>test del outlet</h1>
        </>
    )
}

export default ExercisesRutineSelector;