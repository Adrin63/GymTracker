import { useEffect, useState } from "react";

function ExerciseInputTag({ name, info, unit, onNameChange, onInfoChange }) {
    const [localUnit, setLocalUnit] = useState(unit);

    //1kg -> 2.20462lbs
    const changeBetweenUnits = () => {
        let newQuantity;

        if (localUnit == 'kg') {
            newQuantity = (parseFloat(info) * 2.2046).toFixed(1);
            setLocalUnit("lb");
        } else if (localUnit == 'lb') {
            newQuantity = (parseFloat(info) / 2.2046).toFixed(1);
            setLocalUnit("kg");
        }

        onInfoChange(newQuantity);
    };
    

    return (
        <div className='flex flex-row space-x-2'>
            <input
                onInput={(e) => { if (e.target.value.length < 38) onNameChange(e.target.value) }}
                value={name}
                className="appearance-none border rounded w-full p-3 text-gray-700 leading-tight" id="name" type="text" placeholder={"Nuevo Ejercicio"} />
            <input
                onInput={(e) => { if (e.target.value < 999  && e.target.value >= 0) onInfoChange(e.target.value) }}
                value={info}
                min="0"
                max="999"
                className="appearance-none border rounded w-1/6 text-gray-700 leading-tight text-center" id="name" type="number" placeholder={"0"} />
            <button className='flex justify-center items-center w-1/6 p-3 uppercase bg-orange-300 text-slate-500 font-bold rounded' onClick={changeBetweenUnits}>
                {localUnit || 'kg'}
            </button>
        </div>
    )
}

export default ExerciseInputTag;