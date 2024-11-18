function WeekTrackerTag({ progress = 0, total = 0 }) {
    return (
        <div className="flex flex-row justify-between bg-blue-400 rounded-xl overflow-hidden">
            {
                (() => {
                    const divs = [];
                    for (let i = 0; i < total; i++) {
                        divs.push(
                            <div
                                key={i}
                                className={`py-2 w-full border border-black ${i < progress ? "bg-orange-300" : "bg-slate-300"
                                    } ${i === 0 ? "rounded-l-xl" : i === total - 1 ? "rounded-r-xl" : ""
                                    }`}
                            />
                        );
                    }
                    return divs;
                })()
            }
        </div>
    );
}

export default WeekTrackerTag;
