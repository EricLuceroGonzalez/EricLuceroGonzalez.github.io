// Resaltado de código con la versión "light" de highlight.js: solo los
// lenguajes registrados aquí. La importación por defecto de
// react-syntax-highlighter incluye todos (~1 MB sin comprimir).
// Si un post usa otro lenguaje, añádelo aquí; si no está registrado, el
// bloque se muestra igual, sin colores.
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/light";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import latex from "react-syntax-highlighter/dist/esm/languages/hljs/latex";
import bash from "react-syntax-highlighter/dist/esm/languages/hljs/bash";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import dos from "react-syntax-highlighter/dist/esm/languages/hljs/dos";

export { default as codeTheme } from "react-syntax-highlighter/dist/esm/styles/hljs/tomorrow-night-bright";

const LANGUAGES = {
  python,
  py: python,
  latex,
  tex: latex,
  bash,
  sh: bash,
  shell: bash,
  javascript,
  js: javascript,
  json,
  dos,
  DOS: dos,
};

for (const [name, lang] of Object.entries(LANGUAGES)) {
  SyntaxHighlighter.registerLanguage(name, lang);
}

export default SyntaxHighlighter;
