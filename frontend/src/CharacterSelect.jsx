import { useState } from "react";
import characters from "./characters.js"

const CharacterSelect = ({ setImageClicked, selectedLocation, imageDimensions, locatorsRef, characterRef, setComplete }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const cancelLocation = () => {
        setLocation({ x: null, y: null });
        const locators = locatorsRef.current
        locators.children[locators.children.length - 1].remove();
        setImageClicked(false)
    }
    async function submit(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set("x", selectedLocation.x);
        formData.set("y", selectedLocation.y);
        formData.set("width", imageDimensions.width);
        formData.set("height", imageDimensions.height);
        setLoading(true)
        await fetch(`${import.meta.env.VITE_URL}/api/validate`,
            {
                mode: "cors",
                method: "post",
                body: formData
            })
            .then(response => {
                console.log(response.status)
                if (response.status >= 400) { setError("Errored") };
                return response.json();
            })
            .then(data => {
                const locators = locatorsRef.current
                if (data.valid) {
                    locators.children[locators.children.length - 1].classList.add("located");
                    setImageClicked(false)
                } else {
                    setError("Location incorrect!")
                }
                if (data.remaining) {
                    characterRef.current = [...data.remaining]
                    if (data.remaining.length == 0) {
                        setComplete(true);
                    }
                }

            })
            .catch(error => { setError(error); console.log(error) })
            .finally(() => setLoading(false))
    }
    return (
        <div className="modal">
            <button onClick={cancelLocation}>Cancel Selection</button>
            <form onSubmit={submit} className="characterForm">
                <div className="characters">
                    {characters.map(character => {
                        return (
                            <div key={character.id} className="characterOption">

                                <input type="radio" name="characterName" id={character.name} value={character.name} />
                                <label htmlFor={character.name}>{character.name}</label>
                                <img src={character.src} alt={character.name} />
                            </div>
                        )
                    })}
                </div>
                <button>Choose</button>
            </form>
            {error ? <div style={{ color: 'red' }}>{error}</div> : null}
        </div>
    )
}

export default CharacterSelect