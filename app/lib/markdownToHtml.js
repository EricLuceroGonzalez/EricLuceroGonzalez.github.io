import { remark } from "remark"; // Importas remark
import html from "remark-html"; // Importas el plugin para convertir a HTML
import prism from "remark-prism"; // Importas el plugin para el resaltado de código
import remarkToc from "remark-toc";

export default async function markdownToHtml(markdown) {
  // La función process() se llama sobre la cadena de Markdown
  const result = await remark()
    .use(remarkToc)
    .use(prism) // Aplica el plugin remark-prism
    .use(html) // Aplica el plugin remark-html
    .process(markdown); // Procesa el Markdown y retorna el resultado

  return result.toString(); // Convierte el resultado a string
}
