import React, { Suspense, useRef, useState } from 'react'
import {useFrame} from 'react-three-fiber'
import { Body } from './Body';
import { bodies } from './data';

export const BodyGroup =( {parentData, childData} )=> {
    
    // This reference will give us direct access to the mesh
    const group = useRef()
    const groupRotationSpeed = 0.001
    // Set up state for the hovered and active state
    //onst [hovered, setHover] = useState(false)
    //const [active, setActive] = useState(false)
    parentData.groupRotationSpeed = groupRotationSpeed

    useFrame(() => {
      group.current.rotation.y = group.current.rotation.y -= groupRotationSpeed
    })
    
   
    /*
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
    */

    return (
      <group 
          position={[0,0,0]}
          ref={group}>
            <Body props={ parentData } />
            <Body props={ childData } />


      </group>
    );
  }
