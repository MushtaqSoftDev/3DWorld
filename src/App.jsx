import React, { useEffect } from "react";
import About from "./components/About.jsx";
import Projects from "./sections/Projects.jsx";
import initThreeScene from "./threeScene";

const App = () => {
  useEffect(() => {
    initThreeScene(); // here our threeJS scene is working
  }, []);
  return (
    <div className="relative w-screen h-screen">
      {/** Three.js canvas */}
      <canvas
        id="bg"
        className="fixed top-0 left-0 -z-10 w-full h-full"
      ></canvas>

      {/** Scrollable content */}
      <div className="relative z-10 pointer-events-none">
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-5xl font-bold text-red-500">
            Welcome to 3d World 🌌
          </h1>
        </section>

        <section
          id="about"
          className="h-screen flex items-center justify-center"
        >
          <About />
        </section>

        {/** project section */}
        <section id="project" className="h-screen">
          <Projects />
        </section>
      </div>
    </div>
  );
};

export default App;
