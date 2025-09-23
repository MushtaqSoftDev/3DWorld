import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Cube } from "./models/Cube";
import { Torus } from "./models/Torus";
import { ProjectComputer } from "./models/ProjectComputer";

export default function Scene() {
  const [currentModel, setCurrentModel] = useState("torus");

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY;
      const aboutTop = document.querySelector("#about")?.offsetTop || 0;
      const projectTop = document.querySelector("#project")?.offsetTop || 0;

      if (scrollY + window.innerHeight / 2 >= projectTop) {
        setCurrentModel("projectcomputer");
      } else if (scrollY + window.innerHeight / 2 >= aboutTop) {
        setCurrentModel("cube");
      } else {
        setCurrentModel("torus");
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
      {/** Lights */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} />

      {/** Show model depending on scroll */}
      {currentModel === "torus" && <Torus />}
      {currentModel === "cube" && <Cube />}
      {currentModel === "projectcomputer" && <ProjectComputer />}

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
