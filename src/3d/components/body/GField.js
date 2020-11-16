import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


export const GField = props => {
    const glb = useLoader(GLTFLoader, "./gfield.glb");
    const gValue = props.scale.inActive[0] * 9

    return (
        <group>
            <mesh
                castShadow
                visible={props.boolGField}
                scale={[gValue,gValue,gValue]}
                position={[0, 0, 0]}
                geometry={glb.nodes.mesh.geometry}>
                <meshBasicMaterial
                    wireframe={true}
                    attach="material"
                    color={props.color.inActive}
                    opacity={.008}
                    transparent={true}
                    roughness={0.4}
                    metalness={1.0}
                />
            </mesh>
        </group>
    );
  }
  