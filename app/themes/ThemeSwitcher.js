"use client";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";
import styled from "styled-components";

const SunIcon = styled(TbSunFilled)`
  cursor: pointer;
  color: ${(props) => (props.theme === "dark" ? "var(--accent)" : "var(--fg)")};
  transition: color 0.35s;
`;
const MoonIcon = styled(TbMoonFilled)`
  cursor: pointer;
  color: ${(props) =>
    props.theme === "light" ? "var(--emphasis-bg)" : "var(--fg)"};
  transition: color 0.35s;
`;
const ThemeToggle = styled(motion.div)`
  display: flex;
  flex-direction: row;
  border-radius: 30px;
  padding: 2px;
  background-color: var(--fg);
  max-height: fit-content;
  margin: auto 1px;
  transition: background-color 0.2s;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: var(--fg);
  border-radius: 999px;
  /* padding: 2px; */
  gap: 4px;
  cursor: pointer;
  position: relative; /* Necesario para el layout */
  width: fit-content;
  border: 1px solid rgba(150, 150, 150, 0.2);
`;

const IconWrapper = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 2; /* Para que esté por encima del fondo animado */
  position: relative;
  justify-content: center;
  padding: 4px;
  color: ${(props) => (props.$isActive ? "var(--accent)" : "")};
  transition: color 0.2s;

  &:hover {
    color: var(--accent);
  }
`;

const ActiveIndicator = styled(motion.div)`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  border-radius: 999px;
  background-color: var(--emphasis-bg); /* Color de la pastilla activa */
  z-index: 1;
`;
const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navigation");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const isDark = theme === "dark";

  return (
    // <ThemeToggle
    //   title={`Set ${theme == "dark" ? "light" : "dark"} theme`}
    //   transition={{
    //     type: "spring",
    //     visualDuration: 0.2,
    //     bounce: 0.2,
    //   }}
    // >
    //   <SunIcon
    //     onClick={() => setTheme("light")}
    //     theme={theme}
    //     size={20}
    //   ></SunIcon>
    //   <MoonIcon
    //     onClick={() => setTheme("dark")}
    //     theme={theme}
    //     size={20}
    //   ></MoonIcon>
    // </ThemeToggle>
    <SwitchContainer title={t("theme_switch_toggle")}>
      <ActiveIndicator
        layoutId="active-theme-indicator" // Magia de Framer Motion
        initial={false}
        animate={{
          // Calculamos la posición manualmente o dejamos que flexbox lo haga si cambiamos estructura.
          x: isDark ? "100%" : "0%",
        }}
        style={{
          width: "50%", // Ocupa la mitad del contenedor (ajustar según padding)
          left: 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      {/* Botón Light */}
      <IconWrapper onClick={() => setTheme("light")} $isActive={!isDark}>
        <TbSunFilled size={20} />
      </IconWrapper>
      {/* Botón Dark */}
      <IconWrapper onClick={() => setTheme("dark")} $isActive={isDark}>
        <TbMoonFilled size={20} />
      </IconWrapper>{" "}
    </SwitchContainer>
  );
};

export default ThemeSwitcher;
