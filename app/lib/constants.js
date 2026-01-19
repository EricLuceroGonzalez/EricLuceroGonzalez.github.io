// Definimos la configuración visual de cada tag
export const TAG_STYLES = {
  blog: {
    bg: "var(--accent)",
    text: "var(--bg)",
  },
  javascript: {
    bg: "var(--js-yellow)", // Amarillo JS oficial
    text: "#000000",
  },
  js: {
    // Alias para javascript
    bg: "var(--js-yellow)",
    text: "#000000",
  },
  python: {
    bg: "var(--py-blue)", // Azul Python oficial
    text: "var(--bg)",
  },
  latex: {
    bg: "var(--latex-green)", // Un teal elegante
    text: "var(--bg)",
  },
  ai: {
    bg: "var(--accent)",
    text: "var(--bg)",
  },
  // "ia" mapea a lo mismo que "ai"
  ia: {
    bg: "var(--accent)",
    text: "var(--bg)",
  },
  microsoft: {
    bg: "var(--microsoft-blue)",
    text: "var(--bg)",
  },
  papers: {
    bg: "var(--emphasis-bg)",
    text: "var(--emphasis-fg)",
  },
  // Estilo por defecto (Fallback)
  default: {
    bg: "var(--fg)",
    text: "var(--bg)",
  },
};
