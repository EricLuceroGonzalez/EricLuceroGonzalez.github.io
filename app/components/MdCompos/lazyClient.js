"use client";
// Componentes interactivos pesados, cargados solo en los posts que los usan.
//
// Tiene que ser un módulo de cliente: si el `import()` se hace desde un módulo
// de servidor (dynamicMdxComponents.js, MDXComponents.js), Next registra el
// componente como parte de la página y descarga su JavaScript en TODOS los
// posts, aunque no se renderice. Aquí, next/dynamic crea un fragmento aparte
// que solo se descarga cuando el componente aparece en el MDX.
import dynamic from "next/dynamic";

// Reserva altura mientras carga, para que la página no salte (CLS).
const placeholder = (minHeight) => {
  const Placeholder = () => <div aria-hidden="true" style={{ minHeight }} />;
  return Placeholder;
};

export const PDFViewer = dynamic(() => import("../PDFViewer"), {
  ssr: false,
  loading: placeholder(500),
});
export const TexShowcase = dynamic(() => import("../TexShowcase"), {
  ssr: false,
  loading: placeholder(560),
});
export const PlotlyChart = dynamic(() => import("../PlotlyChart"), {
  ssr: false,
  loading: placeholder(420),
});
export const BarChart = dynamic(() => import("./BarChartsMDX"), {
  ssr: false,
  loading: placeholder(360),
});
export const SorteoMundial = dynamic(() => import("./SorteoMundial"), {
  ssr: false,
  loading: placeholder(480),
});
export const ArtemisLiveTracker = dynamic(() => import("./ArtemisLiveTracker"), {
  ssr: false,
  loading: placeholder(400),
});
export const Videos = dynamic(() => import("./Videos"), {
  ssr: false,
  loading: placeholder(300),
});
export const Mermaid = dynamic(() => import("./Mermaid"), {
  ssr: false,
  loading: placeholder(240),
});
