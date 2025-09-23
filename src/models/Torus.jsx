import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function Torus() {
  const torusRef = useRef();

  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.005;
      torusRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={torusRef}>
      <torusGeometry args={[10, 3, 16, 100]} />
      <meshStandardMaterial wireframe={true} />
    </mesh>
  );
}

/*export function createTorus() {
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6347,
    wireframe: true,
  });
  return new THREE.Mesh(geometry, material);
}*/
