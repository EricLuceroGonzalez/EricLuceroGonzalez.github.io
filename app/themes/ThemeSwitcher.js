"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";
import styled from "styled-components";

const SwitchContainer = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fg);
  border-radius: 50%;
  transition: background-color 0.2s ease;
  outline: none;
  position: relative;
  overflow: hidden; /* Mantiene la animación contenida */
  width: 40px;
  height: 40px;

  &:hover {
    background-color: var(--bg-secondary, rgba(128, 128, 128, 0.1));
    color: var(--accent);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--accent);
  }
`;

const IconWrapper = styled(motion.div)`
  position: absolute; /* Superpone los iconos para la animación */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navigation");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <SwitchContainer aria-hidden="true" style={{ opacity: 0 }} />;
  }
  const isDark = theme === "dark";

  return (
    <SwitchContainer
      type="button"
      title={t("theme_switch_toggle")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <IconWrapper
          key={isDark ? "sun" : "moon"}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {isDark ? <TbSunFilled size={22} /> : <TbMoonFilled size={22} />}
        </IconWrapper>
      </AnimatePresence>
    </SwitchContainer>
  );
};

export default ThemeSwitcher;
