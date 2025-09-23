import React from "react";
import { skills } from "../constant/index.js";

export function About() {
  return (
    <section className="max-container">
      <h1 className=" text-blue-950 dark:text-sky-500 text-5xl">
        Hello, I'm{" "}
        <span className="text-blue-gradien font-semibold drop-shadow">
          Mushtaq
        </span>
        <span className="waving-hand">✋</span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-1000">
        <p className="text-blue-600 dark:text-sky-400 text-4xl">
          Software Developer, specialized in 3D animated website.
        </p>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text text-blue-800 text-3xl">My Skills</h3>
        <div className="mt-16 flex flex-wrap gap-12">
          {skills.map((skill) => (
            <div key={skill.name} className="flex flex-col items-center">
              <div>
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
