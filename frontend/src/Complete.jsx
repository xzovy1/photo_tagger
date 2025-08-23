import { useEffect } from "react";

const Complete = ({ setComplete, intervalRef }) => {

    function handleStop() {
        clearInterval(intervalRef.current)
    }
    const addScore = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData)


        await fetch(`${import.meta.env.VITE_URL}/api/complete`,
            { mode: "cors", method: "post", body: formData })
            .then(response => response.json())
            .then(d => console.log(d))
        e.target.blur();
        setComplete(false)
    }
    useEffect(() => { handleStop(); }, [])
    return (
        <div className="modal completed">
            <h3>Good work, you did it!</h3>

            <form onSubmit={addScore}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" min={2} max={20} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Complete;