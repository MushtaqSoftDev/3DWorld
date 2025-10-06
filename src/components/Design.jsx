import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import state from "../store/index";
import {
  headContainerAnimation,
  headTextAnimation,
  headContentAnimation,
  slideAnimation,
} from "../config/motion";

export function Design() {
  const navigate = useNavigate();

  return (
    <div className="max-container">
      <AnimatePresence>
        <motion.div className="home-content flex" {...headContainerAnimation}>
          <motion.div {...headTextAnimation}>
            <h1 className="head-text">
              Let's <br className="xl:block hidden" /> Design It.
            </h1>
          </motion.div>
          <motion.div
            {...headContainerAnimation}
            className="flex flex-col gap-5"
          >
            <p className="max-w-md font-normal text-gray-600 text-base">
              Create your unique & exclusive shirt in our 3D Store.
              <strong>Unleash your imagination</strong> & define your own style
            </p>

            {/** Button */}
            <button
              onClick={() => navigate("/customizer")}
              className="w-auto self-start px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition"
            >
              Customize It
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
