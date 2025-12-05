"use client";
import { motion, useSpring, useTransform } from "framer-motion";
import { useScroll } from "motion/react";
import styled from "styled-components";

const AnimatedDiv = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 10px;
  background: var(--accent);
  transform-origin: 0%;
  z-index: 1000;
`;

const ScrollDiv = () => {
  const { scrollYProgress } = useScroll();

  return <AnimatedDiv style={{ scaleX: scrollYProgress }} />;
};

export default ScrollDiv;
