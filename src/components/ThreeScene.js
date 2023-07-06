import React, { Children } from 'react'
import { Canvas } from '@react-three/fiber'

function ThreeScene({children}) {
  return (
    <Canvas>
        {children}
    </Canvas>
  )
}

export default ThreeScene