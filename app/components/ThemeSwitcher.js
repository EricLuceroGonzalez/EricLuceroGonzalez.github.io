"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { TbSunFilled, TbMoonFilled } from "react-icons/tb";
import styled from "styled-components";

const SunIcon = styled(TbSunFilled)`
  cursor: pointer;
  color: ${(props) => (props.theme === "dark" ? "#FF9800" : "var(--fg)")};
  transition: color 0.5s;
`;
const MoonIcon = styled(TbMoonFilled)`
  cursor: pointer;
  /* color: var(--bg); */
  color: ${(props) => (props.theme === "light" ? "var(--bg)" : "var(--fg)")};
  transition: color 0.5s;
`;
const ThemeToggle = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 30px;
  padding: 2px;
  background-color: var(--fg);
  max-height: fit-content;
  margin: auto 1px;
  transition: background-color 0.3s;
`;

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  useEffect(() => {
    console.log(theme);
  }, [theme]);

  if (!mounted) return null;

  return (
    <ThemeToggle>
      <SunIcon
        onClick={() => setTheme("light")}
        theme={theme}
        size={20}
      ></SunIcon>
      <MoonIcon
        onClick={() => setTheme("dark")}
        theme={theme}
        size={20}
      ></MoonIcon>
    </ThemeToggle>
  );
};

export default ThemeSwitcher;
