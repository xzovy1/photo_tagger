import { useEffect } from "react";

const Complete = ({ setComplete, intervalRef, setShowInfo, setTimerStarted, setNow, setStartTime }) => {

    function handleStop() {
        clearInterval(intervalRef.current)
    }
    const submit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData)


        await fetch(`${import.meta.env.VITE_URL}/api/complete`,
            { mode: "cors", method: "post", body: formData })
            .then(response => response.json())
            .then(d => console.log(d))
        e.target.blur();
        setComplete(false);
        setShowInfo(true);
        setTimerStarted(false);
        setNow(null);
        setStartTime(null);
    }
    useEffect(() => { handleStop(); }, [])
    return (
        <div className="modal completed">
            <h3>Good work, you did it!</h3>

            <form onSubmit={submit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" min={2} max={20} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Complete;