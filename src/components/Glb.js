import React, { useState } from "react";
import {
  useGLTF,
  useFBX,
  Stats,
  OrbitControls,
  Circle,
} from "@react-three/drei";
import { useLoader, Canvas } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { CircleGeometry } from "three";

function Glb({pokemon, select, model, forceUpdate}) {
  const gltf = useLoader(GLTFLoader, model);
  const primitive = () =>{
    return <primitive
    object={gltf.scene}
    position={[0, 0, 0]}
    children-0-castShadow
  />
  }
  const upda=(e)=>{
    select(e.target.value)
    forceUpdate()
  }

  return (
    <div className="canvas">
      <Canvas camera={{ position: [50, 60, 43] }} shadows>
        <color attach="background" args={["#161c24"]} />
        <directionalLight position={[2, 3, 1]} />
        <directionalLight position={[-2, 3, 1]} />

        {primitive()}
        <Circle />
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
      <div className="pokemonSelet">
        <select onChange={(e)=> upda(e)}>
          {
            pokemon.length > 0 && pokemon.map((poke,key)=>
              <option key={key}  value={poke.id}>{poke.pokemon}</option>
            )
          }
        </select>
      </div>
      
    </div>
  );
}

export default Glb;
