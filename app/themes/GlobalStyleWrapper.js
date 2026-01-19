"use client";
import { createGlobalStyle } from "styled-components";
import { useEffect, useState } from "react";

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
a {
  text-decoration: none;
  color: inherit;
}

  :root {
    /* =========================================
       TEMA CLARO
       ========================================= */
       
    /* BASE */
    --bg: #F8F9FA;
    --fg: #1A1A1A;
    --accent: #0077FF;
    --primary: #FF3366;

    /* TIPOGRAFÍA */
  
    --heading: #111111; 
    --subheading: #444444;
    
    /* INTERACCIÓN*/
    --primary-btn-bg: #0077FF; 
    --primary-btn-fg: white;
    --primary-btn-hover: #0056b3;
    
    --secondary-btn-bg: #E2E6EA; 
    --secondary-btn-fg: #0077FF;
    --secondary-btn-hover: #c3c7cdff;

    /* ENLACES */
    --link-fg: #0077FF; 
    --link-bg: transparent;
    
    /* ÉNFASIS Y CÓDIGO */
    --strong-fg: #0077FF;
    --emphasis-bg: #fceaaeff;
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

    --js-yellow: #F0DB4F;
    --py-blue: #4B8BBE;
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
    --primary: #0077FF;
    /* TIPOGRAFÍA */
    --heading: #FFFFFF; 
    --subheading: #B0BEC5;

    /* INTERACCIÓN */
    --primary-btn-bg: #FF3366; /* Rosa */
    --primary-btn-fg: white;
    --primary-btn-hover: #E62E5C; /* Rosa un poco más oscuro */

    --secondary-btn-bg: #00364D; /* Un tono más claro que el fondo */
    --secondary-btn-fg: #FF3366;
    --secondary-btn-hover: #c3c7cdff;

    /* ENLACES - CORRECCIÓN CRÍTICA */
    --link-fg: #FF3366; 
    --link-bg: transparent;

    /* ÉNFASIS Y CÓDIGO */
    --strong-fg: #FF3366;
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
    --primary-border: #004966;
    --box-border-hover: #FF3366;
    --gray-light: #919ca2ff;
    --green-go: #00cc66;
  }

  /* Utilidades */
  [data-theme='dark'] [data-hide-on-theme='dark'],
  [data-theme='light'] [data-hide-on-theme='light'] {
    display: none;
  }
`;

export default function GlobalStyleWrapper() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? <GlobalStyle /> : null;
}
