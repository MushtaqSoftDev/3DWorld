// src/Scene.jsx
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Cloud } from "@react-three/drei";
import { useRef } from "react";
import { Cube } from "./models/Cube";
import { Torus } from "./models/Torus";
import { ProjectComputer } from "./models/ProjectComputer";
import { Shirt } from "./models/Shirt";
import { FooterGlobe } from "./components/FooterGlobe";
import { useTransform, useMotionValueEvent } from "framer-motion";

export default function Scene({ currentSection, scrollYProgress }) {
  /**
   * IMPORTANT:
   * - We create motion transforms (framer) that map scroll progress to Z positions.
   * - Then we subscribe to those transforms and push the changing numeric value into refs
   *   that Three.js objects can read inside useFrame.
   *
   * The 3-stop mapping (array domain with 3 outputs) makes the object:
   *  - start far away at load,
   *  - come close during the first small scroll (gives "appearing" effect),
   *  - then retreat as the user scrolls further.
   */

  // torus: far -> close -> back
  const torusZ = useTransform(scrollYProgress, [0, 0.12, 0.4], [-150, 0, -120]);
  // clouds: slightly different depths so clouds feel layered
  const cloudZ = useTransform(
    scrollYProgress,
    [0, 0.12, 0.4],
    [-200, -40, -250]
  );

  // Refs that R3F components will read in useFrame
  const torusZRef = useRef(torusZ.get());
  const cloudZRef = useRef(cloudZ.get());

  // Subscribe to changes so refs are kept up-to-date
  // (useMotionValueEvent is preferred API in Framer Motion v6+)
  useMotionValueEvent(torusZ, "change", (v) => {
    torusZRef.current = v;
  });
  useMotionValueEvent(cloudZ, "change", (v) => {
    cloudZRef.current = v;
  });

  // Lightweight wrapper that positions the Cloud object each frame from the ref
  function CloudWrapper({ position: [x, y], cloudRef, ...props }) {
    const meshRef = useRef();
    useFrame(() => {
      if (meshRef.current) {
        // update Z from the shared ref each frame
        meshRef.current.position.set(x, y, cloudRef.current);
      }
    });
    // pass other props through; position.z will be controlled by useFrame
    return (
      <Cloud ref={meshRef} position={[x, y, cloudRef.current]} {...props} />
    );
  }

  return (
    <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
      {/** Lights */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} />

      {/** Home: show sky + multiple cloud wrappers and the torus */}
      {currentSection === "header" && (
        <>
          <Sky sunPosition={[100, 20, 100]} />
          <CloudWrapper
            position={[-25, 10]}
            cloudRef={cloudZRef}
            opacity={0.45}
            speed={0.12}
            width={40}
            depth={20}
            segments={50}
          />
          <CloudWrapper
            position={[12, 16]}
            cloudRef={cloudZRef}
            opacity={0.5}
            speed={0.18}
            width={35}
            depth={18}
            segments={45}
          />
          <CloudWrapper
            position={[0, 22]}
            cloudRef={cloudZRef}
            opacity={0.35}
            speed={0.08}
            width={45}
            depth={22}
            segments={60}
          />
        </>
      )}

      {/** About/Project may show different skydome if needed */}
      {currentSection === "about" && <Sky sunPosition={[100, 20, 100]} />}

      {/** Show the right model per currentSection.
       *  Pass torusZRef to Torus so it can read the Z value inside useFrame.
       */}
      {currentSection === "header" && <Torus torusZRef={torusZRef} />}
      {currentSection === "about" && <Cube />}
      {currentSection === "design" && <Shirt />}
      {currentSection === "project" && <ProjectComputer isActive />}
      {currentSection === "footer" && (
        <FooterGlobe scrollYProgress={scrollYProgress} />
      )}

      <OrbitControls />
    </Canvas>
  );
}

