import React, { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { easing } from "maath";
import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);

  // importing shirt model
  const { nodes, materials } = useGLTF("/models/shirt_baked.glb");
  console.log("GLTF Nodes: ", nodes);
  console.log("Material :", materials);
  const meshRef = useRef();

  // Guard before geometry ready
  if (!nodes?.T_Shirt_male || !materials?.lambert1) return null;

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // Smooth color transition
  useFrame((_, delta) => {
    if (!materials?.lambert1) return;
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
  });

  const stateString = JSON.stringify(snap);

  return (
    <Suspense fallback={null}>
      <group dispose={null}>
        {/** Use the real GLTF mesh */}
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          geometry={nodes.T_Shirt_male.geometry}
          material={materials.lambert1}
          material-roughness={1}
        >
          {/** Decals only once mesh exists */}
          {snap.isFullTexture && meshRef.current && (
            <Decal
              mesh={nodes.T_Shirt_male}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1}
              map={fullTexture}
            />
          )}

          {/** Logo decal */}
          {snap.isLogoTexture && meshRef.current && (
            <Decal
              mesh={nodes.T_Shirt_male}
              position={[0, 0.04, 0.15]}
              rotation={[0, 0, 0]}
              scale={0.15}
              map={logoTexture}
              map-anisotropy={16}
              depthTest={false}
              depthWrite={true}
            />
          )}
        </mesh>
      </group>
    </Suspense>
  );
};

export default Shirt;
