"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";

const EmojiContainers = styled(motion.div)`
  font-size: larger;
  width: 50px;
  margin-right: 16px;
  font-size: var(--text-h1);
  /* background-color: var(--fg); */
`;
const RANDOM_EMOJIS = [
  "👋🏼",
  "🧬",
  "👋🏼",
  "💻",
  "🧉",
  "👋🏼",
  "🚀",
  "🦕",
  "👋🏼",
  "⚡️",
  "👽",
  "👋🏼",
  "💾",
  "👋🏼",
  "🥶",
  "👋🏼",
  "😅",
  "👋🏼",
  "😎",
  "👋🏼",
  "👾",
  "👋🏼",
];

const EmojiContainer = () => {
  const [emoji, setEmoji] = useState("👋🏼"); // 2. Efecto que corre solo en el cliente al montar
  useEffect(() => {
    // Generamos un índice aleatorio
    const randomIndex = Math.floor(Math.random() * RANDOM_EMOJIS.length);
    setEmoji(RANDOM_EMOJIS[randomIndex]);
  }, []);
  return (
    <EmojiContainers
      animate={{ rotate: [0, 30, -20, 30, 0] }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      key={emoji}
      onClick={() => {
        const next =
          RANDOM_EMOJIS[Math.floor(Math.random() * RANDOM_EMOJIS.length)];
        setEmoji(next);
      }}
    >
      {emoji}
    </EmojiContainers>
  );
};

export default EmojiContainer;
