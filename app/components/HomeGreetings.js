"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const greetings = [
  "Hola",
  "Hello",
  "Bonjour",
  "Ciao",
  "Olá",
  "Hallo",
  "こんにちは", // Japonés
  "你好", // Chino
  "مرحباً", // Árabe
  "Привет", // Ruso
  "سلام", // Persa
  "Helló", // Húngaro
  "Hej", // Sueco
  "Ahoj", // Checo
  "नमस्ते", // Hindi
];

export default function HomeGreeting({ defaultGreeting }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Cambiamos la palabra cada 2.5 segundos
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  // Si defaultGreeting (el t("title")) coincide con el primer elemento, lo usamos.
  // Si no, el array rota independientemente.

  return (
    // min-width previene el Layout Shift. Ajusta los 140px según el tamaño de tu fuente.
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        minWidth: "260px",
        position: "relative",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            left: 0,
            color: "var(--accent)",
          }} // absolute evita que la salida empuje a la entrada
        >
          {greetings[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
