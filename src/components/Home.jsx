import { motion, useTransform } from "framer-motion";

export function Home({ scrollYProgress }) {
  // Animate heading with scroll
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      id="home"
      className="h-screen flex flex-col items-center justify-center relative"
      style={{ height: "100vh" }}
    >
      {/** Heading */}
      <motion.h1
        initial={{ y: -200, opacity: 0 }} // start above
        animate={{ y: 0, opacity: 1 }} // come down into view
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ y, opacity }}
        className="text-5xl font-bold text-red-500"
      >
        Welcome to 3D Store 🌌
      </motion.h1>
    </section>
  );
}
