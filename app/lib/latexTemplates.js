const BASE = "https://ericlucero.dev";

export const latexTemplates = [
  {
    id: "cuadriculada",
    category: "papel",
    tex: "/tex/cuadriculada.tex",
    pdf: "/pdfs/cuadriculada.pdf",          // FALTA en public/pdfs
    thumb: "/thumbs/cuadriculada.png",      // opcional, ver 9.4
    pattern: "grid",
    meta: "A4 · 5 mm",
    title: { es: "Papel cuadriculado", en: "Square grid paper" },
    description: {
      es: "Cuadrícula de 5 mm con márgenes configurables.",
      en: "5 mm grid with configurable margins.",
    },
  },
  {
    id: "milimetrada",
    category: "papel",
    tex: "/tex/milimetrada.tex",            // FALTA en public/tex
    pdf: "/pdfs/milimetrada.pdf",
    pattern: "mm",
    meta: "A4 · 1 mm / 1 cm",
    title: { es: "Papel milimetrado", en: "Millimetre paper" },
    description: {
      es: "Rejilla de 1 mm con líneas mayores cada centímetro.",
      en: "1 mm grid with major lines every centimetre.",
    },
  },
  {
    id: "pentagramas",
    category: "musica",
    tex: "/tex/pentagramas.tex",            // FALTA
    pdf: "/pdfs/pentagramas.pdf",           // FALTA
    pattern: "staff",
    meta: "A4 · 12 pautas",
    title: { es: "Pentagramas", en: "Music staff paper" },
    description: {
      es: "Papel pautado con número de pentagramas configurable.",
      en: "Manuscript paper with a configurable number of staves.",
    },
  },
];

export const overleafUrl = (texPath) =>
  `https://www.overleaf.com/docs?snip_uri=${encodeURIComponent(BASE + texPath)}`;