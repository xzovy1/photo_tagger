import { useState } from 'react'
import './App.css'
import CastleImage from './CastleImage.jsx'
import CharacterSelect from './CharacterSelect.jsx'
import wallyLogo from "./assets/wheres-wally-logo.jpg"
import wallyWave from "./assets/waldo-wave.jpg"

function App() {
  const [imageClicked, setImageClicked] = useState(false);
  const [selectedLocation, setLocation] = useState({x: null, y: null});
  return (
    <>
      <div className='header'>
        <img src={wallyLogo} alt=""  className='logo'/>
        <h1>Where's Waldo</h1>
      </div>
      {imageClicked ? <CharacterSelect selectedLocation={selectedLocation} setImageClicked={setImageClicked}/> : null}
      <CastleImage imageClicked={imageClicked} setImageClicked={setImageClicked} selectedLocation={selectedLocation} setLocation={setLocation}/>
      <img src={wallyWave} alt="" id='wallywave'/>
    </>
  )
}

export default App
