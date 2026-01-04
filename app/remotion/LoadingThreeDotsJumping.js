"use client";

import { motion } from "motion/react";

function LoadingThreeDotsJumping() {
  // Se eliminó la anotación de tipo ": Variants"
  const dotVariants = {
    jump: {
      transform: "translateY(-30px)",
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="jump"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className="container"
    >
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <motion.div className="dot" variants={dotVariants} />
      <StyleSheet />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }

        .dot {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: #ff0088;
            will-change: transform;
        }
      `}
    </style>
  );
}

export default LoadingThreeDotsJumping;
