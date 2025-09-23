import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import { skinning } from "three/tsl";

export function ProjectComputer() {
  const { scene } = useGLTF("/models/computer-desk-area.glb");
  // Load textures
  const woodTex = useTexture("/textures/wood.jpeg");
  const fabricTex = useTexture("/textures/cloth.jpeg");
  const skinTex = useTexture("/textures/skin.jpeg");
  const plasticTex = useTexture("/textures/plastic.jpeg");
  const screenTex = useTexture("/textures/screen.jpeg");
  const glassTex = useTexture("/textures/glass.jpeg");

  scene.traverse((child) => {
    if (child.isMesh) {
      const matName = child.material?.name || "";
      const objName = child.name || "";
      const isSkinned = child.type === "SkinnedMesh";

      console.log(`🟢 Obj: ${objName}, Mat: ${matName}, Type: ${child.type}`);

      // ---- DIFFERENTIATION ----
      switch (objName) {
        case "Object_13": // keyboard
          child.material.map = plasticTex;
          break;
        case "Object_15": // mouse
          child.material.map = plasticTex;
          break;
        case "Object_24": // desktop
          child.material.map = woodTex;
          break;
        case "Object_9": // screen face
          child.material.map = screenTex;
          child.material.emissive = child.material.color;
          child.material.emissiveIntensity = 0.8;
          break;
        case "Object_30": // person
        case "Object_31": // person (skinned)
          child.material.map = skinTex;
          break;
        default:
          // fallback by material name if needed
          switch (matName) {
            case "WOOD":
              child.material.map = woodTex;
              break;
            case "FABRIC":
              child.material.map = fabricTex;
              break;
            case "peopleColors":
              child.material.map = woodTex;
              break;
            case "material_6":
              child.material.map = glassTex;
              child.material.transparent = true;
              child.material.opacity = 0.5;
              break;
            default:
              // leave as is
              break;
          }
          break;
      }

      // ✅ always mark update after assigning maps
      child.material.needsUpdate = true;
    }
  });

  return (
    <primitive
      object={scene}
      scale={8}
      position={[0, -2, 5]}
      rotation-y={Math.PI / 6}
    />
  );
}
