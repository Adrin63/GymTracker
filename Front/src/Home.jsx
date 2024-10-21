import { useContext, useState } from 'react'
import Rutine from './components/Rutine'
import MonthTracker from './components/MonthTracker';
import NewRoutine from './components/NewRoutine';
import Context from './Context';

function Home() {

  const {actualUser} = useContext(Context);
  const [rutines, setRutines] = useState([]);

  return (
    <>
      <div className="flex flex-col p-4 bg-blue-300 h-screen w-full space-y-4">
        <div>
          <h1>Hola,</h1>
          <h1 className="font-bold italic text-white text-4xl">{actualUser}</h1>
        </div>
        <h3 className="font-bold">Tu semana</h3>
        <MonthTracker />
        <h3 className="font-bold">Rutinas</h3>
        <div className="flex flex-col">
          <Rutine name={"a"} />
          <Rutine name={"a"} />
          <Rutine name={"a"} />
          <NewRoutine/>
        </div>
      </div>
    </>
  )
}

export default Home;
