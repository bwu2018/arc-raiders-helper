
function formatTime(ms: number) {
    let date = new Date(ms);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${hours}:${formattedMinutes}:${formattedSeconds}`
}

function Map({currTime, mapName, conditions} : {currTime: Date; mapName: string; conditions: {name: string; start: string; end: string}[]}) {
    // const currUTCTime = new Date(currTime.getTime() + (currTime.getTimezoneOffset() * 60 * 1000));
    // let hour = currUTCTime.getHours();

    let conditionName = "";
    let startTime = new Date();
    let endTime = new Date();

    for (let i = 0; i < conditions.length; i++) {
        const startHour = parseInt(conditions[i].start.split(":")[0], 10);
        startTime.setUTCHours(startHour, 0, 0);

        const endHour = parseInt(conditions[i].end.split(":")[0], 10);
        endTime.setUTCHours(endHour, 0, 0);
        
        if (startTime.getTime() <= currTime.getTime() && endTime.getTime() > currTime.getTime()) {
            conditionName = conditions[i].name;
            break;
        }
    }

    if (conditionName == "") {
        return;
    }
    
    // TODO: Deal with 11 PM -> 12 AM issues
    // TODO: Technically can have multiple map conditions like Matriarch and Cold Snap at the same time
    return (
        <>  
            <h2>{conditionName}</h2>
            {/* <p>{startTime.getUTCHours()}:{startTime.getUTCMinutes()}:{startTime.getUTCSeconds()}</p> */}
            {/* <p>{endTime.getUTCHours()}:{endTime.getUTCMinutes()}:{endTime.getUTCSeconds()}</p> */}
            {/* <p>{currTime.getHours()}:{currTime.getMinutes()}:{currTime.getSeconds()}</p> */}
            <p>{formatTime(endTime.getTime() - currTime.getTime())}</p>
        </>
    );
}

export default Map;
