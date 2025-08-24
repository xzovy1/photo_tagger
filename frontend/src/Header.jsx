import wallyLogo from "./assets/wheres-wally-logo.jpg"
import GameStats from "./GameStats";

import { useState, useRef, useEffect } from "react";

const Header = ({ timer, setTimer, setShowInfo, showInfo, characterRef, intervalRef, magnified, setMagnified }) => {

    const handleMagnifier = (e) => {
        setMagnified(!magnified);
        e.target.blur();
    }
    return (

        <div className='header'>
            <img src={wallyLogo} alt="" className='logo' onClick={() => { if (true) { setShowInfo(!showInfo) } }} />
            <h1>Where's Waldo?</h1>
            {
                !showInfo ? <button onClick={handleMagnifier}>{!magnified ? "Show Magnifier" : "Hide Magnifier"}</button>
                    : <GameStats timer={timer} setTimer={setTimer} intervalRef={intervalRef} characterRef={characterRef} />
            }
        </div>
    )
}

export default Header;