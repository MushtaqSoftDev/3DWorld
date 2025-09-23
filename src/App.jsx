import Scene from "./Scene";
import { About } from "./components/About";

export default function App() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <Scene />
      </div>
      <section
        id="home"
        className="h-screen flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <h1 className="text-5xl font-bold text-red-500">
          Welcome to 3D Store 🌌
        </h1>
      </section>
      <section
        id="about"
        className="flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <About />
      </section>
      <section id="project" style={{ height: "100vh" }}>
        <h1>Project Section</h1>
      </section>
    </>
  );
}

/*import React, { useEffect } from "react";
import About from "./components/About.jsx";
import Projects from "./sections/Projects.jsx";
import initThreeScene from "./threeScene";

const App = () => {
  useEffect(() => {
    initThreeScene(); // here our threeJS scene is working
  }, []);
  return (
    <div className="relative w-screen h-screen">
      {/** Three.js canvas */
/* <canvas
        id="bg"
        className="fixed top-0 left-0 -z-10 w-full h-full"
      ></canvas>

      {/** Scrollable content */
/*<div className="relative z-10 pointer-events-none">
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-5xl font-bold text-red-500">
            Welcome to 3d World 🌌
          </h1>
        </section>*/

/*<section
          id="about"
          className="h-screen flex items-center justify-center"
        >
          <About />
        </section>*/

/** project section */
/*<section id="project" className="h-screen">
          <Projects />
        </section>
      </div>
    </div>
  );
};

export default App;*/
