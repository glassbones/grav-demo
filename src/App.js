import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'skyblue'} />
    </mesh>
  )
}

const Sphere =( { props } )=> {
  const {pos, color, scale} = props
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh 
      position={pos}
      visible 
      userData={{ test: "hello" }}
      castShadow
      ref={mesh}
      scale={active ? scale.active : scale.inActive}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
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
    pos: [-1.2, 0, 0],
    scale: {
      active: [.405, .405, .405],
      inActive: [.27, .27, .27]
    },
    color: {
      active: 'hotpink',
      inActive: 'lightgrey'
    }
  },
  earth: {
    pos: [1.2, 0, 0],
    scale: {
      active: [1.5, 1.5, 1.5],
      inActive: [1, 1, 1]
    },
    color: {
      active: 'hotpink',
      inActive: 'skyblue'
    }
  }
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      
      <Sphere props={ bodies.moon } />
      <Sphere props={ bodies.earth } />
    </Canvas>
  )
}
