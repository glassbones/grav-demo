import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useThree, useLoader, DOM } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, Stars, Box } from '@react-three/drei'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import Effects from './3d/Effects'

function Loading() {
  return (
    <mesh visible rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
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

function MoonRad() {
  const glb = useLoader(GLTFLoader, "./nonreldonut.glb");
  return (
    <group>
      <mesh
        castShadow
        visible
        scale={[9,9,9]}
        geometry={glb.nodes.mesh.geometry}>
        <meshBasicMaterial
          wireframe={true}
          attach="material"
          color="#FFFFFF"
          opacity={.02}
          transparent={true}
          roughness={0.4}
          metalness={1.0}
        />
      </mesh>
    </group>
  );
}



const MModel= props => {
  const glb = useLoader(GLTFLoader, "./nonreldonut.glb");
  const gValue = props.scale.inActive[0] * 1135

  return (
    <group>
      <mesh
        castShadow
        visible
        scale={[gValue,gValue,gValue]}
        position={[0, 0, 0]}
        geometry={glb.nodes.mesh.geometry}>
        <meshBasicMaterial
          wireframe={true}
          attach="material"
          color="#FFFFFF"
          opacity={.02}
          transparent={true}
          roughness={0.4}
          metalness={1.0}
        />
      </mesh>
    </group>
  );
}

function GField() {
  const glb = useLoader(GLTFLoader, "./gfield.glb");
  return (
    <group>
      <mesh
        castShadow
        visible
        scale={[9,9,9]}
        position={[0, 0, 0]}
        geometry={glb.nodes.mesh.geometry}>
        <meshBasicMaterial
          wireframe={true}
          attach="material"
          color="#FFFFFF"
          opacity={.02}
          transparent={true}
          roughness={0.4}
          metalness={1.0}
        />
      </mesh>
    </group>
  );
}

const Axi = ( props ) => {
  return(
    <mesh visible scale={props.scale} position={[0,-1,0]} >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshBasicMaterial color={props.color} />
    </mesh>
  )
}



const Sphere =( { props } )=> {
  const {pos, color, scale, name , field} = props
  // This reference will give us direct access to the mesh
  const group = useRef()
  const mesh = useRef()
  const pivot = (name === 'moon') ? group : mesh
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  let elapsedTime = 0

  // Rotate mesh every frame, this is outside of React without overhead
  
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

  /*
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
  */

  return (
    field.gRad ?
    <group 
      position={pos}
      rotation={name === 'moon' ? [0,1.571,0] : [0,0,0]} 
      ref={group}>
      <Suspense fallback={ <Loading /> }>
        <MModel scale={scale}/>
      </Suspense>
      <mesh 
        visible 
        userData={{ test: "hello" }}
        castShadow
        ref={mesh}
        scale={active ? scale.active : scale.inActive}>
        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
        <meshStandardMaterial
          attach="material"
          color={hovered ? color.active : color.inActive}
          transparent
          roughness={0.4}
        />
      </mesh>
    </group>
    :
    <group position={pos} ref={group}>
      <mesh 
        visible 
        userData={{ test: "hello" }}
        castShadow
        ref={mesh}
        scale={active ? scale.active : scale.inActive}>
        <sphereGeometry attach="geometry" args={[1, 32, 32]} />
        <meshStandardMaterial
          attach="material"
          color={hovered ? color.active : color.inActive}
          transparent
          roughness={0.4}
        />
      </mesh>
    </group>
  );
}


const bodies = {
  moon: {
    pos: [0, 0, -7.5],
    scale: {
      active: [.405, .405, .405],
      inActive: [.27, .27, .27]
    },
    color: {
      active: 'hotpink',
      inActive: 'lightgrey'
    },
    field:{
      gRad:true,
      gField:false,
    },
    name: 'moon'
  },
  marker: {
    pos: [0, 0, 7.5],
    scale: {
      active: [1, 1, 1],
      inActive: [1,1,1]
    },
    color: {
      active: 'hotpink',
      inActive: 'red'
    },
    field:{
      gRad:false,
      gField:false,
    },
    name: 'marker'
  },
  earth: {
    pos: [0, 0, 0],
    scale: {
      active: [1.5, 1.5, 1.5],
      inActive: [1, 1, 1]
    },
    color: {
      active: 'hotpink',
      inActive: 'skyblue'
    },
    field:{
      gRad:true,
      gField:false,
    },
    name: 'earth'
  }
}

export default function App() {

 //<Axi scale={[.2, .05, 2000]} color='red'/>
 //<Axi scale={[2000,.7.5,.2]} color='blue'/>

  return (
    <Canvas colorManagement camera={{ position: [0, 0, 11], fov: 40 }}>


      <directionalLight intensity={.5} position={[100, 0, 20]} />

      <Axi scale={[.2, .05, 2000]} color='red'/>
      <Axi scale={[2000, .05 ,.2]} color='blue'/>

      <Sphere props={ bodies.moon } />
      <Sphere props={ bodies.earth } />
      <Sphere props={ bodies.marker } />

      <Suspense fallback={ <Loading /> }>
        <GField />
      </Suspense>


      <Stars
        radius={400} // Radius of the inner sphere (default=100)
        depth={50} // Depth of area where stars should fit (default=50)
        count={7.5000} // Amount of stars (default=5000)
        factor={4} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade={true} // Faded dots (default=false)
      />
      <OrbitControls/>

    </Canvas>
  )
}
