// Los datos los genera `publish.mjs` (repo playground) en latex-manifest.json.
// No edites el manifest a mano: se sobrescribe en cada publicación.
import manifest from "./latex-manifest.json";

const BASE = "https://ericlucero.dev";

export const latexTemplates = manifest.templates;

// Acepta tanto .tex como .zip (plantillas con figuras o .bib).
export const overleafUrl = (sourcePath) =>
  `https://www.overleaf.com/docs?snip_uri=${encodeURIComponent(BASE + sourcePath)}`;
