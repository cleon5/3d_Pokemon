import logo from "./logo.svg";
import "./App.css";
import ThreeScene from "./components/ThreeScene";
import Sphere from "./components/Sphere";
import { OrbitControls, Stars } from "@react-three/drei";
import Glb from "./components/Glb"
import { Suspense } from "react";
import Home from "./pages/Home";

function App() {
  /*
  <ThreeScene>
        <color attach="background" args={["#161c24"]} />
        <Sphere color={"#00ffff"} position={[2,0,0]} />
        <Sphere color={"#0000ff"} position={[-1,0,0]} />
        
        <ambientLight/>
        <Stars/>
        <OrbitControls />
      </ThreeScene> 
  */
  return (
    <div className="App" >
      <Home />
    </div> 
  );
}

export default App;