/*import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { createTorus } from "./models/torus";
import { createProfileCube } from "./models/cube";
import { useTexture } from "@react-three/drei";

const texture = useTexture("/humanTexture.jpeg");*/

/*export default function initThreeScene() {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75, // FOV (Field of View)
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true, //allow transparency
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  renderer.render(scene, camera);

  // Lights
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight, new THREE.AmbientLight(0xffffff));

  /* Helper method */
// for rectangle's boxes
/*const lightHelper = new THREE.PointLightHelper(pointLight);
  const gridHelper = new THREE.GridHelper(200, 50);
  scene.add(lightHelper, gridHelper);*/

//const controls = new OrbitControls(camera, renderer.domElement);

// 3D-Models
/*const torus = createTorus();
  const cube = createProfileCube();
  scene.add(torus); // start with torus

  // for 3d-model like gltf do this
  const loader = new GLTFLoader();
  let projectComputer; // store model reference
  loader.load(
    "/models/computer-desk-area.glb",
    (gltf) => {
      console.log("GLTF loaded:", gltf);
      projectComputer = gltf.scene;
      projectComputer.scale.set(4, 4, 4); // adjust size
      projectComputer.position.set(0, -2, 5); // position it in view
      projectComputer.rotation.y = Math.PI / 6;
      <meshStandardMaterial map={texture} />;
    },
    undefined,
    (error) => {
      console.error("Error loading GLTF:", error);
    }
  );*/

// Scroll intersection, track which section we are in
/*function moveCamera() {
    const scrollY = window.scrollY; //gives vertical scroll pos in pixels/ how much user has scrolled vertically
    const aboutSection = document.querySelector("#about");
    const projectSection = document.querySelector("#project");

    const aboutTop = aboutSection.offsetTop;
    const projectTop = projectSection.offsetTop;

    // Always zoom out as you scroll
    camera.position.z = 30 + scrollY * 0.02; // ZOOM out as scroll/ camera moves backward as user scroll

    camera.rotation.y = scrollY * 0.0005;

    // Switch models based on scroll position
    if (scrollY + window.innerHeight / 2 >= projectTop) {
      // in project section -> show projectComputer
      if (scene.children.includes(torus)) scene.remove(torus);
      if (scene.children.includes(cube)) scene.remove(cube);
      if (projectComputer && !scene.children.includes(projectComputer)) {
        console.log("Adding projectComputer:", projectComputer);
        scene.add(projectComputer);
      }
    } else if (scrollY + window.innerHeight / 2 >= aboutTop) {
      // in About section -> show cube
      if (!scene.children.includes(cube)) scene.add(cube);
      console.log("about section adding cube", cube);
      if (scene.children.includes(torus)) scene.remove(torus);
      if (projectComputer && scene.children.includes(projectComputer)) {
        scene.remove(projectComputer);
      }
    } else {
      // Default (home) → show Torus
      if (scene.children.includes(cube)) scene.remove(cube);
      if (projectComputer && scene.children.includes(projectComputer)) {
        scene.remove(projectComputer);
      }
      if (!scene.children.includes(torus)) scene.add(torus);
    }

    camera.rotation.y = scrollY * 0.0005; // subtle rotation for effect/ camera rotates slightly
  }

  document.body.onscroll = moveCamera;
  // now adding stars
  /*function addStar() {
    const geometry = new THREE.SphereGeometry(0.5, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
  }
  // now call function to add star in the scene
  Array(200).fill().forEach(addStar);*/

/*function animate() {
    requestAnimationFrame(animate);

    if (scene.children.includes(torus)) {
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;
    }
    if (scene.children.includes(cube)) {
      cube.rotation.y += 0.01;
    }
    if (projectComputer && scene.children.includes(projectComputer)) {
      //projectComputer.rotation.y += 0.003;
      projectComputer.scale.set(10, 10, 10); // exaggerate size
      projectComputer.position.set(0, 0, 0);
    }

    controls.update();
    renderer.render(scene, camera);
  }
  animate();
}*/
