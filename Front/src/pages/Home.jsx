import { useContext, useEffect, useState } from 'react'
import RoutineTag from '../components/Routines/RoutineTag.jsx'
import MonthTrackerTag from '../components/MonthTrackerTag.jsx';
import Context from '../Context.js';
import { Link, useNavigate } from 'react-router-dom';
import AddButton from '../components/AddButton.jsx';
import { API_URL } from '../config.js';
import WeekTrackerTag from '../components/WeekTrackerTag.jsx';
import TopBorder from '../components/TopBorder.jsx'
import Loading from '../components/Loading.jsx';

function Home() {

  const { actualUser } = useContext(Context);

  const [username, setUsername] = useState("username");
  const [routines, setRoutines] = useState([]);
  const [routinesLoading, setRoutinesLoading] = useState(true);

  const redirect = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    console.log('aaa', actualUser)
    setUsername(actualUser.name)

    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    fetch(API_URL + '/routines', options)
      .then(resp => resp.json())
      .then(data => { setRoutines(data); setRoutinesLoading(false) })
      .catch(err => { console.log(err); setRoutinesLoading(true) });
  }, [])

  const logout = () => {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    }

    fetch(API_URL + '/logout', options)
      .then(resp => redirect('/'))
      .catch(err => console.log(err));
  }

  return (
    <div className="flex flex-col p-4 bg-slate-700 w-full space-y-4">
      <TopBorder />
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='text-white font-bold text-2xl uppercase'>Hola,</h1>
          <h1 className="text-orange-300 font-bold text-2xl uppercase">{username || ""}</h1>
        </div>
        <button className=" rounded-full flex items-center justify-center w-[35px] h-[35px] text-xl" onClick={() => logout()}>
          <img src='/logout.svg' />
        </button>
      </div>
      <h3 className="text-white font-bold text-2xl uppercase">Tu semana</h3>
      <MonthTrackerTag days={[1, 2, 3, 4, 5, 6, 7]} />
      <WeekTrackerTag progress={3} total={4} />

      <Link to={''}>
        <button className="p-3 rounded-3xl w-full font-bold text-xl bg-orange-300 text-slate-700">
          ULTIMO ENTRENAMIENTO
        </button>
      </Link>
      <h3 className="text-white font-bold text-2xl uppercase">Rutinas</h3>
      <div className="flex flex-col justify-center items-center space-y-4">


        {routinesLoading ? <Loading /> :
          <>
            {
              routines.length <= 0 ?
                <div className='flex justify-center items-center uppercase bg-slate-300 text-slate-500 w-full p-4 rounded-lg font-bold'>
                  No hay rutinas aún
                </div> :
                routines?.map((routine, index) => (
                  <Link key={index} to={`/home/${routine.name}`} className='w-full'>
                    <RoutineTag name={routine.name} color={routine.color} />
                  </Link>
                ))
              }
              <AddButton functionToDo={() => redirect("/CreateRoutine/muscles")} />
          </>
        }

      </div>
    </div>
  )
}

export default Home;
