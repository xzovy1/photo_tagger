import { useState, useRef, useEffect } from 'react'
import './App.css'
import Image from './Image.jsx'
import CharacterSelect from './CharacterSelect.jsx'
import wallyLogo from "./assets/wheres-wally-logo.jpg"
import wallyWave from "./assets/waldo-wave.jpg"
import Info from './Info.jsx'

function App() {
  const [showInfo, setShowInfo] = useState(false);
  const [imageClicked, setImageClicked] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [selectedLocation, setLocation] = useState({x: null, y: null});
  const [imageDimensions, setImageDimensions] = useState({left: null, right: null, top: null, bottom: null});
  const [magnified, setMagnified] = useState(false);

  const imageRef = useRef(null)
  const locatorsRef = useRef(null);
  useEffect(()=>{
    const handleResize = () => {
      const image = imageRef.current.getBoundingClientRect();
      setImageDimensions(image)
    };
    window.addEventListener("resize", handleResize);
    return ()=>{window.removeEventListener("resize", handleResize)}
  }, [])

  const handleMagnifier = (e) => {
    setMagnified(!magnified);
    e.target.blur();
  }
  const cancelLocation = () => {
    setLocation({x: null, y:null});
    const locators = locatorsRef.current
    locators.children[locators.children.length-1].remove();
    setImageClicked(false)
  } 

  return (
    <>
      <div className='header'>
        <img src={wallyLogo} alt=""  className='logo' onClick={()=>setShowInfo(!showInfo)}/>
        <h1>Where's Waldo?</h1>
        {!showInfo ? <button onClick={handleMagnifier}>{!magnified ? "Show Magnifier" : "Hide Magnifier"}</button> : null}
      </div>
      {imageClicked ? <CharacterSelect selectedLocation={selectedLocation} setImageClicked={setImageClicked} cancelLocation={cancelLocation} ref={locatorsRef} imageDimensions={imageDimensions}/> : null}
      { showInfo ? 
        <>
          <Info setShowInfo={setShowInfo} timerStarted={timerStarted} setTimerStarted={setTimerStarted}/>  
          <img src={wallyWave} alt="" id='wallywave'/>
        </>:
        <Image imageClicked={imageClicked} setImageClicked={setImageClicked} selectedLocation={selectedLocation} setLocation={setLocation} magnified={magnified} locatorsRef={locatorsRef} imageRef={imageRef} showInfo={showInfo} imageDimensions={imageDimensions} setImageDimensions={setImageDimensions}/>
      }
    </>
  )
}

export default App
