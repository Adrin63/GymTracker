import { Link } from "react-router-dom";

function Header({route, title}){
    return (
        <div className="flex flex-row justify-between items-center w-screen px-4 py-2 fixed bg-slate-700 border-b-2 border-slate-400">
                <Link to={route}>
                    <button className=" rounded-full flex items-center justify-center w-[35px] h-[35px] text-xl">
                        <img src='/back.svg' />
                    </button>
                </Link>
                <h2 className="text-white font-bold text-center text-xl flex-grow uppercase">{title}</h2>
                <div className="w-[44px]"></div>
        </div>
    )
}

export default Header;