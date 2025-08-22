import { useState, useRef, useEffect } from 'react'
import './App.css'
import Image from './Image.jsx'
import CharacterSelect from './CharacterSelect.jsx'
import wallyLogo from "./assets/wheres-wally-logo.jpg"
import wallyWave from "./assets/waldo-wave.jpg"
import Info from './Info.jsx'
import GameStats from './GameStats.jsx'
import characters from './characters.js'

function App() {
  const [showInfo, setShowInfo] = useState(true);
  const [imageClicked, setImageClicked] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedLocation, setLocation] = useState({ x: null, y: null });
  const [imageDimensions, setImageDimensions] = useState({ left: null, right: null, top: null, bottom: null });
  const [magnified, setMagnified] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);

  const intervalRef = useRef(null);
  const imageRef = useRef(null)
  const locatorsRef = useRef(null);
  const characterRef = useRef([...characters])

  function handleTimerStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }
  function handleStop() {
    clearInterval(intervalRef.current)
  }

  useEffect(() => {
    const handleResize = () => {
      const image = imageRef.current.getBoundingClientRect();
      setImageDimensions(image)
    };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize) }
  }, [])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/api/remaining`, { mode: "cors" })
      .then(response => { return response.json() })
      .then(data => {
        if (data.remaining.length > 0) {
          characterRef.current = [...data.remaining]
        }
      }).catch(err => console.err(err))
  }, [])

  const handleMagnifier = (e) => {
    setMagnified(!magnified);
    e.target.blur();
  }
  const cancelLocation = () => {
    setLocation({ x: null, y: null });
    const locators = locatorsRef.current
    locators.children[locators.children.length - 1].remove();
    setImageClicked(false)
  }

  return (
    <>
      <div className='header'>
        <img src={wallyLogo} alt="" className='logo' onClick={() => setShowInfo(!showInfo)} />
        <h1>Where's Waldo?</h1>
        {
          !showInfo ? <button onClick={handleMagnifier}>{!magnified ? "Show Magnifier" : "Hide Magnifier"}</button>
            : <GameStats startTime={startTime} setStartTime={setStartTime} setNow={setNow} now={now} intervalRef={intervalRef} characterRef={characterRef} />
        }
      </div>
      {imageClicked ? <CharacterSelect selectedLocation={selectedLocation} setImageClicked={setImageClicked} cancelLocation={cancelLocation} ref={locatorsRef} imageDimensions={imageDimensions} characterRef={characterRef} /> : null}
      {showInfo ?
        <>
          <Info setShowInfo={setShowInfo} timerStarted={timerStarted} setTimerStarted={setTimerStarted} handleTimerStart={handleTimerStart} />
          <img src={wallyWave} alt="" id='wallywave' />
        </> :
        <Image imageClicked={imageClicked} setImageClicked={setImageClicked} selectedLocation={selectedLocation} setLocation={setLocation} magnified={magnified} locatorsRef={locatorsRef} imageRef={imageRef} showInfo={showInfo} imageDimensions={imageDimensions} setImageDimensions={setImageDimensions} />
      }
    </>
  )
}

export default App
