/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Geometry: THREE.Mesh;
  };
  materials: {
    Material_35: THREE.MeshStandardMaterial;
  };
};

export function IKEAWagon(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/model/IKEA-wagon.glb") as GLTFResult;
  
  return (
    <group {...props} dispose={null} position={[0, -8.3, 0]}
    scale={11.9}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          geometry={nodes.Geometry.geometry}          
        >
            {/* create white half-transparent material */}
            <meshPhongMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/model/IKEA-wagon.glb");
