import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export function Cube() {
  const cubeRef = useRef();
  const profile = useTexture("Mushtaqprofile.png");

  // Rotate on each frame
  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[5, 5, 5]} />
      <meshStandardMaterial map={profile} color="white" />
    </mesh>
  );
}

/*export function createProfileCube() {
  // Profile
  const ahmadTexture = new THREE.TextureLoader().load("Mushtaqprofile.png");

  const ahmad = new THREE.Mesh(
    new THREE.BoxGeometry(8, 8, 8),
    new THREE.MeshBasicMaterial({ map: ahmadTexture })
  );

  ahmad.position.set(0, 0, -5);
  ahmad.scale.set(3, 3, 3);
  return ahmad;
}*/
