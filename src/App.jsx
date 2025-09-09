import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SimpleDrawing from './simpleDrawing'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SimpleDrawing></SimpleDrawing>
    </>
  )
}

export default App
