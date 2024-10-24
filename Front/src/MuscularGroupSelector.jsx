import MuscularGroupTag from './components/Rutines/MuscularGroupTag'
import ColorPicker from "./components/ColorPicker";
import ColorToSelect from "./components/ColorToSelect";

import { useContext, useEffect, useState } from 'react';
import Context from './Context';

function MuscularGroupSelector(){
    
    const {MuscularGroups, selectedMuscularGroups, handleGroupSelected, selectedName, setSelectedName, selectedColor, setSelectedColor, setOnExercises} = useContext(Context);
    
    setOnExercises(false);
    
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
        'Si Rajoy pudo yo también'
    ];

    useEffect(() => {
        let aux;

        do{
            aux = Math.floor(Math.random() * inputText.length);
        }
        while(aux == lastIndex)

        setLastIndex(aux);
        setRandomInputText(inputText[aux]);
    }, [newNameTrigger])

    return (
        <>
            <div className="flex flex-col pt-2 space-y-4 items-center">
                    <div className="flex flex-row space-x-4 w-screen px-3 justify-center items-center">
                        <input
                            onInput={(e) => {setSelectedName(e.target.value); if(e.target.value.length == 1) newNameTrigger ? setNewNameTrigger(false) : setNewNameTrigger(true)}}
                            value={selectedName}
                            className="appearance-none border rounded w-full p-2 text-gray-700 leading-tight" id="name" type="text" placeholder={randomInputText} />
                        <div onClick={() => displayedColorPicker ? setDisplayedColorPicker(false) : setDisplayedColorPicker(true)}>
                            <ColorToSelect color={selectedColor} className="border border-3xl border-black"/>
                        </div>
                    </div>
                    
                    <ColorPicker selectedColor={setSelectedColor} display={displayedColorPicker} setDisplay={setDisplayedColorPicker}/>
                </div>
                <div className="flex flex-col items-center space-y-4">
                    <div className="flex flex-wrap items-center justify-between">
                        {
                            MuscularGroups?.map((a, index) => (
                                <div className="w-1/2 p-3 flex" key={index} onClick={() => handleGroupSelected(a)}>
                                    <MuscularGroupTag name={a.name} img={a.image}
                                    isSelected={selectedMuscularGroups.includes(a.name)}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
    )
}

export default MuscularGroupSelector;