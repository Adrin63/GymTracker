import { useEffect, useState } from "react";
import MuscularGroupTag from './components/Rutines/MuscularGroupTag'
import { API_URL } from "./config";
import { Link } from "react-router-dom";
import ColorPicker from "./components/ColorPicker";
import ColorToSelect from "./components/ColorToSelect";

function NewRoutine(){

    //NAME AND COLOR
    const [name, setName] = useState("");
    
    const [selectedColor, setSelectedColor] = useState("blue");
    const [displayedColorPicker, setDisplayedColorPicker] = useState(false);
    
    
    //MUSCLES
    
    const [MuscularGroups, setMuscularGroups] = useState([{}]);
    const [selectedMuscularGroups, setSelectedMuscularGroups] = useState([]);
    
    useEffect(() => {
        fetch(API_URL + '/muscularGroups')
        .then(resp => resp.json())
        .then(data => setMuscularGroups(data))
        .catch(err => console.log(err));
    }, [])
    
    const handleGroupSelected = (muscle) => {
        if (selectedMuscularGroups.includes(muscle.name)) {
            setSelectedMuscularGroups(selectedMuscularGroups.filter(aux => aux !== muscle.name));
        } else {
            setSelectedMuscularGroups([...selectedMuscularGroups, muscle.name]);
        }

        console.log(selectedMuscularGroups, 'and the new is:', muscle.name)
    }

    return (
        <div className="bg-slate-700">
            
                <div className="flex flex-row justify-between items-center w-screen px-4 py-1 fixed bg-slate-700 border-b-2 border-slate-400">
                    <Link to='/home'>
                        <button className=" rounded-full flex items-center justify-center w-[40px] h-[40px] p-3 text-xl text-orange-300">
                            <h1 style={{ textShadow: "2px 2px 2px rgba(0, 0, 0, 1)" }}>X</h1>
                        </button>
                    </Link>
                    <h2 className="text-white text-center text-xl w-1/2 uppercase">Nueva Rutina</h2>
                    <div>ㅤ</div>
                </div>

            <div className="flex flex-col pt-2 space-y-4 items-center">
                <div className="pt-14 flex flex-row space-x-4 justify-center items-center">
                    <input
                        onInput={(e) => setName(e.target.value)}
                        value={name}
                        className="appearance-none border rounded w-full p-2 text-gray-700 leading-tight" id="name" type="text" placeholder="Tetitas de Azucar" />
                    <div onClick={() => displayedColorPicker ? setDisplayedColorPicker(false) : setDisplayedColorPicker(true)}>
                        <ColorToSelect color={selectedColor} className="border border-3xl border-black"/>
                    </div>
                </div>
                
                <ColorPicker selectedColor={setSelectedColor} display={displayedColorPicker} setDisplay={setDisplayedColorPicker}/>
            </div>
                
            <div className="flex flex-col items-center pb-5 space-y-4">
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
                <button className="bg-orange-300 p-3 rounded-3xl w-1/2 font-bold text-xl text-slate-700">
                    CREAR RUTINA
                </button>
            </div>
        </div>
    )
}

export default NewRoutine;