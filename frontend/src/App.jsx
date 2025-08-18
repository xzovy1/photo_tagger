import { useState } from 'react'
import './App.css'
import Image from './Image.jsx'
import CharacterSelect from './CharacterSelect.jsx'
import wallyLogo from "./assets/wheres-wally-logo.jpg"
import wallyWave from "./assets/waldo-wave.jpg"

function App() {
  const [imageClicked, setImageClicked] = useState(false);
  const [selectedLocation, setLocation] = useState({x: null, y: null});
  const [magnified, setMagnified] = useState(false);
  const handleMagnifier = (e) => {
    setMagnified(!magnified);
    e.target.blur();
  } 
  return (
    <>
      <div className='header'>
        <img src={wallyLogo} alt=""  className='logo'/>
        <h1>Where's Waldo?</h1>
        <button onClick={handleMagnifier}>{!magnified ? "Show Magnifier" : "Hide Magnifier"}</button>
      </div>
      {imageClicked ? <CharacterSelect selectedLocation={selectedLocation} setImageClicked={setImageClicked}/> : null}
      <Image imageClicked={imageClicked} setImageClicked={setImageClicked} selectedLocation={selectedLocation} setLocation={setLocation} magnified={magnified}/>
      
      <img src={wallyWave} alt="" id='wallywave'/>
    </>
  )
}

export default App
