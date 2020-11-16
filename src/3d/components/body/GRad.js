import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const GRad = props => {
  const glb = useLoader(GLTFLoader, "./nonreldonut.glb");
  const gValue = props.scale.inActive[0] * 1135

  return (
    <group>
        <mesh
            castShadow
            visible={props.boolGRad}
            scale={[gValue,gValue,gValue]}
            position={[0, 0, 0]}
            geometry={glb.nodes.mesh.geometry}>
            <meshBasicMaterial
                wireframe={true}
                attach="material"
                color={props.color.inActive}
                opacity={.02}
                transparent={true}
                roughness={0.4}
                metalness={1.0}
            />
        </mesh>
    </group>
  );
}

