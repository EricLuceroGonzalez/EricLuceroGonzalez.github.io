"use client";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import styled from "styled-components";

const EmojiContainers = styled(motion.button)`
  font-size: var(--text-h3);
  line-height: 1;
  border: none;
  background-color: transparent;
  padding: 0;
  display: inline-flex;
  cursor: pointer;
  &:focus-visible{
    outline: 2px solid var(--accent-ink);
    outline-offset: 2px;
  }
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
