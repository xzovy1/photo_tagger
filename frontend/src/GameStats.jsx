
const GameStats = ({ startTime, now, characterRef }) => {

    let secondsPassed = 0;
    if (startTime != null && now != null) {
        secondsPassed = (now - startTime) / 1000;
    }
    console.log(characterRef.current)
    return (
        <div>
            <div>
                <span>Current time: </span>
                <span id="timer">{secondsPassed.toFixed(3)}</span>
            </div>
            <div>
                <span>Characters Remaining: </span>
                <span>
                    <ul>
                        {characterRef.current.map((character, index) => { return <li key={character.id}>{character.name}</li> })}
                    </ul>
                </span>
            </div>
        </div>
    )
}

export default GameStats;