import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, PerspectiveCamera } from "@react-three/drei";
import Island from "./components/Island";
import UI from "./components/UI";
import "./App.css";
import * as THREE from "three";

const App: React.FC = () => {
  const [waterLevel, setWaterLevel] = useState<number>(0.3);

  return (
    <div className="app-container">
      <UI waterLevel={waterLevel} setWaterLevel={setWaterLevel} />
      <Canvas shadows>
        <PerspectiveCamera
          makeDefault
          position={[20, 20, 20]}
          fov={50}
          near={0.1}
          far={1000}
        />
        <color attach="background" args={["#87ceeb"]} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Sky sunPosition={[100, 20, 100]} turbidity={0.3} rayleigh={0.5} />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          target={[0, 0, 0]}
        />
        <gridHelper args={[50, 50, "#666666", "#444444"]} />
        <primitive object={new THREE.AxesHelper(10)} />
        <Island waterLevel={waterLevel} />
      </Canvas>
    </div>
  );
};

export default App;
