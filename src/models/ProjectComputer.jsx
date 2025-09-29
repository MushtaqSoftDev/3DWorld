import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { skinning } from "three/tsl";
import { useFrame } from "@react-three/fiber";

export function ProjectComputer({ isActive }) {
  const { scene } = useGLTF("/models/computer-desk-area.glb");
  // adding ref for right arm
  const armRef = useRef(null);

  const groupRef = useRef(null); // wrapper ref for whole model

  // Load textures
  const woodTex = useTexture("/textures/wood.jpeg");
  const fabricTex = useTexture("/textures/cloth.jpeg");
  const skinTex = useTexture("/textures/skin.jpeg");
  const plasticTex = useTexture("/textures/plastic.jpeg");
  const screenTex = useTexture("/textures/screen.jpeg");
  const photoTex = useTexture("/textures/screen1.png");
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
          child.material.map = photoTex; // image
          child.material.emissiveMap = photoTex; // glow comes from image itself
          child.material.emissive = new THREE.Color(0xffffff);
          child.material.emissiveIntensity = 0.2;
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

  // Grabbing the arm
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isSkinnedMesh) {
        console.log("Bones for: ", child.name);
        console.log(child.skeleton.bones.map((b) => b.name));

        // finding the left upper arm bone
        const armBone = child.skeleton.bones.find(
          (b) => b.name === "bip_L_UpperArm_20"
        );
        if (armBone) {
          armRef.current = armBone;
        }
      }
    });
  }, [scene]);

  // animate arm
  useFrame((state, delta) => {
    if (armRef.current && isActive) {
      // Animate arm only when active
      armRef.current.rotation.z = THREE.MathUtils.lerp(
        armRef.current.rotation.z,
        Math.PI / 8, // -60
        0.05 // smoothness
      );
    }

    // Pop-in scale animation for the whole model
    if (groupRef.current) {
      const targetScale = isActive ? 1 : 0; // keep hidden but not fully removed
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group ref={groupRef} visible={isActive}>
      <primitive
        object={scene}
        scale={4}
        position={[4, -8, 5]}
        rotation-y={Math.PI / 8}
      />
    </group>
  );
}
