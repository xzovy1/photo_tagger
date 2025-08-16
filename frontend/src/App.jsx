import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CastleImage from './CastleImage.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Where's Waldo</h1>
      <CastleImage />
    </>
  )
}

export default App
