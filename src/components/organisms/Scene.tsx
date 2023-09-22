
import { Canvas } from '@react-three/fiber'
import {  OrbitControls } from '@react-three/drei'
import Cases from '../three/Cases';
import * as THREE from 'three';
import { useControls } from "leva";




function Scene() {
  const { height, depth, width, radius, splitX, splitY, splitZ, offset } = useControls({
    height: {
      value: .5,
      min: 0,
      max: 2,
      step: .01,
    },
    depth: {
      value: 1,
      min: 0,
      max: 2,
      step: .01,
    },
    width: {
      value: 1,
      min: 0,
      max: 2,
      step: .01,
    },
    radius: {
      value: .03,
      min: 0,
      max: .2,
      step: .01,
    },
    splitX: {
      value: 3,
      min: 1,
      max: 10,
      step: 1,
      
    },
    splitY: {
      value: 3,
      min: 1,
      max: 10,
      step: 1,
    },
    splitZ: {
      value: 3,
      min: 1,
      max: 10,
      step: 1,
    },
    offset: {
      value: 0.005,
      min: 0,
      max: 1,
      step: 0.001,
    }
  })
  return (
    <div className='fixed inset-0'>
    <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
      <OrbitControls />
      <Cases width={width} depth={depth} height={height} radius={radius} split={{
          x: splitX,
          y: splitY,
          z: splitZ
        }} gap={0.01} thickness={.01} offset={offset}/>
      <primitive object={new THREE.AxesHelper(10)} />
      <ambientLight/>
      <hemisphereLight intensity={0.4} groundColor="white" />
      <directionalLight position={[10, -15, -10]} intensity={0.5} />
      <spotLight position={[5, 10, -15]} intensity={1} angle={0.1} penumbra={1} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.000001} />
    </Canvas>
    </div>
  )
}

export default Scene
