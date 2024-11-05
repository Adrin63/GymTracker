import { useState } from "react";

function MuscularGroupsTag({name, img, isSelected}) {
    return (
        <div className={`text-center text-white font-bold p-2 rounded-lg shadow uppercase ${isSelected ? "bg-orange-300" : "bg-slate-500"}`}>
            <img src={`/MuscularGroups/${img}`} className="mb-3"/>
            <h3 className={`${isSelected ? "text-slate-700" : "text-white"}`}>{name}</h3>
        </div>
    )
}

export default MuscularGroupsTag;