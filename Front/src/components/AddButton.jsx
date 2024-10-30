function AddButton({functionToDo}) {
    return (

        <div className='flex justify-center items-center'>
            <button onClick={functionToDo}>
                <div className=" bg-orange-300  rounded py-1 px-2 flex items-center justify-center text-center">
                    <h3 className="text-center font-bold font-2xl text-slate-500">+</h3>
                </div>
            </button>
        </div>
    )
}

export default AddButton;