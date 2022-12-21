import { useEffect } from "react";
import { Inter } from "@next/font/google";
import Box from "../components/three";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="canvas">
      <Canvas flat linear className="bgWhite">
        <ambientLight />
        <CameraController />
        <pointLight position={[10, 10, 10]} />
        <Box />
      </Canvas>
    </div>
  );
}

const CameraController = () => {
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 3;
    controls.maxDistance = 20;
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);
  return null;
};
