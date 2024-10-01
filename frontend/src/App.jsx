import { useState } from 'react'
import './App.css'
import VehicleMap from "./components/VehicleMap"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VehicleMap/>
    </>
  )
}



export default App
