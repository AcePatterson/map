import { useThree } from "@react-three/fiber";

export const Camera = () => {
  const { camera } = useThree();
  console.log("camera.position: ", camera.position);
  return <group></group>;
};
