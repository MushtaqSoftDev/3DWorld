import React from "react";
import { motion } from "framer-motion";

export function Projects() {
  return (
    <section className="max-container c-space my-20">
      <motion.div
        className="grid text-blue-600 dark:text-sky-400 text-5xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        My Projects
      </motion.div>

      <motion.div
        className="py-10 grid text-4xl text-blue-500 dark:text-sky-400"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <a
          href="https://github.com/MushtaqSoftDev/"
          target="_blank"
          rel="noreferrer"
        >
          You can check gitHub for my Projects & code for this site also...
        </a>
      </motion.div>
    </section>
  );
}
