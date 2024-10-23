import {  useState } from "react";
import { Link, Outlet } from "react-router-dom";

function NewRoutine(){

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

            
            <Outlet/>
            
            <div className="flex items-center justify-center pt-2 pb-4">
                <button className="bg-orange-300 p-3 rounded-3xl w-1/2 font-bold text-xl text-slate-700">
                    CREAR RUTINA
                </button>
            </div>
        </div>
    )
}

export default NewRoutine;