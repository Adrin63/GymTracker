import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import EditInputTag from "../../components/Exercises/EditInputTag";

function Routine() {
  const { routineName } = useParams();

  const [routine, setRoutine] = useState([{}]);

  useEffect(() => {

    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: routineName })
    }

    fetch(API_URL + '/routine', options)
      .then(resp => resp.json())
      .then(data => { { console.log('La rutina es:', data); setRoutine(data); } })
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      <Header route={'/home'} title={routineName} />
      <div className="pt-[106px]">
        {
          routine?.muscularGroups?.map((muscularGroup, index) => (
            <div key={index} className='flex flex-col p-3 space-y-4'>
              <div className="flex flex-row space-x-3 items-center justify-center">
                <h1 className='text-white font-bold text-2xl uppercase'>{muscularGroup.name}</h1>
                <img className="w-[23px] h-[23px]" onClick={() => { console.log('aaaaaaaaaaa') }} src='/edit.svg' />
              </div>
              {
                muscularGroup?.exercises?.map((exercises, ind) => (
                  <div key={ind} className="flex flex-row justify-between">
                    <h3 className="text-slate-300 font-bold uppercase">{exercises.name}</h3>
                    <div className="flex flex-row space-x-1">
                      <h3 className="text-orange-300 font-bold">{exercises.info}</h3>
                      <h3 className="uppercase text-white font-bold">{exercises.unit}</h3>
                    </div>
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
      <EditInputTag/>
    </div>
  )
}

export default Routine;
