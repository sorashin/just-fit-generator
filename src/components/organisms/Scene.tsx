
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'
import { useRef } from 'react';


const BoxScene = () => {
    const boxRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    boxRef.current!.rotation.y += 0.02;
  });
  
    return (
      <>
        <Box ref={boxRef} args={[1, 1, 1]} rotation={[0.5, 0, 0]}>
          <meshNormalMaterial />
        </Box>
        <ambientLight />
      </>
    );
  };

function Scene() {
    
  return (
    <Canvas camera={{ fov: 70, position: [0, 0, 3] }}>
      <OrbitControls />
      <BoxScene/>
    </Canvas>
  )
}

export default Scene
