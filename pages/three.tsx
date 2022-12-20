import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { ThreeElements, useThree } from "@react-three/fiber";

interface Vector2D {
  x: number;
  y: number;
}

export default function Box(props: ThreeElements["mesh"]) {
  const white = new THREE.Color().setHex(0xffffff);
  const ts = useThree();
  const [value, setValue] = useState(0);
  const [detail, setDetail] = useState(0);
  const ref = useRef<THREE.Mesh>(null!);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [camera, setCamera] = useState(ts.camera);

  function grayColor(value: number) {
    const percent = 100 - value;
    return new THREE.Color().setRGB(
      percent / 100,
      percent / 100,
      percent / 100
    );
  }

  const handleMouse = (e: any) => {
    const mouse: Vector2D = { x: 0, y: 0 };
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMousePos(mouse);
  };

  function handler() {
    if (detail == 19) {
      return;
    }
    setValue(value + 1);
    if (value == 10) {
      setDetail(detail + 1);
      setValue(0);
    }
  }

  useEffect(() => {
    document.addEventListener("mousemove", handleMouse);
    return () => {
      document.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  useEffect(() => {
    let mouse = new THREE.Vector2(mousePos.x, mousePos.y);
    ts.raycaster.setFromCamera(mouse, camera);

    const intersection = ts.raycaster.intersectObject(ref.current);

    if (intersection.length > 0) {
      const instanceId = intersection.find(
        (e) => typeof e !== "undefined"
      )?.faceIndex;
      if (instanceId) {
        console.log(instanceId);
      }
    }
  }, [mousePos]);

  return (
    <mesh ref={ref} onClick={() => handler()}>
      <icosahedronGeometry args={[2, detail]} />
      <meshBasicMaterial color={detail == 19 ? "red" : grayColor(value * 10)} />
    </mesh>
  );
}
