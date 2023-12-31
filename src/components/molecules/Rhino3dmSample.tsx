import {  useEffect, useState } from 'react'

import Scene from '@/components/organisms/Scene'
import { RhinoModule, Sphere, File3dm } from "rhino3dm"



function Rhino3dmSample() {
  
  const [sphere, setSphere] = useState<Sphere>()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChange = (e: any) => {
    window.rhino3dm().then((Module: RhinoModule) => {
      setSphere(new Module.Sphere([1, 2, 3], Number(e.target.value)))
      console.log(sphere)
    })
  }
  const downloadSphereAsStl = () => {
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
    const blob = new Blob([byte], { type: "Rhino3dmSamplelication/octect-stream" })
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
      <Scene />
      <p>
        {sphere
          ? "生成された Sphere の直径は " + sphere.diameter + " です。"
          : "Sphere はまだ作成されていません"}
      </p>
      <input type="range" min="1" max="100" onChange={onChange} />
      <button 
        onClick={()=>downloadSphereAsStl()}
        className="px-4 py-2 text-base text-white rounded-md bg-black hover:bg-gray-700 z-10 absolute right-4 bottom-4"
      >DOWNLOAD</button>
    </>
  )
}

export default Rhino3dmSample
