import SingleDay from "./SingleDay";

function MonthTrackerTag(){
    return (
        <div className="flex flex-col bg-green-300 w-full p-2 rounded-lg">
            <div className=" flex flex-row justify-between">
                    <SingleDay status='0' day="1"/>
                    <SingleDay status='1' day="2"/>
                    <SingleDay status='2' day="3"/>
                    <SingleDay status='2' day="4"/>
                    <SingleDay status='3' day="5"/>
                    <SingleDay status='0' day="6"/>
                    <SingleDay status='1' day="7"/>
            </div>
        </div>
    )
}

export default MonthTrackerTag;