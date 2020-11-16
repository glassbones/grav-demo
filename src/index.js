import ReactDOM from 'react-dom'
import './styles.css'
import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls, Stars, Box } from '@react-three/drei'
import Effects from './3d/Effects'

import { Axi } from './3d/components/Axis/Axi'
import { Body } from './3d/components/body/Body'
import { BodyGroup } from './3d/components/body/BodyGroup'
import { bodies } from './3d/components/body/data'
import { Controls, useControl, withControls } from 'react-three-gui'
//import {useStore} from './store'

const MyCanvas = withControls(Canvas);

const Scene = () => {

    const boolGField = useControl('Gravitational Fields', { type: 'boolean' });
    const boolGRad = useControl('Gravitational Radiation Fields', { type: 'boolean' });

    //const moonPos = useStore((state) => state.moonPos)

    bodies.moon.boolGRad = boolGRad
    bodies.earth.boolGRad = boolGRad
    bodies.moon.boolGField = boolGField
    bodies.earth.boolGField = boolGField

    return(
    <MyCanvas colorManagement camera={{ position: [0, 0, 11], fov: 40 }}>
        {/*<mesh rotation-x={rotationX} />*/}
        <directionalLight intensity={.5} position={[100, 0, 20]} />

        <Body props={ bodies.sun } />
        <BodyGroup parentData={bodies.earth} childData={bodies.moon} />

        <Stars
        radius={150} // Radius of the inner sphere (default=100)
        depth={.1} // Depth of area where stars should fit (default=50)
        count={25000} // Amount of stars (default=5000)
        factor={1} // Size factor (default=4)
        saturation={0} // Saturation 0-1 (default=0)
        fade={true} // Faded dots (default=false)
        />

        <OrbitControls
            maxDistance={190}
            minDistance={5}
            target={[0,0,0]}
        />
        <Effects/>

    </MyCanvas>
)}

function App() {

  /*
  <Axi scale={[.02, .02, 2000]} color='red'/>
  <Axi scale={[2000, .02 ,.02]} color='blue'/>
  <Body props={ bodies.moon } />
  <Body props={ bodies.earth } />
  */

  return (
    <Controls.Provider>
      <Scene />
      <Controls title="Gravity Visualizer GUI"/>
    </Controls.Provider>
  );
}
ReactDOM.render(<App />, document.getElementById('root'))
