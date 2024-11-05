function MonthTrackerTag({days = [1, 2, 3, 4, 5, 6, 7]}) {
    const weekDays = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    return (
        <div className="flex flex-row bg-slate-300 w-full p-2 justify-between rounded-lg">
            {weekDays.map((dayName, index) => (
                <div key={index} className="flex flex-col items-center w-full text-slate-500">
                    <h2 className="font-bold">{dayName}</h2>
                    <h2 className="text-slate-500">{days[index]}</h2>
                </div>
            ))}
        </div>
    );
}

export default MonthTrackerTag;
