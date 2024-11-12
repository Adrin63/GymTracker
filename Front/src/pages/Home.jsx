import { useContext, useEffect, useState } from 'react'
import RoutineTag from '../components/Routines/RoutineTag.jsx'
import MonthTrackerTag from '../components/MonthTrackerTag.jsx';
import Context from '../Context.js';
import { Link, useNavigate } from 'react-router-dom';
import AddButton from '../components/AddButton.jsx';
import { API_URL } from '../config.js';

function Home() {

  const { actualUser } = useContext(Context);
  
  const [username, setUsername] = useState("");
  const [routines, setRoutines] = useState([]);

  const redirect = useNavigate();

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    fetch(API_URL + '/actualUser', options)
    .then(resp => resp.json())
    .then(data => setUsername(data.name))
    .catch(err => console.log(err));
  })

  useEffect(() => {

    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    fetch(API_URL + '/routines', options)
      .then(resp => resp.json())
      .then(data => {setRoutines(data)})
      .catch(err => console.log(err));
  }, [])

  return (
    <div className="flex flex-col p-4 bg-slate-700 w-full space-y-4">
      <div>
        <h1 className='text-white font-bold text-2xl uppercase'>Hola,</h1>
        <h1 className="text-orange-300 font-bold text-2xl uppercase">{username || ""}</h1>
      </div>
      <h3 className="text-white font-bold text-2xl uppercase">Tu semana</h3>
      <MonthTrackerTag days={[1, 2, 3, 4, 5, 6, 7]} />

      <Link to={''}>
        <button className="p-3 rounded-3xl w-full font-bold text-xl bg-orange-300 text-slate-700">
          ULTIMO ENTRENAMIENTO
        </button>
      </Link>
      <h3 className="text-white font-bold text-2xl uppercase">Rutinas</h3>
      <div className="flex flex-col justify-center items-center space-y-4">

        {routines?.map((routine, index) => (
          <Link key={index} to={`/home/${routine.name}`} className='w-full'>
            <RoutineTag name={routine.name} color={routine.color} />
          </Link>
        ))
        }

        <AddButton functionToDo={() => redirect("/CreateRoutine/muscles")} />
      </div>
    </div>
  )
}

export default Home;
