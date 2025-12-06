"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
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
export const Article = styled.article`
  width: 90%;
  margin: 0 auto;
  background-color: var(--bg);
  color: var(--fg);
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  width: 70%;

  @media (min-width: 880px) {
    width: 70%;
    /* border: 2px dashed red; */
  }
  @media (min-width: 1080px) {
    width: 50%;
  }
  @media (max-width: 728px) {
    min-width: 100%;
    padding: 5px;
    box-shadow: none;
    font-size: small;
    /* border: 2px solid orange; */
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

export const Date = styled.p`
  font-size: 0.65rem;
  /* margin-bottom: 2rem; */
  color: var(--gray-light);
  font-family: monospace;
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

  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;

export const BoxGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  margin: 2rem 0 8rem 0;
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

export const MetaInfo = styled.div`
  margin-bottom: 0.5rem;
  font-size: small;
  color: var(--gray-light);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (min-width: 668px) {
    width: 80%;
    flex-direction: row;
  }
  @media (max-width: 667px) {
    margin-bottom: 2.75rem;
    width: 95%;
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
  background-color: ${(props) => {
    // Retorna el color basado en la prop "tag"
    switch (props.tag) {
      case "blog":
        return "var(--accent)";
      case "js":
        return "var(--heading)";
      case "latex":
        return "var(--fg)";
      case "curso":
        return "var(--emphasis-fg)";
      case "python":
        return "var(--link-fg)";
      case "ia":
        return "var(--primary-border)";
      case "IA":
        return "var(--primary-border)";
      default:
        return "var(--subheading)"; // Color por defecto
    }
  }};
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
  padding: 1px 10%;
  @media (min-width: 660px) {
    font-size: large;
  }
  /* border: 1px solid red; */
  justify-content: space-around;
`;

export const IconLink = styled.a`
  color: var(--strong-fg);
  text-decoration: none;
  svg {
    width: 14px;
    height: 14px;
    fill: var(--fg); // Color inicial del SVG
    transition: fill 0.3s ease;
  }
  &:hover {
    color: var(--accent);
    font-size: larger;
    font-weight: bold;
  }
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
  flex-direction: column;
  @media (min-width: 660px) {
    flex-direction: row;
    font-size: large;
  }
  margin-top: 2rem;
`;

export const AboutMeParaph = styled(motion.p)`
  font-size: medium;
  font-family: monospace;
  text-align: justify;
  border: 1px dashed var(--gray-light);
  padding: 12px;
  @media (min-width: 660px) {
    margin-left: 2rem;
    max-width: 50%;
    font-size: large;
  }
`;

export const PhotoAvatar = styled(motion.div)`
  width: 200px; /* Tamaño del círculo */
  height: 200px;
  border-radius: 50%; /* Hace que la imagen sea circular */
  overflow: hidden; /* Asegura que el contenido no se salga del contenedor */
  border: 2px solid var(--strong-fg); /* Opcional: borde */
  /* width: 20%; */
  margin: 0 auto;
  @media (max-width: 600px) {
    width: 100px; /* Tamaño del círculo */
    height: 100px;
  }
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
