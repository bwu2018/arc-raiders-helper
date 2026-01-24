function formatTime(ms: number) {
  const date = new Date(ms);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${hours}:${formattedMinutes}:${formattedSeconds}`;
}

function Map({
  currTime,
  conditions,
}: {
  currTime: Date;
  conditions: {
    id: number;
    map_name: { id: number; name: string };
    condition: string;
    start_time: string;
    end_time: string;
  }[];
}) {
  const currentConditions = [<h3>Current</h3>];
  const nextConditions = [<h3>Upcoming</h3>];

  let nextTime = new Date();
  let savedNextHour = -1;

  for (let i = 0; i < conditions.length - 1; i++) {
    const start = parseInt(conditions[i].start_time, 10);
    const startTime = new Date(start);

    const end = parseInt(conditions[i].end_time, 10);
    const endTime = new Date(end);

    const next = parseInt(conditions[i + 1].start_time, 10);
    nextTime = new Date(next);

    if (currTime.getTime() < nextTime.getTime()) {
      if (savedNextHour == -1 || nextTime.getHours() == savedNextHour) {
        savedNextHour = nextTime.getHours();
        nextConditions.push(
          <div className="condition">
            <p>{conditions[(i + 1) % conditions.length].condition}</p>
            <p className="time">{formatTime(nextTime.getTime() - currTime.getTime())}</p>
          </div>,
        );
      }
    }

    if (startTime.getTime() <= currTime.getTime() && endTime.getTime() > currTime.getTime()) {
      const conditionName = conditions[i].condition;
      currentConditions.push(
        <div className="condition">
          <p>{conditionName}</p>
          <p className="time">{formatTime(endTime.getTime() - currTime.getTime())}</p>
        </div>,
      );
    }
  }

  return (
    <>
      <div className="current">{currentConditions.length > 1 ? currentConditions : null}</div>
      <div className="upcoming">{nextConditions}</div>
    </>
  );
}

export default Map;
