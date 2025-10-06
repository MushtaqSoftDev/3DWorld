import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";

export function Shirt() {
  const shirtRef = useRef();
  const { nodes, materials } = useGLTF("/models/shirt_baked.glb");
  console.log("Shirt model loaded", nodes, materials);
  const [yPos, setYPos] = useState(-50); // start  from bottom

  // Animate shirt coming from top
  useEffect(() => {
    let frame = 0;
    function animate() {
      frame++;
      setYPos((prev) => Math.min(prev + 2, 0));
      if (frame < 60) requestAnimationFrame(animate);
    }
    animate();
  }, []);

  // Rotate on each frame
  /*useFrame(() => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y += 0.01;
    }
  });*/

  return (
    <motion.group
      //ref={shirtRef}
      dispose={null}
      scale={20}
      position={[18, yPos, 0]} // lower slightly so shirt look grounded
      rotation={[0, Math.PI / 30, 0]}
      initial={{ y: 30, opacity: 0 }} // start from top, invisible
      animate={{ y: 0, opacity: 1 }} // slide into view
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.T_Shirt_male.geometry}
        // override color -> white
        material={materials.lambert1.clone()}
        material-color={"#ffffff"}
      />
    </motion.group>
  );
}
