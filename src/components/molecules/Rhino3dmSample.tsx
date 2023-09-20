import {  useEffect, useState } from 'react'

import Scene from '@/components/organisms/Scene'
import { RhinoModule, Sphere, File3dm } from "rhino3dm"



function Rhino3dmSample() {
  
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
      <button onClick={()=>onClick()}>DOWNLOAD</button>
    </>
  )
}

export default Rhino3dmSample
