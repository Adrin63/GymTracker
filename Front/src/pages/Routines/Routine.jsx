import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useEffect } from "react";
import { API_URL } from "../../config";

function Routine(){
    const {routineName} = useParams();

    useEffect(() => {
        
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: routineName})
          }
      
          fetch(API_URL + '/routine', options)
            .then(resp => resp.json())
            .then(data => {console.log(data)})
            .catch(err => console.log(err));
    }, [])

    return (
    <div className="bg-slate-700">
            <Header route={'/home'} title={routineName}/>
            
    </div>
    )
}

export default Routine;
