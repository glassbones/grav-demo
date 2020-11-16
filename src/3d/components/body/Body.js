import React, { Suspense, useRef, useState } from 'react'
import {useFrame} from 'react-three-fiber'
import { GRad } from './GRad';
import { GField } from './GField';
//import {useStore} from '../../../store'
//import create from 'zustand/vanilla'

function Loading() {
    return (
        <mesh 
            visible 
            rotation={[0, 0, 0]}>

            <sphereGeometry 
                attach="geometry" 
                args={[1, 16, 16]} 
            />

            <meshStandardMaterial
                attach="material"
                color="white"
                transparent
                opacity={0.6}
                roughness={1}
                metalness={0}
            />

        </mesh>
    );
}

export const Body =( { props } )=> {
  const { pos, color, scale, name , field, boolGField, boolGRad } = props

  const group = useRef()
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  //const scratchRef = useRef(useStore.getState().moonPos)
  //const setMoonPos = useStore((state) => state.setMoonPos)


  const speed = props.groupRotationSpeed ? -Math.abs(props.groupRotationSpeed ) : 0


  useFrame(() => {
    group.current.rotation.y -= speed
    //setMoonPos(group.current.position)
    /*
    useStore.subscribe(
        scratches => (scratchRef.current = group.current.position), 
        state => state.moonPos
    )
    */
  })


  // Rotate mesh every frame, this is outside of React without overhead
  /*
  useFrame(() => {
    pivot.current.rotation.y = pivot.current.rotation.y -= 0.001
    let earthRadius = 1
    // orbit
    if (name === 'moon'){
      let distanceFromEarth = earthRadius * 7.5
      const deltaTime = 0.001
      elapsedTime += deltaTime
      pivot.current.position.x += (distanceFromEarth*deltaTime)*Math.cos(elapsedTime) + 0;
      pivot.current.position.z += (distanceFromEarth*deltaTime)*Math.sin(elapsedTime) + 0;
    }
  })
  */

  /*
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
  */

  return (
    <group 
        position={pos}
        rotation={name === 'moon' ? [0,1.571,0] : [0,0,0]} 
        ref={group}>
        {
            field.gRad &&
            <Suspense fallback={ <Loading /> }>
                <GRad scale={scale} color={color} boolGRad={boolGRad} />
            </Suspense>
        }

        {
            field.gField &&
            <Suspense fallback={ <Loading /> }>
                <GField scale={scale} color={color} boolGField={boolGField} />
            </Suspense>
        }

        <mesh 
            visible 
            userData={{ test: "hello" }}
            castShadow={true}
            ref={mesh}
            scale={active ? scale.active : scale.inActive}>

            <sphereGeometry 
                attach="geometry" 
                args={[1, 32, 32]} 
            />

            {name === 'sun' ?
                <meshBasicMaterial
                    attach="material"
                    color={hovered ? color.active : color.inActive}
                    transparent
                    roughness={0.4}
                />
            :
                <meshStandardMaterial
                    attach="material"
                    color={hovered ? color.active : color.inActive}
                    transparent
                    roughness={0.4}
                />
            }
            


      </mesh>
    </group>
  );
}