"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import Link from "next/link";
import { TAG_STYLES } from "../lib/constants";
// import { synthwave84 } from "react-syntax-highlighter/dist/esm/styles/prism";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// Contenedor principal para manejar diseño responsivo
export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  font-size: small;
  background-color: var(--bg);
  @media (max-width: 768px) {
    flex-direction: column; /* Cambia a diseño vertical en pantallas pequeñas */
  }
  @media (min-width: 1080px) {
    font-size: large;
  }
  /* border: 2px solid orange; */
`;

// Define los estilos para cada parte del artículo
export const Article = styled(motion.article)`
  width: 90%;
  margin: 0 auto;
  background-color: var(--bg);
  color: var(--fg);
  /* box-shadow: 0 4px 8px rgb  a(0, 0, 0, 0.1); */
  width: 70%;

  @media (0px <= width < 390px) {
    width: 99%;
  }
  @media (min-width: 390px) {
    width: 95%;
  }

  @media (600px <= width < 780px) {
    min-width: 80%;
    padding: 5px;
    box-shadow: none;
    font-size: small;
  }
  @media (min-width: 1080px) {
    width: 85%;
  }
  @media (min-width: 1280px) {
    width: 65%;
  }
  @media (min-width: 1440px) {
    width: 62%;
  }
  padding: 1rem 0 33vh 0;
  /* border: 1px solid red; */
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const Author = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  color: var(--fg);
  margin-bottom: 1.5rem;
`;

// export const CodeBlock = styled(SyntaxHighlighter)`
//   margin: 20px 0;
//   border-radius: 8px;
//   font-size: smaller;
// `;

export const CoverImageContainer = styled.div`
  margin-bottom: 2rem;

  @media (min-width: 660px) {
    margin-bottom: 4rem;
  }
`;

export const BoxGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 1rem 0 2rem 0;
  /* border: 3px solid blueviolet; */
  @media (min-width: 660px) {
    /* border: 3px solid greenyellow; */
    flex-direction: row;
  }
`;
export const TitleContainer = styled.h2`
  margin-bottom: 1rem;
  line-height: 1.2;
  font-size: large;
  margin: 2rem 0;
  @media (min-width: 660px) {
    font-size: x-large;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
  color: var(--accent);
  text-align: left;
`;

export const Date = styled.div`
  font-size: small;
  flex-direction: row;
  justify-content: space-between;
`;

export const MetaInfo = styled.div`
  /* border: 1px solid blue; */
  border-bottom: 1px solid var(--secondary-btn-hover);
  padding-bottom: 0.5rem;
  font-size: small;
  color: var(--accent);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 75%;
  @media (0px <= width <=398px) {
    width: 80%;
    flex-direction: row;
    font-size: small;
    /* padding-bottom: 12px;
    border-bottom: 1px solid var(--quote-bg); */
  }
  padding-top: 3px;
`;
// Contenedor para el avatar y el nombre del autor
export const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`;

export const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 10px;
`;

export const AuthorName = styled.span`
  font-size: x-small;
  color: var(--fg);
`;

// background: ${($props) =>
//   $props.$isCopy ? "var(--emphasis-bg)" : "var(--secondary-btn-bg)"};
export const SectionType = styled.div`
  font-weight: bold;
  /* background-color: var(--fg);  */
  color: var(--bg);
  padding: 1px 6px;
  border-radius: 2px;
  display: inline-block;
  margin-left: 10px;
  font-size: xx-small;
  font-family: monospace;
  ${(props) => {
    // tag a minúsculas
    const tagKey = props.$tag ? props.$tag.toLowerCase() : "default";
    // Filtro de estilo
    const style = TAG_STYLES[tagKey] || TAG_STYLES.default;
    return `
      background-color: ${style.bg};
      color: ${style.text};
      border: 1px solid ${style.bg}; 
    `;
  }}

  @media (0px <= width <= 396px) {
    display: none;
  }
`;
// TODO: Agregar tags: python, ia, other?
export const SideInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const LinkList = styled.div`
  display: flex;
  gap: 1rem;
  font-family: monospace;
  font-size: medium;
  margin: 5rem auto 1rem auto;
  padding: 1px 5%;
  @media (min-width: 660px) {
    font-size: x-large;
    padding: 1px 12%;
  }
  justify-content: space-around;
`;

export const IconLink = styled(motion.a)`
  /* border: 1px solid red; */
  color: var(--fg);
  text-decoration: none;
  font-size: x-small;
  svg {
    width: 32px;
    height: 32px;
    fill: var(--fg); // Color inicial del SVG
    transition: fill 0.3s ease;
  }
  &:hover {
    color: var(--accent);
    border-bottom: 1px solid var(--fg);
    padding: 2px 4px;
    svg {
      width: 42px;
      height: 42px;
    }
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  /* min-height: 48px; */
`;

export const AboutWrapper = styled.div`
  text-align: left;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 660px) {
    min-width: 60%;
  }
`;

export const AboutMePanel = styled.div`
  display: flex;
  flex-direction: column; /* Móvil: Vertical */
  align-items: center; /* Móvil: Centra la foto horizontalmente */
  justify-content: center;
  gap: 2rem; /* Espacio consistente entre foto y texto */

  margin-top: 5%;
  width: 100%;

  /* Desktop */
  @media (min-width: 768px) {
    flex-direction: row; /* Desktop: Horizontal */
    align-items: flex-start; /* Alinea foto y texto al inicio (top) */
    /* Si prefieres que la foto quede justo al medio verticalmente del texto, usa: align-items: center; */
    gap: 4rem; /* Aumentamos el espacio en pantallas grandes */
    text-align: left;
  }
`;

export const PhotoAvatar = styled(motion.div)`
  /* Definimos un tamaño base fijo para evitar deformaciones */
  width: 200px;
  height: 200px;
  flex-shrink: 0; /* IMPORTANTE: Evita que la foto se aplaste si hay mucho texto */

  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--strong-fg);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1); /* Sombra suave para profundidad */

  /* Desktop: Un poco más grande */
  @media (min-width: 768px) {
    width: 230px;
    height: 230px;
  }

  z-index: 10;
