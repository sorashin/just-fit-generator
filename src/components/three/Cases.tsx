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
    width: number;
    depth: number;
    height: number;
    radius: number;
    thickness: number;
    offset: number;
    position: [number, number, number];
  };

// const Sample = ({ width, depth, height, radius, thickness, position}:CaseProps) => {
//         return(
//             <mesh position={[0,2,0]} >
//                 <CaseGeometry width={width} depth={depth} height={height} radius={radius}/>
//                 {/* mesh physical material */}
//                 <meshPhysicalMaterial color="#0cf73f" />
//             </mesh>
//         )
//     }

const Case = ({ width, depth, height, radius, thickness, position, offset}:CaseProps) => {
    useEffect(()=>{
        console.log('width:',width, 'depth', depth, 'height', height, 'radius', radius, 'thickness', thickness)
    })
    return (
        
        <mesh castShadow receiveShadow>
            <Geometry>
                <Base rotation={[0, 0, 0]} position={position}>
                    <CaseGeometry width={width} depth={depth} height={height} radius={radius}/>
                </Base>
                <Subtraction rotation={[0, 0, 0]} position={[position[0], position[1]+thickness, position[2]]}>
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

            
            {
                (function () {
                    const list = [];
                    for (let i = 0; i < split.x; i++) {
                        for (let j = 0; j < split.y; j++) {
                            for (let k = 0; k < split.z; k++) {
                                list.push(<Case key={i+'_'+j} position={[(dividedWidth+gap)*i,(dividedHeight+gap)*k,(dividedDepth+gap)*j]} width={dividedWidth} depth={dividedDepth} height={dividedHeight} radius={radius} thickness={thickness} offset={offset}></Case>);
                            }
                        }
                    }
                    return list;
                }())
            }
        </group>
        
    )
  }
  
  export default Cases;