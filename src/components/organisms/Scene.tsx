
import { Canvas } from '@react-three/fiber'
import {  OrbitControls } from '@react-three/drei'
import Cases from '../three/Cases';
import * as THREE from 'three';
import { useControls } from "leva";



function Scene() {
  const { height, depth, width } = useControls({
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
  })
  return (
    <div className='fixed inset-0'>
    <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
      <OrbitControls />
      <Cases width={width} depth={depth} height={height} radius={0.03} split={{
          x: 3,
          y: 3
        }} gap={0.01} thickness={.01} />
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
