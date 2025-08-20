import { useEffect, useState } from "react";

const Info = ({ setShowInfo }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const handleClose = async () => {
        setLoading(true);

        await fetch(`${process.env.VITE_URL}/api/start`)
            .then(response => { response.json() })
            .then(data => console.log(data));
        setShowInfo(false);
        //start game timer
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
            <button onClick={handleClose}>Begin</button>

        </div>
    )
}
export default Info;