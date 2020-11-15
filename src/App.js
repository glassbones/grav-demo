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

function MModel() {
  const glb = useLoader(GLTFLoader, "./nonreldonut.glb");
  return (
    <group>
      <mesh
        castShadow
        visible
        scale={[800,800,800]}
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
  const {pos, color, scale, name} = props
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  let elapsedTime = 0

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.01
    let earthRadius = 1
    // orbit
    if (name === 'moon'){
      let distanceFromEarth = earthRadius * 60
      const deltaTime = 0.001
      elapsedTime += deltaTime
      mesh.current.position.x += (distanceFromEarth*deltaTime)*Math.cos(elapsedTime) + 0;
      mesh.current.position.z += (distanceFromEarth*deltaTime)*Math.sin(elapsedTime) + 0;
    }
  })

  /*
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
  */

  return (
    <mesh 
      position={pos}
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
  );
}


const bodies = {
  moon: {
    pos: [0, 0, -60],
    scale: {
      active: [.405, .405, .405],
      inActive: [.27, .27, .27]
    },
    color: {
      active: 'hotpink',
      inActive: 'lightgrey'
    },
    name: 'moon'
  },
  marker: {
    pos: [0, 0, 60],
    scale: {
      active: [1, 1, 1],
      inActive: [1,1,1]
    },
    color: {
      active: 'hotpink',
      inActive: 'red'
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
    name: 'earth'
  }
}

export default function App() {

  // Loads the skybox texture and applies it to the scene.
  function SkyBox() {
    const { scene } = useThree();
    // Set the scene background property to the resulting texture.
    scene.background = <Stars
      radius={100} // Radius of the inner sphere (default=100)
      depth={50} // Depth of area where stars should fit (default=50)
      count={5000} // Amount of stars (default=5000)
      factor={4} // Size factor (default=4)
      saturation={0} // Saturation 0-1 (default=0)
      fade={true} // Faded dots (default=false)
    />
    return null;
  }
  /*
  const donut = () => {
    const test = useGLTF('../public/nonreldonut.glb')
    return false
  }
  */

  return (
    <Canvas colorManagement camera={{ position: [0, 0, 11], fov: 40 }}>


      <directionalLight intensity={.5} position={[100, 0, 20]} />

      
      <Sphere props={ bodies.moon } />
      <Sphere props={ bodies.earth } />
      <Sphere props={ bodies.marker } />

      <Suspense fallback={ <Loading /> }>
        <MModel />
      </Suspense>

      <Axi scale={[.2, .05, 2000]} color='red'/>
      <Axi scale={[2000,.15,.2]} color='blue'/>



      <Stars />
      <OrbitControls/>
      <Effects/>
    </Canvas>
  )
}
