"use client";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  
*{
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html,body {
  max-width: 100vw;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* El fondo de la página va en <body>. Los contenedores (Layout, PageContainer,
   MainBg, MainPageBg) son transparentes: si tuvieran fondo opaco taparían el
   canvas de BgMovingDots, que va detrás con z-index: -1. */
body {
  background-color: var(--bg);
  color: var(--fg);
}
a {
  text-decoration: none;
  color: inherit;
}

  :root {
    /* =========================================
       TEMA CLARO
       ========================================= */
    --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
    --text-small: clamp(0.65rem, 0.65rem + 0.25vw, 0.85rem);
    --text-very-small: clamp(0.35rem, 0.55rem + 0.35vw, 0.55rem);
  
    --text-h1: clamp(2rem, 1.6rem + 2vw, 3rem);
    --text-h2: clamp(1.5rem, 1.3rem + 1vw, 2rem);
    --text-h3: clamp(1.15rem, 1.05rem + 0.35vw, 1.5rem);

    /* BASE */
    --bg: #F8F9FA;
    --fg: #1A1A1A;
    --accent: #0062D1;            /* antes #0077FF: 3.9:1 como texto; ahora 5.4:1 */
    --on-accent: #FFFFFF;         /* texto sobre fondo --accent */
    --primary: #ff3366;
    --accent-transparent: rgba(0, 119, 255, 0.1);
    --primary-transparent: rgba(255, 51, 102, 0.1);
      
    --accent-ink: #0062D1;        /* texto/botones azules, 5.6:1 */
    --latex-ink: #07706F;         /* texto verde LaTeX, 5.9:1 */
    --latex-soft: #E8F8F8;        /* fondo del panel LaTeX */
    --latex-border: #B7E9E9;
    --card-bg: #FFFFFF;
    --muted: #5A6470;             /* metadatos, 5.7:1 */
    /* Footer: oscuro en los dos temas */
    --footer-bg: #1A1A1A;
    --footer-fg: #E9ECEF;
    --footer-muted: #B4B9BF;
    --footer-accent: #5EA8FF;
    --footer-line: rgba(255, 255, 255, 0.14);
    --footer-hover-bg: rgba(255, 255, 255, 0.08);
    
    /* TIPOGRAFÍA */
  
    --heading: #111111; 
    --subheading: #444444;
    
    /* INTERACCIÓN*/
    --primary-btn-bg: #0062D1;
    --primary-btn-fg: white;
    --primary-btn-hover: #004EA8;
    
    --secondary-btn-bg: #E2E6EA; 
    --secondary-btn-fg: #0077FF;
    --secondary-btn-hover: rgb(255, 255, 255);

    /* ENLACES */
    --link-fg: #0062D1;
    --link-bg: transparent;
    
    /* ÉNFASIS Y CÓDIGO */
    --strong-fg: #0062D1;
    --emphasis-bg: rgb(255, 224, 123);
    --emphasis-fg: #1A1A1A;
    /* HEADERS */
    --heading-3: #004966;

    
    --quote-bg: #E9ECEF; /* Gris azulado muy suave */
    --quote-fg: #495057;
    
    --code-fg: #D72638; 
    --code-bg: #E2E6EA; 
    --code-box-bg:#002332;
    --primary-border: #DEE2E6;
    --box-border-hover: #0077FF;
    --gray-light: #919ca2ff;
    --green-go: #00cc66;
    --warning: #D72638;

    --js-yellow: #F0DB4F;
    --py-blue: #4584b6;
    --py-yellow: #FFE873;
    --microsoft-blue: #008AD7;
    --latex-green: #0acaca;
  }

  [data-theme='dark'] {
    /* =========================================
       TEMA OSCURO (Estilo: Cyberpunk, Deep Ocean)
       ========================================= */
       
    /* BASE */
    --bg: #002332; 
    --fg: #E0E6ED; 
    --accent: #FF3366;
    --on-accent: #00222F;         /* blanco sobre #FF3366 = 3.5:1; esto = 4.7:1 */
    --primary: #0077FF;

    --primary-transparent: rgba(0, 119, 255, 0.1);
    --accent-transparent: rgba(255, 51, 102, 0.1);

    --accent-ink: #FF6B8E;        /* sobre #002332 */
    --latex-ink: #5FE3E3;
    --latex-soft: #003040;
    --latex-border: #0B5566;
    --card-bg: #002B3D;
    --muted: #9FB0BC;
    --footer-bg: #001721;
    --footer-fg: #E0E6ED;
    --footer-muted: #9FB0BC;
    --footer-accent: #FF6B8E;
    --footer-line: rgba(255, 255, 255, 0.12);
    --footer-hover-bg: rgba(255, 255, 255, 0.06);
    
    /* TIPOGRAFÍA */
    --heading: #FFFFFF; 
    --subheading: #B0BEC5;

    /* INTERACCIÓN */
    --primary-btn-bg: #FF3366; /* Rosa */
    --primary-btn-fg: #00222F;
    --primary-btn-hover: #E62E5C; /* Rosa un poco más oscuro */

    --secondary-btn-bg: #00364D; /* Un tono más claro que el fondo */
    --secondary-btn-fg: #FF3366;
    --secondary-btn-hover: #c3c7cdff;

    /* ENLACES - CORRECCIÓN CRÍTICA */
    --link-fg: #FF6B8E;           /* legible también sobre --quote-bg/--code-bg */
    --link-bg: transparent;

    /* ÉNFASIS Y CÓDIGO */
    --strong-fg: #FF6B8E;
    --emphasis-bg: #fceaaeff; /* Rosa con transparencia */
    --emphasis-fg: #00364D;

    --quote-bg: #00364D; /* Ligeramente más claro que el fondo */
    --quote-fg: #B0BEC5;
    /* HEADERS */
    --heading-3: #fceaaeff;
    
    /* CORRECCIÓN DE CÓDIGO */
    --code-fg: #00FFE7; /* Cyan neón para el texto */
    --code-bg: #00364D; /* Casi negro (más oscuro que el fondo principal) */
    --code-box-bg:#002332;

    --warning: #eac626;
    --primary-border: #004966;
    --box-border-hover: #FF3366;
    --gray-light: #919ca2ff;
    --green-go: #00cc66;
  }

  /* Tamaños base de títulos. Fuera de :root y con :where() (especificidad 0):
     antes estaban dentro de :root, que equivale a ":root h2" y ganaba a
     cualquier styled-component, así que ningún título podía cambiar de tamaño. */
  :where(h1) { font-size: var(--text-h1); font-weight: 800; letter-spacing: -0.02em; }
  :where(h2) { font-size: var(--text-h2); font-weight: 700; }
  :where(h3) { font-size: var(--text-h3); font-weight: 600; }

  /* Utilidades */
  [data-theme='dark'] [data-hide-on-theme='dark'],
  [data-theme='light'] [data-hide-on-theme='light'] {
    display: none;
  }
    /* Respect user motion preferences */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// Se renderiza también en el servidor: así las variables CSS (--bg, --fg…)
// y los estilos base llegan en el HTML inicial, sin parpadeo ni saltos de
// diseño mientras carga JavaScript. El tema lo aplica next-themes con
// [data-theme] antes de pintar, así que no hay desajuste de hidratación.
export default function GlobalStyleWrapper() {
  return <GlobalStyle />;
}
