import { Fragment } from "react";
import characters from "./characters.js"

const CharacterSelect = ({setImageClicked, selectedLocation, cancelLocation}) => {
    function submit (e)  {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const charName = formData.get("character")
        console.log(selectedLocation, charName)
        setImageClicked(false)
    }
    return (
        <div id="modal">
            <form onSubmit={submit} className="characterForm">
                <button onClick={cancelLocation}>Cancel Selection</button>
                <div className="characters"> 
                {characters.map(character => {
                    return (
                        <div key={character.id} className="characterOption">

                            <input type="radio" name="character" id={character.name} value={character.name}/>
                            <label htmlFor={character.name}>{character.name}</label>
                            <img src={character.src} alt={character.name} />
                        </div>
                    )
                })}
                </div>
                <button>Choose</button>
            </form>
        </div>
    )
}

export default CharacterSelect