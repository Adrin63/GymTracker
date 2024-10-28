import { useEffect, useState } from "react";

function ExerciseInputTag({ name, info, onNameChange, onInfoChange }) {
    const [quantity, setQuantity] = useState("0");
    const [unit, setUnit] = useState("kg");

    useEffect(() => {
        const extractedQuantity = parseFloat(info);
        const extractedUnit = info.replace(extractedQuantity, "").trim();
        setQuantity(extractedQuantity ? extractedQuantity.toString() : "0");
        setUnit(extractedUnit || "kg");
    }, [info])

    const handleQuantityChange = (e) => {
        let newQuantity = e.target.value;

        if (newQuantity.startsWith("0") && newQuantity.length > 1 || newQuantity.endsWith("0") && newQuantity.length > 1) {
            newQuantity = newQuantity.slice(1);
        }

        if (newQuantity === "") {
            setQuantity("0");
            onInfoChange(`0${unit}`);
        } else {
            newQuantity = Math.max(0, Math.min(parseInt(newQuantity), 999)).toString();
            setQuantity(newQuantity);
            onInfoChange(`${newQuantity}${unit}`);
        }
    };

    //1kg -> 2.20462lbs
    const changeBetweenUnits = () => {
        let newQuantity;

        if (unit === 'kg') {
            newQuantity = (parseFloat(quantity) * 2.20462).toFixed(1); // Keep one decimal place
            setUnit("lb");
        } else if (unit === 'lb') {
            newQuantity = (parseFloat(quantity) / 2.20462).toFixed(1); // Keep one decimal place
            setUnit("kg");
        }

        const quantityDisplay = parseFloat(newQuantity).toString();
        setQuantity(quantityDisplay);
        onInfoChange(`${quantityDisplay} ${unit === 'kg' ? 'lb' : 'kg'}`); // Update info with new unit
    };
    

    return (
        <div className='flex flex-row space-x-2'>
            <input
                onInput={(e) => { if (e.target.value.length < 38) onNameChange(e.target.value) }}
                value={name}
                className="appearance-none border rounded w-full p-3 text-gray-700 leading-tight" id="name" type="text" placeholder={"Ejercicio 1"} />
            <input
                onInput={(e) => { if (e.target.value.length < 999) handleQuantityChange(e) }}
                value={quantity}
                min="0"
                max="999"
                className="appearance-none border rounded w-1/6 text-gray-700 leading-tight text-center" id="name" type="number" placeholder={"0"} />
            <button className='flex justify-center items-center w-1/6 p-3 uppercase bg-orange-300 text-slate-500 font-bold rounded' onClick={changeBetweenUnits}>
                {unit}
            </button>
        </div>
    )
}

export default ExerciseInputTag;