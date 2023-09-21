/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import * as THREE from 'three';
import { Geometry, Base, Subtraction } from '@react-three/csg'
import { useAtom } from 'jotai';
import { SplitParameter, offsetAtom, radiusAtom, sizeAtom, splitAtom, thicknessAtom } from '@/store/parameterAtoms';


type CaseGeometryProps = {
    width: number;
    depth: number;
    height: number;
    radius: number;
  };
const CaseGeometry = ({ width, height, radius, depth }: CaseGeometryProps) => {
    const geometry = useRef<THREE.ExtrudeGeometry>(null)
    const shape = useMemo(() => {
        const s = new THREE.Shape()
        s.moveTo(-width / 2, -depth / 2 + radius)
        s.lineTo(-width / 2, depth / 2 - radius)
        s.absarc(-width / 2 + radius, depth / 2 - radius, radius, 1 * Math.PI, 0.5 * Math.PI, true)
        s.lineTo(width / 2 - radius, depth / 2)
        s.absarc(width / 2 - radius, depth / 2 - radius, radius, 0.5 * Math.PI, 0 * Math.PI, true)
        s.lineTo(width / 2, -depth / 2 + radius)
        s.absarc(width / 2 - radius, -depth / 2 + radius, radius, 2 * Math.PI, 1.5 * Math.PI, true)
        s.lineTo(-width / 2 + radius, -depth / 2)
        s.absarc(-width / 2 + radius, -depth / 2 + radius, radius, 1.5 * Math.PI, 1 * Math.PI, true)
        return new THREE.Shape(s.getPoints(10))
    }, [width, height, radius, depth])
    const config = useMemo(() => ({ height, bevelEnabled: false }), [height])
    useLayoutEffect(() => {
        // 中心に移動
        geometry.current!.translate(0, 0, -height / 2)

        // 上向ける
        geometry.current!.rotateX(Math.PI / 2)

        geometry.current!.computeVertexNormals()
    }, [shape])
    return <extrudeGeometry ref={geometry} args={[shape, config]} />
}
type CaseProps = {
    width: number;
    depth: number;
    height: number;
    radius: number;
    thickness: number;
  };
const Case = ({ width, depth, height, radius, thickness}:CaseProps) => {
    useEffect(()=>{
        console.log(width, depth, height, radius, thickness)
    })
    return (
        
        <mesh castShadow receiveShadow>
            <Geometry>
                <Base rotation={[0, 0, 0]} position={[0,0,0]}>
                    <CaseGeometry width={width} depth={depth} height={height} radius={radius}/>
                </Base>
                <Subtraction rotation={[0, 0, 0]} position={[0, thickness, 0]}>
                    <CaseGeometry width={width-thickness*2} depth={depth-thickness*2} height={height} radius={radius}/>
                    {/* <cylinderGeometry args={[0.1, 0.1, 1, 32, 1]} /> */}
                </Subtraction>
            </Geometry>
            <meshStandardMaterial color="#2A8AFF" />
        </mesh>
    );
  };
  type CasesProps = {
    width: number;
    depth: number;
    height: number;
    radius: number;
    split: SplitParameter;
    gap: number;
    thickness: number;
  };
  //add props
  const Cases = ({ width, depth, height, radius, split, gap, thickness }: CasesProps) => {
    useEffect(()=>{
        console.log(width, depth, height, radius, split, gap, thickness)
    })
    return(
        <Case width={(width-2*gap)/split.x} depth={(depth-2*gap)/split.y} height={height} radius={radius} thickness={thickness}></Case>
    )
  }
  
  export default Cases;