import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

export function Torus({ torusZRef }) {
  const torusRef = useRef();

  // Add rotating loop
  useFrame(() => {
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01;
      torusRef.current.rotation.y += 0.005;
      torusRef.current.rotation.z += 0.01;

      // update z from the ref (if provided)
      if (torusZRef && typeof torusZRef.current === "number") {
        torusRef.current.position.z = torusZRef.current;
      }
    }
  });

  return (
    <mesh ref={torusRef} position={[0, 0, 0]}>
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
