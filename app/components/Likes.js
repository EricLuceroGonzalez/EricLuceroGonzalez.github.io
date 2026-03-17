"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Importamos los iconos sólido y regular

export default function LikeButton({ slug }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Verificamos el estado guardado al montar el componente
  useEffect(() => {
    const storedLike = localStorage.getItem(`liked-${slug}`);
    if (storedLike) {
      setIsLiked(true);
    }
    fetch(`/api/likes/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setLikes(data.likes);
        setHasLoaded(true);
      })
      .catch((err) => {
        console.error("Error fetching likes:", err);
      });
  }, [slug]);

  // Manejador del clic (Optimistic UI puro)
  const handleLike = async () => {
    const newState = !isLiked;
    setIsLiked(newState);
    setLikes((prev) => (newState ? prev + 1 : prev - 1));

    if (newState) {
      localStorage.setItem(`liked-${slug}`, "true");
    } else {
      localStorage.removeItem(`liked-${slug}`);
    }
    // Enviamos el cambio a MongoDB sin bloquear la UI
    try {
      await fetch(`/api/likes/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: newState ? "increment" : "decrement" }),
      });
    } catch (error) {
      console.error("Error al guardar el like en BD", error);
      // Podrías revertir el estado aquí si falla la red, pero en likes a veces se ignora por UX
    }
  };

  if (!hasLoaded) return null; // O un pequeño skeleton loader

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        margin: "5px 2px",
        // border: "2px solid red",
      }}
    >
      <motion.button
        onClick={handleLike}
        aria-label="Dar me gusta"
        // Magia de Framer Motion: Efectos al hacer hover y al hacer clic (tap)
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.85 }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: isLiked ? "#FF3366" : "#6B7280", // Rojo si hay like, gris si no
        }}
      >
        {/* AnimatePresence maneja la entrada y salida de componentes */}
        <AnimatePresence mode="wait">
          {isLiked ? (
            <motion.div
              key="filled-heart"
              initial={{ scale: 0, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <FaHeart size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="outline-heart"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <FaRegHeart size={28} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Animamos también el número para que dé un saltito cuando cambia */}
      <motion.span
        key={likes} // Cambiar la key fuerza a Framer a re-animar el elemento
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{
          fontSize: "1.2rem",
          fontWeight: "600",
          color: isLiked ? "#EF4444" : "#6B7280",
          fontFamily: "monospace", // Los números en monospace suelen verse más "tech"
        }}
      >
        {likes}
      </motion.span>
    </div>
  );
}
