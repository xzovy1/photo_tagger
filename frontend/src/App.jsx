import { useState, useRef, useEffect } from 'react'
import './App.css'
import Image from './Image.jsx'
import CharacterSelect from './CharacterSelect.jsx'
import wallyWave from "./assets/waldo-wave.jpg"
import Info from './Info.jsx'
import characters from './characters.js'
import Header from './Header.jsx'
import Complete from './Complete.jsx'

function App() {
  const [showInfo, setShowInfo] = useState(true);
  const [imageClicked, setImageClicked] = useState(false);

  const [selectedLocation, setLocation] = useState({ x: null, y: null });
  const [imageDimensions, setImageDimensions] = useState({ left: null, right: null, top: null, bottom: null });
  const [magnified, setMagnified] = useState(false);
  const [complete, setComplete] = useState(false)

  const [timer, setTimer] = useState({
    started: false,
    now: null,
    startTime: null
  })


  const intervalRef = useRef(null);
  const imageRef = useRef(null)
  const locatorsRef = useRef(null);
  const characterRef = useRef([...characters])

  function handleTimerStart() {
    const start = Date.now()
    setTimer({
      now: Date.now(),
      startTime: start,
      started: true,
      ...timer,
    })
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer({ now: Date.now(), startTime: start, started: true })
    }, 10);
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
          console.log(data.remaining)
          characterRef.current = [...data.remaining]
        }
      }).catch(err => console.error(err))
  }, [])

  const cancelLocation = () => {
    setLocation({ x: null, y: null });
    const locators = locatorsRef.current
    locators.children[locators.children.length - 1].remove();
    setImageClicked(false)
  }


  return (
    <>
      <Header
        setTimer={setTimer} timer={timer}
        setShowInfo={setShowInfo} showInfo={showInfo} characterRef={characterRef} magnified={magnified} setMagnified={setMagnified} />

      {imageClicked ?
        <CharacterSelect selectedLocation={selectedLocation} setImageClicked={setImageClicked} cancelLocation={cancelLocation} setComplete={setComplete} locatorsRef={locatorsRef} imageDimensions={imageDimensions} characterRef={characterRef} />
        : null
      }
      {showInfo ?
        <>
          <Info setShowInfo={setShowInfo} timer={timer} setTimer={setTimer} handleTimerStart={handleTimerStart} />
          <img src={wallyWave} alt="" id='wallywave' />
        </>
        : <Image imageClicked={imageClicked} setImageClicked={setImageClicked} selectedLocation={selectedLocation} setLocation={setLocation} magnified={magnified} locatorsRef={locatorsRef} imageRef={imageRef} showInfo={showInfo} imageDimensions={imageDimensions} setImageDimensions={setImageDimensions} />
      }
      {complete ? <Complete setComplete={setComplete} intervalRef={intervalRef} setShowInfo={setShowInfo} timer={timer} setTimer={setTimer} characterRef={characterRef} /> : null}
    </>
  )
}

export default App
