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
    bg: "var(--py-yellow)", // Azul Python oficial
    text: "var(--py-blue)",
  },
  latex: {
    bg: "var(--latex-green)",
    text: "#002332",
  },
  tex: {
    bg: "#2b69f8",
    text: "#ffffff",
  },
  tikz: {
    bg: "#c82bf8",
    text: "#ffffff",
  },
  overleaf: {
    bg: "#11b83e",
    text: "#ffffff",
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
