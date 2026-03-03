import { useEffect, useState } from 'react';
import './App.css';
import Map from './Map';
import axios from 'axios';

const API_URL = 'https://arc-raiders-helper-8rvn.onrender.com';

function App() {
  const currTime = new Date();
  const [time, setTime] = useState(currTime);

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    };

    const timerId = setInterval(tick, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/conditions_by_map/`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  // // TODO: fix list keys
  const maps = data.map(
    (map: {
      map_name: string;
      conditions: {
        id: number;
        map_name: { id: number; name: string };
        condition: string;
        start_time: string;
        end_time: string;
      }[];
    }) => (
      <li key={map.map_name} className={map.map_name.replaceAll(' ', '-').toLowerCase()}>
        <h1>{map.map_name}</h1>
        <Map currTime={time} conditions={map.conditions} />
      </li>
    ),
  );

  return (
    <>
      {/* <p>{JSON.stringify(data)}</p> */}
      <h1 style={{ textAlign: 'center' }}>Arc Raiders</h1>
      <ul className="container">{maps}</ul>
    </>
  );
}

export default App;
