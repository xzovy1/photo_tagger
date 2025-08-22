import { useEffect, useState } from "react";

const Info = ({ setShowInfo, timerStarted, setTimerStarted, handleTimerStart }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const beginRound = async () => {
        setLoading(true);
        if(!timerStarted){

            await fetch(`${import.meta.env.VITE_URL}/api/start`, {mode: "cors"})
            .then(response => {
                if(response.status >= 400){ throw new Error("Errored")}
                setTimerStarted(true);
                handleTimerStart();
                setShowInfo(false);
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => setError(error))
            .finally(()=>setLoading(false))
        }else{
            setLoading(false);
            setShowInfo(false);
        }
    }
    const hideInfo = () => {
        setShowInfo(false);
    }
    const rules = [
        "See if you can find Waldo, Wenda, Odlaw, Wizard Whitebeard and Woof!",
        "Click anywhere on the image to place a locator box and identify the character in the location.",
        "Click 'Cancel Selection' in popup box to cancel locator box placement",
        "You will be timed based on how quickly all the characters are found.",
        "Click 'Show Magnifier' to toggle the magnifier on and off.",
    ];
    const dummyScores = [
        "No Score found",
        "No Score found",
        "No Score found",
        "No Score found",
        "No Score found",
    ];
    useEffect(() => {
        // Fetch high scores from the server
    }, []);

    if(error){return (
        <div>
            <h1>An error occurred.</h1>
        </div>
    )}
    if(loading){return (
        <div>
            <h1>Loading...</h1>
        </div>
    )}
    return (
        <div>
            <div id="rules">
                <h2>Rules</h2>
                <ol>
                    {rules.map((rule, index) => {
                        return <li key={index}>{rule}</li>
                    })}
                </ol>
                <span>Good Luck!</span>
            </div>
            <div id="scoreboard">
                <h2>High Scores</h2>
                <ol>
                    {dummyScores.map((score, index) => {
                        return <li key={index}><em>{score}</em></li>
                    })}
                </ol>
            </div>
            {
                !timerStarted ? <button onClick={beginRound}>Begin</button>
                : <button onClick={hideInfo}>Close</button>
            }

        </div>
    )
}
export default Info;