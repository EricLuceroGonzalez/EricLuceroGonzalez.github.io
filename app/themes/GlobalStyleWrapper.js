"use client"; // Ensure it's a client component
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
:root{
    /* Fondos y Textos */
    --bg: #F8F9FA; /* Fondo principal blanco suave */
    --fg: #222222; /* Texto oscuro principal */
    --accent:#0077FF  ; /* Rojo vibrante para acentos */
    /* #B2A5FF */
    /* Títulos y Encabezados */
    --heading: #D18B00; /* Dorado oscuro para títulos */
    --subheading: #E0A800; /* Amarillo más claro para subtítulos */

    /* Botones */
    --primary-btn-bg: #D72638; /* Rojo para botones principales */
    --primary-btn-fg: white; /* Texto en botones principales */
    --primary-btn-hover: #F1C40F; /* Amarillo brillante para hover */
    --secondary-btn-bg: #0077FF; /* Azul fuerte para botones secundarios */
    --secondary-btn-fg: white; /* Texto en botones secundarios */
    --secondary-btn-hover: #0077FF; /* Azul más oscuro para hover */

    /* Enlaces y Énfasis */
    --link-fg: #FFA500; /* Azul morado para enlaces */
    --link-bg: transparent; /* Fondo transparente para enlaces */
    --strong-fg: #0077FF; /* Azul fuerte para negritas */
    --strong-bg: transparent; /* Azul fuerte para negritas */
    --emphasis-fg: #222222; /* Naranja semitransparente para énfasis */
    --emphasis-bg:  #FFFA75; /* Naranja semitransparente para énfasis */

    /* Citas y Bloques de Código */
    --quote-bg: #FFF3CD; /* Amarillo pálido para fondo de citas */
    --quote-fg: #6C757D; /* Gris oscuro para texto de citas */
    --code-fg: #FF3366; /* Rojo suave para palabras reservadas en código */
    --code-bg: #282C34; /* Fondo para bloques de código */
    /* Bordes */
    --primary-border: #0077FF; /* Azul para bordes */
    --border-stroke: #D72638; /* Rojo brillante para bordes */

    /* Colores Adicionales */
    --gray-dark: #4A4A4A; /* Gris medio-oscuro */
    --gray-medium: #B0B0B0; /* Gris medio */
    --gray-light:#B0B0B0;
    --accent-yellow: #FFD700; /* Amarillo dorado */
    --accent-orange: #FFA500; /* Naranja */
    --box-border-hover:#0077FF;
    /* #FF3366 #FFE381 #00FFE7 */
}
[data-theme='dark'] {
    /* Fondos y Textos */
    --bg: #002332; /* Fondo oscuro principal */
    --fg: #EAEAEA; /* Texto principal */
    --accent: #FF3366;
    
    /* Títulos y Encabezados */
    --heading: #FFE381; /* Amarillo claro para títulos principales */
    --subheading: #FFF4B7; /* Amarillo más claro para subtítulos */
    
    /* Botones */
    --primary-btn-bg: #FF3366; /* Rosa brillante para botones principales */
    --primary-btn-fg: white; /* Texto en botones principales */
    --primary-btn-hover: #FFF4B7; /* Naranja para hover */
    --secondary-btn-bg: #38D9A9; /* Verde claro para botones secundarios */
    --secondary-btn-fg: #343434; /* Texto en botones secundarios */
    --secondary-btn-hover: #2B8A6E; /* Verd e oscuro para hover */
    
    /* Enlaces y Énfasis */
    --link-fg: #0077FF; /* Lila claro para enlaces */
    --link-bg: transparent; /* Fondo transparente para enlaces */
    --strong-fg: #FF3366; /* Cyan para negritas */
    --strong-bg: transparent; /* Fondo para negritas */
    --emphasis-fg: #00FFE7; /* Fondo para elementos destacados */
    --emphasis-bg: transparent; /* Amarillo semitransparente para énfasis */
    
    /* Citas y Bloques de Código */
    --quote-bg: #FFE381; /* Amarillo claro para fondo de citas */
    --quote-fg: #002332; /* Azul oscuro para texto de citas */ 
    --code-fg: #4A4A4A; /* Rojo suave para palabras reservadas en código */
    --code-bg: #00FFE7; /* Fondo para bloques de código */
    
    /* Bordes */
    --primary-border: #0077FF; /* Azul para bordes */
    --border-stroke: #FF3366; /* Rosa brillante para bordes (unificado con botones primarios) */

    /* Colores Adicionales */
    --gray-dark: #1E1E1E; /* Gris muy oscuro */
    --gray-medium: #4A4A4A; /* Gris medio */
    --gray-light:#DEDEDE;
    --accent-yellow: #FFD700; /* Amarillo dorado */
    --accent-orange: #FFA500; /* Naranja */
    --box-border-hover:#FF3366;
}

[data-theme='dark'] [data-hide-on-theme='dark'],
[data-theme='light'] [data-hide-on-theme='light'] {
  display: none;
}`;

export default function GlobalStyleWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure styles apply only after mount
  }, []);

  return mounted ? <GlobalStyle /> : null;
}
