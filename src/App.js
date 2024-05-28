import { Canvas } from "@react-three/fiber";
import { Detailed, Environment, MapControls } from "@react-three/drei";
import "./App.css";
import { DoubleSide } from "three";
import { Camera } from "./component/camera";

function Position(pixel, size) {
  return [...Array(pixel * pixel)].map((_, index) => ({
    position: [size * (index % pixel), 0, size * Math.floor(index / pixel)],
  }));
}

const positionsA = Position(5, 10);
const positionsB = Position(10, 1);
const positionsC = Position(5, 0.1);

function BoxA(props) {
  return (
    <mesh {...props} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10, 1]} />
      <meshBasicMaterial color={"orange"} side={DoubleSide} wireframe />
    </mesh>
  );
}

function BoxB(props) {
  return (
    <group
      position={[
        -4.5 + Math.floor(props.number / 5) * 10,
        0,
        -4.5 + (props.number % 5) * 10,
      ]}
    >
      {positionsB.map((e, i) => (
        <mesh {...e} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"yellow"} side={DoubleSide} wireframe />
        </mesh>
      ))}
    </group>
  );
}

export default function App() {
  return (
    <Canvas camera={{ zoom: 0.3, position: [0, 10, 0] }}>
      <pointLight position={[0, 0, 0]} intensity={0.5} />
      <spotLight intensity={2.5} position={[50, 50, 50]} castShadow />

      {positionsA.map((props, i) => (
        <Bust key={i} number={i} pos={props} />
      ))}
      {/* <Camera /> */}
      {/* <TestBox /> */}
      <MapControls />
    </Canvas>
  );
}

function Bust(props) {
  return (
    <Detailed distances={[5, 10]}>
      <BoxB number={props.number} />
      <BoxA {...props.pos} />
    </Detailed>
  );
}

function TestBox() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={0x00ff00} />
    </mesh>
  );
}
