import {  useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Scene from '@/components/organisms/Scene'
import { RhinoModule, Sphere, File3dm } from "rhino3dm"

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rhino3dm: any
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [sphere, setSphere] = useState<Sphere>()

  const onClick = () => {
    window.rhino3dm().then((Module: RhinoModule) => {
      const doc: File3dm = new Module.File3dm()
  
      if (sphere) {
        const item = new Module.Sphere(
          sphere.center as number[],
          sphere.radius as number
        )
        doc.objects().addSphere(item, null)
        saveByteArray("sphere.3dm", doc.toByteArray())
      } else {
        alert("Sphere not created")
      }
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveByteArray = (fileName: string, byte: any) => {
    const blob = new Blob([byte], { type: "application/octect-stream" })
    const link = document.createElement("a")
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
  }

  useEffect(() => {
    window.rhino3dm().then((Module: RhinoModule) => {
      setSphere(new Module.Sphere([1, 2, 3], 16))
      console.log(sphere)
    })
  }, [])

  
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Scene />
      <p>
        {sphere
          ? "生成された Sphere の直径は " + sphere.diameter + " です。"
          : "Sphere はまだ作成されていません"}
      </p>
      <button onClick={()=>onClick()}>DOWNLOAD</button>
    </>
  )
}

export default App
