import React from 'react'

export const Axi = ( props ) => (
    <mesh visible scale={props.scale} position={[0,-1,0]} >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshBasicMaterial color={props.color} />
    </mesh>
)
