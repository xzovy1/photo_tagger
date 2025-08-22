import characters from "./characters";
const GameStats = ({ startTime, now }) => {

    const characterArr = [...characters];
    let secondsPassed = 0;
    if (startTime != null && now != null) {
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
                <span>
                    <ul>
                        {characterArr.map(character => { return <li key={character.id}>{character.name}</li> })}
                    </ul>
                </span>
            </div>
        </div>
    )
}

export default GameStats;