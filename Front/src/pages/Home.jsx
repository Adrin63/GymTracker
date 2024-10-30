import { useContext, useEffect, useState } from 'react'
import RutineTag from '../components/Rutines/RutineTag.jsx'
import MonthTrackerTag from '../components/MonthTrackerTag.jsx';
import Context from '../Context.js';
import { Link, useNavigate } from 'react-router-dom';
import AddButton from '../components/AddButton.jsx';

function Home() {

  const { actualUser } = useContext(Context);
  const [rutines, setRutines] = useState([]);

  const redirect = useNavigate();

  return (
    <>
      <div className="flex flex-col p-4 bg-slate-700 h-screen w-full space-y-4">
        <div>
          <h1 className='text-white font-bold text-2xl uppercase'>Hola,</h1>
          <h1 className="text-orange-300 font-bold text-2xl uppercase">{actualUser || "natt"}</h1>
        </div>
        <h3 className="text-white font-bold text-2xl uppercase">Tu semana</h3>
        <MonthTrackerTag />
        <Link to={''}>
          <button className="p-3 rounded-3xl w-full font-bold text-xl bg-orange-300 text-slate-700">
            ULTIMO ENTRENAMIENTO
          </button>
        </Link>
        <h3 className="text-white font-bold text-2xl uppercase">Rutinas</h3>
        <div className="flex flex-col justify-center items-center space-y-4">
          <RutineTag name={"Triceps"} color={"blue"} />
          <RutineTag name={"Espalda"} color={"yellow"}/>
          <RutineTag name={"Croissant"} color={"emerald"}/>
          
          <AddButton functionToDo={() => redirect("/newRoutine/muscles")}/>
        </div>
      </div>
    </>
  )
}

export default Home;
