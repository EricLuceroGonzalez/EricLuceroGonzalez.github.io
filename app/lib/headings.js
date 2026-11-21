// Encabezados de un post (.mdx) para el índice lateral.
//
// Se calculan en el servidor, al compilar, a partir del texto del post. Los `id` tienen
// que coincidir con los que pone rehype-slug al renderizar, así que se usa el mismo
// algoritmo (github-slugger) recorriendo TODOS los encabezados en orden: los repetidos
// reciben -1, -2… igual que en la página.
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import katex from "katex";
import GithubSlugger from "github-slugger";

// El mismo patrón que remark-toc en las páginas de post: ese encabezado es el índice
// dentro del texto y no se repite en el lateral.
const TOC_HEADING = /^(Índice|Contenido|Tabla de contenidos|Table of Contents|Contents|Content)$/i;

const decode = (s) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"')
   .replace(/&#x27;|&#39;/g, "'").replace(/&amp;/g, "&");
const textOf = (htmlString) => decode(htmlString.replace(/<[^>]*>/g, ""));

// Una fórmula en un título ($\pi$): rehype-katex la cambia por el HTML de KaTeX antes de
// que rehype-slug calcule el id, y el id sale de TODO su texto: MathML + código TeX + HTML
// ("π" + "\pi" + "π" → "πpiπ"). Se renderiza igual con KaTeX para obtener ese mismo texto.
// Para mostrar en el índice se usa solo la parte visible (la HTML): "π".
function mathText(tex) {
  try {
    const html = katex.renderToString(tex, { displayMode: false, throwOnError: false });
    const visible = html.match(/<span class="katex-html"[^>]*>([\s\S]*)<\/span>\s*<\/span>\s*$/);
    return { slug: textOf(html), title: visible ? textOf(visible[1]) : tex };
  } catch {
    return { slug: tex, title: tex };
  }
}

// Texto de un nodo: para el id (lo que verá rehype-slug) y para mostrar en el índice
function headingText(node) {
  if (node.type === "inlineMath") return mathText(node.value);
  // {expresiones} de MDX: no son texto de la página
  if (node.type === "mdxTextExpression" || node.type === "mdxFlowExpression") return { slug: "", title: "" };
  if (typeof node.value === "string") return { slug: node.value, title: node.value };
  return (node.children || []).map(headingText).reduce(
    (acc, t) => ({ slug: acc.slug + t.slug, title: acc.title + t.title }),
    { slug: "", title: "" },
  );
}

function walk(node, fn) {
  fn(node);
  (node.children || []).forEach((child) => walk(child, fn));
}

/**
 * @param {string} content  texto MDX del post (sin frontmatter)
 * @param {{ minDepth?: number, maxDepth?: number }} [opciones]
 * @returns {{ slug: string, title: string, depth: number }[]}
 */
export function getHeadings(content = "", { minDepth = 2, maxDepth = 3 } = {}) {
  let tree;
  try {
    tree = unified().use(remarkParse).use(remarkMdx).use(remarkGfm).use(remarkMath).parse(content);
  } catch (error) {
    // Un post que no se pueda analizar se queda sin índice lateral, pero se publica igual
    console.warn(`⚠️ Índice lateral: no se pudo analizar el post (${error.message})`);
    return [];
  }

  const slugger = new GithubSlugger();
  const items = [];
  walk(tree, (node) => {
    if (node.type !== "heading") return;
    const text = headingText(node);
    const title = text.title.replace(/\s+/g, " ").trim();
    const slug = slugger.slug(text.slug); // todos cuentan, también los que no se muestran
    if (node.depth < minDepth || node.depth > maxDepth) return;
    if (!title || TOC_HEADING.test(title)) return;
    items.push({ slug, title, depth: node.depth });
  });
  return items;
}
