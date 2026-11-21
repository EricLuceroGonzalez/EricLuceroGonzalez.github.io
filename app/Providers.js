"use client";

import { ThemeProvider } from "next-themes";
import GlobalStyleWrapper from "./themes/GlobalStyleWrapper.js";
import StyledComponentsRegistry from "./lib/registry.js";
import ThemeColorSync from "./components/ThemeColorSync.js";
import { MotionConfig } from "motion/react";

const Providers = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider
        defaultTheme="system"
        enableColorScheme={true}
        themes={["light", "dark"]}
      >
        <GlobalStyleWrapper />
        {/* Color de la barra del navegador según el tema que se ve */}
        <ThemeColorSync />
        {/* Respeta "reducir movimiento" del sistema también en Framer Motion,
            que no usa transiciones CSS y no le afecta la media query global. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
