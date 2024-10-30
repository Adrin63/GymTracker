function RutineTag({name, color}) {
    return (
        //bg-blue-400 bg-orange-400 bg-yellow-400 bg-lime-400 bg-rose-400 bg-violet-400 bg-emerald-400 bg-pink-400
        <div className={`rounded-xl w-full font-bold text-xl text-slate-700 uppercase p-6 bg-${color}-400`}>
            <h3 className="text-center">{name}</h3>
        </div>
    )
}

export default RutineTag;