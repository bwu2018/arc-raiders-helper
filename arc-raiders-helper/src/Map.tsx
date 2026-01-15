
function formatTime(ms: number) {
    let date = new Date(ms);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${hours}:${formattedMinutes}:${formattedSeconds}`
}

function Map({currTime, conditions} : {currTime: Date; conditions: {name: string; start: string; end: string}[]}) {
    // const currUTCTime = new Date(currTime.getTime() + (currTime.getTimezoneOffset() * 60 * 1000));
    // let hour = currUTCTime.getHours();
    const currentConditions = [<h3>Current</h3>];
    const nextConditions = [<h3>Upcoming</h3>];

    let startTime = new Date();
    let endTime = new Date();

    let nextTime = new Date();
    let savedNextHour = -1

    for (let i = 0; i < conditions.length; i++) {
        const startHour = parseInt(conditions[i].start.split(":")[0], 10);
        startTime.setUTCHours(startHour, 0, 0);

        const endHour = parseInt(conditions[i].end.split(":")[0], 10);
        endTime.setUTCHours(endHour, 0, 0);

        // Set end a day ahead if it wraps to the next day
        if (endTime.getTime() < startTime.getTime()) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const nextHour = parseInt(conditions[(i+1) % conditions.length].start.split(":")[0], 10);
        nextTime.setUTCHours(nextHour, 0, 0);

        // Set potential next condition a day ahead if it wraps to the next day
        if (nextTime.getTime() < startTime.getTime()) {
            nextTime.setDate(nextTime.getDate() + 1);
        }

        if (currTime.getTime() < nextTime.getTime()) {
            if (savedNextHour == -1 || nextTime.getHours() == savedNextHour) {
                savedNextHour = nextTime.getHours();
                nextConditions.push(<div className="condition">
                    <p>{conditions[(i+1) % conditions.length].name}</p>
                    <p className="time">{formatTime(nextTime.getTime() - currTime.getTime())}</p>
                    </div>);
            }
        }
        
        if (startTime.getTime() <= currTime.getTime() && endTime.getTime() > currTime.getTime()) {
            let conditionName = conditions[i].name;
            currentConditions.push(<div className="condition">
                <p>{conditionName}</p>
                <p className="time">{formatTime(endTime.getTime() - currTime.getTime())}</p>
                </div>);
        }
    }
    
    return (
        <>  
            <div className="current">
                {currentConditions.length > 1 ? currentConditions : null}
            </div>
            <div className="upcoming">
                {nextConditions}
            </div>
        </>
    );
}

export default Map;
