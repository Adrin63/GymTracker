function SingleDay({status, day}){//Status: 0-Not yet 1-Worked in 2-Not worked 3-today
    
    let color = 'bg-white';
    if (status == 1){
        color = 'bg-orange-300'
    }
    else if(status == 2){
        color = 'bg-gray-300'
    }
    else{
    }
    
    return (
        <div className={`p-2 rounded-xl ${status == 3 ? "border-4 border-orange-300": ''}`}>
            <div className={`${color} text-bold flex items-center justify-center p-2 rounded-lg`}>
                <h3>{day}</h3>
            </div>
        </div>
    )
}

export default SingleDay;