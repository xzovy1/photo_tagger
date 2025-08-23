import wallyLogo from "./assets/wheres-wally-logo.jpg"
import GameStats from "./GameStats";

import { useState, useRef, useEffect } from "react";

const Header = ({ timerStarted, startTime, setShowInfo, showInfo, characterRef, intervalRef, setStartTime, setNow, now, magnified, setMagnified }) => {

    const handleMagnifier = (e) => {
        setMagnified(!magnified);
        e.target.blur();
    }
    return (

        <div className='header'>
            <img src={wallyLogo} alt="" className='logo' onClick={() => { if (timerStarted) { setShowInfo(!showInfo) } }} />
            <h1>Where's Waldo?</h1>
            {
                !showInfo ? <button onClick={handleMagnifier}>{!magnified ? "Show Magnifier" : "Hide Magnifier"}</button>
                    : <GameStats startTime={startTime} setStartTime={setStartTime} setNow={setNow} now={now} intervalRef={intervalRef} characterRef={characterRef} />
            }
        </div>
    )
}

export default Header;