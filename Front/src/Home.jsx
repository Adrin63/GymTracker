import { useContext, useState } from 'react'
import RutineTag from './components/Rutines/RutineTag.jsx'
import MonthTrackerTag from './components/MonthTrackerTag';
import NewRoutineTag from './components/Rutines/NewRoutineTag.jsx';
import Context from './Context';

function Home() {

  const {actualUser} = useContext(Context);
  const [rutines, setRutines] = useState([]);

  return (
    <>
      <div className="flex flex-col p-4 bg-slate-700 h-screen w-full space-y-4">
        <div>
          <h1>Hola,</h1>
          <h1 className="font-bold italic text-white text-4xl">{actualUser}</h1>
        </div>
        <h3 className="font-bold">Tu semana</h3>
        <MonthTrackerTag />
        <h3 className="font-bold">Rutinas</h3>
        <div className="flex flex-col">
          <RutineTag name={"a"} />
          <RutineTag name={"a"} />
          <RutineTag name={"a"} />
          <NewRoutineTag/>
        </div>
      </div>
    </>
  )
}

export default Home;
