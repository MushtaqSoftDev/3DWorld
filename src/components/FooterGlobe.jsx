import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useTransform, useMotionValueEvent } from "framer-motion";

// Helper: convert lat/lon -> 3D coords on sphere
function latLongVector3(lat, lon, radius, height = 0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -(radius + height) * Math.sin(phi) * Math.cos(theta);
  const z = (radius + height) * Math.sin(phi) * Math.sin(theta);
  const y = (radius + height) * Math.cos(phi);

  return [x, y, z];
}

export function FooterGlobe({ scrollYProgress }) {
  const globeRef = useRef();
  const earthTex = useTexture("textures/earth_daymap.png");

  // Get R3F camera
  const { camera } = useThree();

  // Map scroll -> camera Z position (far -> close -> far)
  const globeZ = useTransform(scrollYProgress, [0.8, 0.95, 1], [30, 10, 40]);
  const globeZRef = useRef(globeZ.get());

  useMotionValueEvent(globeZ, "change", (v) => {
    globeZRef.current = v;
  });

  // Debug: log when component mounts
  useEffect(() => {
    console.log("FooterGlobe mounted");
    console.log("Texture loaded?", earthTex);
  }, [earthTex]);

  // rotate globe slowly (only when far)
  useFrame(() => {
    if (globeRef.current) {
      console.log("Glboe frame running, camera Z:", camera.position.z);
      if (globeRef.current && globeZRef.current > 15) {
        globeRef.current.rotation.y += 0.0015;
      }
    }

    // Smoothly move caera in/out
    camera.position.lerp(new THREE.Vector3(0, 0, globeZRef.current), 0.05);
    camera.lookAt(0, 0, 0);
  });

  // Barcelona marker (approx 41.3851N, 2.1734E)
  const barcelonaPos = latLongVector3(41.3851, 2.1734, 3);
  console.log("Barcelona marker position:", barcelonaPos);

  return (
    <group>
      {/** Earth */}
      <mesh
        ref={globeRef}
        scale={4}
        position={[0, -2, -10]}
        rotation-y={Math.PI * 0.3}
      >
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial map={earthTex} />
      </mesh>

      {/** Barcleona marker */}
      <mesh position={barcelonaPos}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial
          color="red"
          emissive="yellow"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
