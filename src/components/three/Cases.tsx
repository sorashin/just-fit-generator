/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useMemo, useLayoutEffect, useEffect } from 'react';
import * as THREE from 'three';
import { Geometry, Base, Subtraction, Addition } from '@react-three/csg'
import { SplitParameter} from '@/store/parameterAtoms';


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
    const config = useMemo(() => ({ depth:height, bevelEnabled: false }), [height])
    useLayoutEffect(() => {
        geometry.current!.translate(0, 0, -height / 2)
        // 上向きに回転
        geometry.current!.rotateX(Math.PI / 2)
        // BOXの底面をXZ平面に合わせる
        geometry.current!.translate(0, height / 2, 0)
        
        geometry.current!.computeVertexNormals()
    }, [shape])
    return <extrudeGeometry ref={geometry} args={[shape, config]} />
}


type CaseProps = {
    split: SplitParameter;
    width: number;
    depth: number;
    height: number;
    radius: number;
    gap: number;
    thickness: number;
    offset: number;
    position: [number, number, number];
    length: number;
  };



const Case = ({ split, width, depth, height, radius, gap,thickness, position, offset, length}:CaseProps) => {
    useEffect(()=>{
        console.log('width:',width, 'depth', depth, 'height', height, 'radius', radius, 'thickness', thickness)
    })
    const instancedMeshRef = useRef<THREE.InstancedMesh>(null)
    
    useLayoutEffect(() => {
        let index = 0
        const temp = new THREE.Object3D()
        // Set positions
        for (let i = 0; i < split.x; i++) {
          for(let j = 0; j < split.y; j++){
            for(let k = 0; k < split.z; k++){
                const id = index++
                temp.position.set((width+gap)*i, (height+gap)*k, (depth+gap)*j)
                temp.updateMatrix()
                instancedMeshRef.current!.setMatrixAt(id, temp.matrix)
            }
          }
        }
        // Update the instance
        instancedMeshRef.current!.instanceMatrix.needsUpdate = true
      }, [depth, height, split.x, split.y, split.z,  width])
    return (
        
        <instancedMesh ref={instancedMeshRef} args={[undefined, undefined, length]}>
            <Geometry>
                <Base rotation={[0, 0, 0]} position={[0,0,0]}>
                    <CaseGeometry width={width} depth={depth} height={height} radius={radius}/>
                </Base>
                <Subtraction rotation={[0, 0, 0]} position={[0, thickness, 0]}>
                    <CaseGeometry width={width-thickness*2} depth={depth-thickness*2} height={height} radius={radius}/>
                </Subtraction>
                <Addition position={[position[0], position[1]-thickness, position[2]]}>
                    {/* <cylinderGeometry args={[0.1, 0.1, 1, 32, 1]} /> */}
                    {/* <CaseGeometry width={width-thickness*2} depth={depth-thickness*2} height={height} radius={radius}/> */}
                    <Geometry>
                        <Base position={[0, 0, 0]}>
                            <CaseGeometry width={width-(thickness+offset)*2} depth={depth-(thickness+offset)*2} height={thickness} radius={radius}/>
                        </Base>
                        <Subtraction position={[0, 0, 0]}>
                            <CaseGeometry width={width-(thickness*2+offset)*2} depth={depth-(thickness*2+offset)*2} height={thickness} radius={radius}/>
                        </Subtraction>
                    </Geometry>

                </Addition>
            </Geometry>
            <meshStandardMaterial color="#2A8AFF" />
            
        </instancedMesh>
    );
  };
  type CasesProps = {
    width: number;
    depth: number;
    height: number;
    radius: number;
    split: SplitParameter;
    gap: number;
    offset: number;
    thickness: number;
  };
  //add props
  const Cases = ({ width, depth, height, radius, split, gap, offset, thickness }: CasesProps) => {
    
    const dividedWidth = (width-(split.x-1)*gap)/split.x
    const dividedDepth = (depth-(split.y-1)*gap)/split.y
    const dividedHeight = (height-(split.z-1)*gap)/split.z
    
    return(
        // BOX軍を中央寄せ
        <group position={[dividedWidth/2-width/2,0,dividedDepth/2-depth/2]}>
            <Case length ={split.x*split.y*split.z} split={split} width={dividedWidth} depth={dividedDepth} height={dividedHeight} radius={radius} gap={gap} thickness={thickness} offset={offset} position={[0,0,0]}></Case>
        </group>
        
    )
  }
  
  export default Cases;