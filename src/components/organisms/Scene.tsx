
import { Canvas } from '@react-three/fiber'
import {   Bounds, GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei'
import Cases from '../three/Cases';
import { useControls } from "leva";
import { IKEAWagon } from '../three/models/IKEAWagon';
import { Suspense } from 'react';




function Scene() {
  const { height, depth, width, radius, splitX, splitY, splitZ, offset, isModel } = useControls({
    height: {
      value: .9,
      min: 0,
      max: 2,
      step: .01,
    },
    depth: {
      value: 3.5,
      min: 0,
      max: 10,
      step: .01,
    },
    width: {
      value: 4.5,
      min: 0,
      max: 10,
      step: .01,
    },
    radius: {
      value: .25,
      min: 0,
      max: .5,
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
    },
    isModel: {
      value: false,
    }
  })
  return (
    <div className='fixed inset-0'>
    <Canvas camera={{ fov: 50, position: [3, 3, 3] }}>
      <color attach="background" args={['#dadada']} />
      <Suspense fallback={null}>
        <Bounds fit clip damping={6} margin={1.5}>

        <Cases width={width} depth={depth} height={height} radius={radius} split={{
          x: splitX,
          y: splitY,
          z: splitZ
        }} gap={0.01} thickness={.01} offset={offset}/>
        </Bounds>
        {isModel&&<IKEAWagon />}
        <ambientLight/>
        <hemisphereLight intensity={0.4} groundColor="white" />
        <directionalLight position={[10, 15, -10]} intensity={0.5} />
        <spotLight position={[5, 10, -15]} intensity={1} angle={0.1} penumbra={1} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.000001} />
      </Suspense>
      {/* <primitive object={new THREE.AxesHelper(10)} /> */}
      <GizmoHelper alignment="bottom-left" margin={[80, 80]} onUpdate={() => {}}>
        <GizmoViewport axisColors={['#FD5B5D', '#38E2B3', '#2B99FF']} labelColor="#fff" />
      </GizmoHelper>
      <gridHelper args={[20, 20, 0xbbbbbb, 0xcccccc]} />
      <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} makeDefault dampingFactor={0.3}/>
      {/* <ArcballControls  enablePan={false} makeDefault /> */}
    </Canvas>
    </div>
  )
}

export default Scene
