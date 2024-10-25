function ColorToSelect({color, onClick}){
    //bg-blue-400 bg-orange-400 bg-yellow-400 bg-lime-400 bg-rose-400 bg-violet-400 bg-emerald-400 bg-pink-400
    return (
        <div className={`bg-${color}-400 rounded-full w-[30px] h-[30px]`} onClick={onClick}/>
    )
}

export default ColorToSelect;