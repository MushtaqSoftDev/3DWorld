import { useEffect, useState } from "react";
import Scene from "./Scene";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Design } from "./components/Design";
import { Projects } from "./components/Projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from "react-icons/fa";

export default function App() {
  // show clouds/sky only at home section
  const [currentSection, setCurrentSection] = useState("home");
  const [isScrolling, setIsScrolling] = useState(false);

  // Framer scroll progress
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    let scrollTimeout;

    function handleScroll() {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 1000);

      const scrollY = window.scrollY;
      const aboutTop = document.querySelector("#about")?.offsetTop || 0;
      const projectTop = document.querySelector("#project")?.offsetTop || 0;
      const footerTop = document.querySelector("#footer")?.offsetTop || 0;

      console.log(
        "📜 scrollY",
        scrollY,
        "aboutTop",
        aboutTop,
        "projectTop",
        projectTop,
        "footerTop",
        footerTop
      );

      if (scrollY + window.innerHeight / 2 >= footerTop) {
        setCurrentSection("footer");
        console.log("Switching to footer");
      } else if (scrollY + window.innerHeight / 2 >= projectTop) {
        setCurrentSection("project");
        console.log("Switching to project");
      } else if (scrollY + window.innerHeight / 2 >= aboutTop) {
        setCurrentSection("about");
        console.log("Switching to about");
      } else {
        setCurrentSection("home");
        console.log("Switching to home");
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/** Global Navbar */}
      <Navbar currentSection={currentSection} isScrolling={isScrolling} />

      {/** Background 3d Canvas */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // pushes Canvas behind
        }}
      >
        {/** Pass scroll progress to scene */}
        <Scene
          currentSection={currentSection}
          scrollYProgress={scrollYProgress}
        />
      </div>

      {/** Home section */}
      <Home scrollYProgress={scrollYProgress} />

      {/** About section */}
      <motion.section
        id="about"
        initial={{ x: 100, opacity: 0 }} //start right offscreen
        whileInView={{ x: 0, opacity: 1 }} // ANIMATE always when in View
        viewport={{ once: false, amount: 0.3 }} // 0.3 = trigger when 30% visible
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <About />
      </motion.section>

      <motion.section id="#design" className="flex items-center justify-center">
        <Design />
      </motion.section>

      {/** Project Section */}
      <motion.section
        id="project"
        initial={{ x: -100, opacity: 0 }} // start left offscreen
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeIn" }}
        className="flex items-center justify-center"
        style={{ height: "100vh" }}
      >
        <Projects />
      </motion.section>

      <section
        id="footer"
        className="relative z-10 text-white px-6 py-10 h-screen flex items-center justify-center"
        style={{
          position: "relative",
          bottom: 0,
          width: "100%",
        }}
      >
        <div className="flex flex-col items-center text-center gap-6 bg-black/60 p-6 rounded-xl relative z-20">
          <h2 className="text-2xl font-bold">Contact Us:</h2>

          <div className="flex gap-8 text-3xl">
            <a
              href="mailto:mushtaquok70@gmail.com"
              className="hover:text-red-400 transition"
            >
              <FaEnvelope size={28} />
            </a>
            <a href="tel:+34631564626" className="hover:text-greem-400">
              <FaPhone size={28} />
            </a>
            <a
              href="https://linkedin.com/in/mushtaq-ahmad-a37537151"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin size={28} />
            </a>
            <a
              href="https://github.com/MushtaqSoftDev/"
              target="_blank"
              className="hover:text-gray-400 transition"
            >
              <FaGithub size={28} />
            </a>
          </div>
          <p className="text-sm opacity-75">
            © 2025 3DStore | All rights reserved
          </p>
        </div>
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
