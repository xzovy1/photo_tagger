import { useState, useRef } from 'react'
import './App.css'
import Image from './Image.jsx'
import CharacterSelect from './CharacterSelect.jsx'
import wallyLogo from "./assets/wheres-wally-logo.jpg"
import wallyWave from "./assets/waldo-wave.jpg"
import Info from './Info.jsx'

function App() {
  const [showInfo, setShowInfo] = useState(true);
  const [imageClicked, setImageClicked] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedLocation, setLocation] = useState({x: null, y: null});
  const [magnified, setMagnified] = useState(false);
  const locatorsRef = useRef(null);

  const handleMagnifier = (e) => {
    setMagnified(!magnified);
    e.target.blur();
  }
  const cancelLocation = () => {
    setLocation({x: null, y:null});
    const locators = locatorsRef.current
    locators.children[locators.children.length-1].remove();
  } 

  return (
    <>
      <div className='header'>
        <img src={wallyLogo} alt=""  className='logo' onClick={()=>setShowInfo(!showInfo)}/>
        <h1>Where's Waldo?</h1>
        {!showInfo ? <button onClick={handleMagnifier}>{!magnified ? "Show Magnifier" : "Hide Magnifier"}</button> : null}
      </div>
      {imageClicked ? <CharacterSelect selectedLocation={selectedLocation} setImageClicked={setImageClicked} cancelLocation={cancelLocation} ref={locatorsRef}/> : null}
      { showInfo ? 
        <>
          <Info setShowInfo={setShowInfo} timerStarted={timerStarted} setTimerStarted={setTimerStarted}/>  
          <img src={wallyWave} alt="" id='wallywave'/>
        </>:
        <Image imageClicked={imageClicked} setImageClicked={setImageClicked} selectedLocation={selectedLocation} setLocation={setLocation} magnified={magnified} ref={locatorsRef} showInfo={showInfo}/>
      }
    </>
  )
}

export default App
