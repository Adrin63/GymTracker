import MuscularGroupTag from '../../../components/Rutines/MuscularGroupTag'
import ColorPicker from "../../../components/Colors/ColorPicker";
import ColorToSelect from "../../../components/Colors/ColorToSelect";

import { useContext, useEffect, useState } from 'react';
import Context from '../../../Context';

function MuscularGroupSelector() {

    const { MuscularGroups, selectedMuscularGroups, handleGroupSelected, selectedName, setSelectedName, selectedColor, setSelectedColor, setOnExercises, doesRoutineExist } = useContext(Context);


    const [displayedColorPicker, setDisplayedColorPicker] = useState(false);

    const [randomInputText, setRandomInputText] = useState("");
    const [lastIndex, setLastIndex] = useState(-1);
    const [newNameTrigger, setNewNameTrigger] = useState(false);

    const inputText = [
        'Fuerza 1000%',
        'La tigresa de Kung Fu Panda',
        'Vida Sana Corito Sano',
        'Rutina de Definición Extrema',
        'Construcción de Masa Muscular',
        'Croissant',
        'El enemigo ese de Crash Bandicoot',
        'Llados mi luz',
        'Testosterona hasta quedarse calvo',
        'Si Rajoy pudo yo también',
        '@everyone'
    ];

    useEffect(() => {
        setOnExercises(false);
    }, [])

    useEffect(() => {
        let aux;

        do {
            aux = Math.floor(Math.random() * inputText.length);
        }
        while (aux == lastIndex)

        setLastIndex(aux);
        setRandomInputText(inputText[aux]);
    }, [newNameTrigger])

    return (
        <>
            <div className='flex flex-row justify-between px-3 pt-2 items-center'>
                <h1 className='text-white font-bold text-lg uppercase'>Nombre y color</h1>
                <h1 className="text-red-400">{doesRoutineExist ? 'Esta rutina ya existe' : ' '}</h1>
                
            </div>
            <div className="flex flex-col py-2 space-y-5 items-center">
                <div className="flex flex-row space-x-4 w-screen px-3 justify-center items-center">
                    <input
                        onInput={(e) => { if (e.target.value.length < 38) setSelectedName(e.target.value); if (e.target.value.length == 1) newNameTrigger ? setNewNameTrigger(false) : setNewNameTrigger(true) }}
                        value={selectedName}
                        className="appearance-none border rounded w-full p-2 text-gray-700 leading-tight" id="name" type="text" placeholder={randomInputText} />
                    <div onClick={() => displayedColorPicker ? setDisplayedColorPicker(false) : setDisplayedColorPicker(true)}>
                        <ColorToSelect color={selectedColor} className="border border-3xl border-black" />
                    </div>
                </div>

                <ColorPicker selectedColor={setSelectedColor} display={displayedColorPicker} setDisplay={setDisplayedColorPicker} />
            </div>
            <div className="flex flex-col items-center space-y-4">
                <div className="flex flex-wrap items-center justify-between">
                    {
                        MuscularGroups?.map((muscles, index) => (
                            <div className="w-1/2 p-3 flex" key={index} onClick={() => handleGroupSelected(muscles)}>
                                <MuscularGroupTag name={muscles.name} img={muscles.image}
                                    isSelected={selectedMuscularGroups.includes(muscles.name)} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default MuscularGroupSelector;