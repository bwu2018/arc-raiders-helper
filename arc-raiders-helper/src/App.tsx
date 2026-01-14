import { useEffect, useState } from 'react'
import './App.css'
import Map from './Map'
import data from "../../Map_condition_timestamps.json"

function App() {
  const currTime = new Date();
  const [time, setTime] = useState(currTime);

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    }

    const timerId = setInterval(tick, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  // TODO: fix list keys
  const maps = data.data.map((map: { map_name: string; conditions: { name: string; start: string; end: string; }[] }) =>
    <li key={map.map_name}>
      <h1>{map.map_name}</h1>
      <Map currTime={time} conditions={map.conditions}/>
    </li>
  );

  return (
    <>
      {/* <p>{JSON.stringify(data)}</p> */}
      <h1>Arc Raiders</h1>
      <ul>
        {maps}
      </ul>
    </>

  );
}

export default App
