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
  const [magnified, setMagnified] = useState(false);
  const [complete, setComplete] = useState(false)
  const [timer, setTimer] = useState({
    started: false,
    now: null,
    startTime: null
  })

  const intervalRef = useRef(null);
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
    fetch(`${import.meta.env.VITE_URL}/api/remaining`, { mode: "cors" })
      .then(response => { return response.json() })
      .then(data => {
        if (data.remaining.length > 0) {
          characterRef.current = [...data.remaining]
        }
      }).catch(err => console.error(err))
  }, [])

  return (
    <>
      <Header
        setTimer={setTimer} timer={timer}
        setShowInfo={setShowInfo} showInfo={showInfo} characterRef={characterRef} magnified={magnified} setMagnified={setMagnified} />

      {showInfo ?
        <>
          <Info setShowInfo={setShowInfo} timer={timer} setTimer={setTimer} handleTimerStart={handleTimerStart} />
          <img src={wallyWave} alt="" id='wallywave' />
        </>
        : <Image setComplete={setComplete} magnified={magnified} characterRef={characterRef} />
      }
      {complete ? <Complete setComplete={setComplete} intervalRef={intervalRef} setShowInfo={setShowInfo} timer={timer} setTimer={setTimer} characterRef={characterRef} /> : null}
    </>
  )
}

export default App
