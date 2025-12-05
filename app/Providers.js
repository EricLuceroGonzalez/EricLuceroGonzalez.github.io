"use client";

import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";

import { useState, useEffect } from "react";
import GlobalStyleWrapper from "./themes/GlobalStyleWrapper.js";
import StyledComponentsRegistry from "./lib/registry.js";

const Providers = ({ children }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure theme is set before rendering
  }, []);

  return (
    <StyledComponentsRegistry>
      <ThemeProvider
        defaultTheme="system"
        enableColorScheme={true}
        themes={["light", "dark"]}
        theme={{ mode: theme }}
      >
        <GlobalStyleWrapper />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default Providers;