`;

export const AboutMeParaph = styled(motion.p)`
  font-family: monospace;
  line-height: 1.6; /* Mejor lectura */
  font-size: 1rem;

  /* Estilo tipo "tarjeta" o limpio */
  background-color: var(--bg); /* O usa var(--quote-bg) para resaltarlo */
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem; /* Espacio entre párrafos */
  border-left: 3px solid var(--accent); /* Detalle visual elegante */

  @media (min-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
    background-color: var(--bg);
    border: none;
  }

  z-index: 10;
`;
export const BioTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; /* Toma todo el espacio restante disponible */
  max-width: 100%;
`;
// For the sidebar
export const Sidebar = styled.aside`
  width: 250px;
  background-color: var(--bg);
  padding: 1rem;
  border-right: 1px solid var(--primary-border);
`;

export const SidebarHeading = styled.h2`
  font-size: 1.5rem;
  color: var(--heading);
  margin-bottom: 1rem;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--link-fg);
    text-decoration: none;

    &:hover {
      color: var(--primary-btn-bg);
    }
  }
`;

export const CodeBlockWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  pre {
    margin: 0;
    padding: 1rem;
    border-radius: 8px;
  }
`;

export const Toolbar = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  z-index: 1;
`;

export const LanguageBadge = styled.span`
  background: var(--primary-btn-bg);
  color: var(--primary-btn-fg);
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
`;

export const CopyButton = styled(motion.button)`
  background: var(--secondary-btn-bg);
  color: var(--secondary-btn-fg);
  border: none;
  border-radius: 5px;
  padding: 1rem 0.5rem;
  font-size: 1.3rem;
  cursor: pointer;
  font-weight: bold;
  width: 100%;

  &:hover {
    background: var(--accent);
    color: var(--fg);
  }
`;
export const ButtonContainer = styled.div`
  /* border: 1px solid red; */
  width: 30%;
  margin: 1rem auto;
  @media (max-width: 659px) {
    width: 80%;
  }
  @media (min-width: 660px) {
    width: 60%;
  }
  @media (min-width: 1200px) {
    width: 40%;
  }
`;
// LEGAL page items
const LogosContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;

  justify-content: space-around;
  /* @media (min-width: 2080px) {
    flex-direction: column;
  } */
`;

const LogosBox = styled.div`
  display: flex;
  flex-direction: row;
  /* max-width: 90%; */
  margin: 1rem auto;
  flex-wrap: wrap;

  font-size: small;
  color: var(--accent);
  background-color: var(--quote-bg);
  width: 32%;
  @media (max-width: 729px) {
    width: 45%;
  }
  @media (min-width: 730px) {
    width: 43%;
  }
  @media (min-width: 900px) {
    width: 32%;
  }
`;

const LogosText = styled.div`
  width: 99%;
  padding: 3px 8px;
  /* border: 1px solid red; */
`;

const LogosTitle = styled.h3`
  font-size: larger;
`;
const LogosHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 1px 5%;
`;

const ReactIcon = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  margin: 5px;
  svg {
    color: var(--accent);
  }
  svg:hover {
    color: var(--fg);
  }
`;
