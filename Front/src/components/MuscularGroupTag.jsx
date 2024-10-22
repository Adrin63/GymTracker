function MuscularGroupsTag({name, img}) {
    return (
        <div className="bg-orange-300 text-center font-bold p-2 rounded-lg">
            <img src={`/MuscularGroups/${img}`} className="mb-3"/>
            <h3>{name}</h3>
        </div>
    )
}

export default MuscularGroupsTag;