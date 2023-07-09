import React, { useRef } from "react";
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

function Glb({pokemon=''}) {
  //const group = useRef()
  //const { nodes, materials } = useGLTF('/Bulbasaur.glt')
  /*const x = ()=> {
      let fbx = useFBX('suzanne/suzanne.fbx')
      return <primitive object={fbx} />
    }*/
  const models = [
    "./pokemons/bulbasaur.glb",
    "./pokemons/charmander.glb",
    "./pokemons/squirtle.glb",
  ];
  const gltf = useLoader(GLTFLoader, models[2]);
  const obj = useLoader(OBJLoader, "./models/IronMan.obj");
  const fbx = useLoader(FBXLoader, "./models/IronMan.fbx");


  return (
    <div className="canvas">
      <Canvas camera={{ position: [50, 60, 43] }} shadows>
        <color attach="background" args={["#161c24"]} />
        <directionalLight position={[2, 3, 1]} />
        <directionalLight position={[-2, 3, 1]} />

        <primitive
          object={gltf.scene}
          position={[0, 0, 0]}
          children-0-castShadow
        />
        <Circle />
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>
      <p className="namePokemon">{pokemon}</p>
    </div>
  );
}

export default Glb;
