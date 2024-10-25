import ColorToSelect from "./ColorToSelect";

function ColorPicker({selectedColor, display, setDisplay}) {
    return (
        <div className={`flex flex-row w-screen bg-slate-900 justify-between items-center px-3 py-4 ${display ? '' : 'hidden'}`}>
            <ColorToSelect color="orange" onClick={() => { selectedColor("orange"); setDisplay(false); }} />
            <ColorToSelect color="emerald" onClick={() => { selectedColor("emerald"); setDisplay(false); }} />
            <ColorToSelect color="blue" onClick={() => { selectedColor("blue"); setDisplay(false); }} />
            <ColorToSelect color="pink" onClick={() => { selectedColor("pink"); setDisplay(false); }} />
            <ColorToSelect color="rose" onClick={() => { selectedColor("rose"); setDisplay(false); }} />
            <ColorToSelect color="violet" onClick={() => { selectedColor("violet"); setDisplay(false); }} />
            <ColorToSelect color="yellow" onClick={() => { selectedColor("yellow"); setDisplay(false); }} />
        </div>
    )
}

export default ColorPicker;