import { useState } from "react";
import characters from "./characters.js"

const CharacterSelect = ({setImageClicked, selectedLocation, cancelLocation, imageDimensions}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    async function submit (e)  {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set("x", selectedLocation.x);
        formData.set("y", selectedLocation.y);
        formData.set("width", imageDimensions.width);
        formData.set("height", imageDimensions.height);
        await fetch(`${import.meta.env.VITE_URL}/api/validate`, 
            {
                mode: "cors", 
                method: "post",
                body: formData      
            })
            .then(response => {
                if(response.status >= 400){ throw new Error("Error occurred")}
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => setError(error))
            .finally(()=>setLoading(false))
        setImageClicked(false)
    }
    return (
        <div id="modal">
                <button onClick={cancelLocation}>Cancel Selection</button>
            <form onSubmit={submit} className="characterForm">
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