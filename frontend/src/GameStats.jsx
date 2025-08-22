import { useEffect, useState, useRef } from "react";
const GameStats = ({startTime, setStartTime, now, setNow, intervalRef}) => {
    




    let secondsPassed = 0;
    if(startTime != null && now != null){
        secondsPassed = (now - startTime) / 1000;
    }

    return (
        <div>
            <div>
                <span>Current time: </span>
                <span id="timer">{secondsPassed.toFixed(3)}</span>
            </div>
            <div>
                <span>Characters Remaining: </span>
                <span></span>
            </div>
        </div>
    )
}

export default GameStats;