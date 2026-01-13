"use client";
import { Link } from "@/i18n/navigation";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const PathBlock = styled(motion.div)`
  display: flex;
  flex-direction: row;
  margin: 0.5rem auto 3rem auto;
  text-align: left;
  font-size: small;
  @media (0 <= width <= 410px) {
    font-size: x-small;
  }
  /* Same as <Article> */
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
    width: 50%;
  }
  /* border: 1px solid red; */
`;
const PathSlash = styled.div`
  color: var(--fg);
  margin: 0 2px;
`;
const PathLink = styled(Link)`
  color: var(--accent);
`;
const CurrentPage = styled.span`
  color: var(--accent);
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px; /* Evita que un título largo rompa el diseño en móvil */
`;
const ShowPath = ({ title }) => {
  const thisPath = usePathname();
  const pathSegments = thisPath.split("/").filter(Boolean);
  const category = pathSegments[1];
  // Si estamos en el home, no mostramos nada o solo home
  if (thisPath === "/" || thisPath === "/es" || thisPath === "/en") {
    return null;
  }
  return (
    <>
      <PathBlock
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.3,
          scale: { type: "spring", visualDuration: 0.3, bounce: 0.5 },
        }}
      >
        <PathLink href={"/"}>home</PathLink>
        {/* 2. Link a la Categoría (Blog, Papers, etc.) */}
        {category && (
          <>
            <PathSlash>/</PathSlash>
            {/* El Link d e i18n maneja el prefijo de idioma automáticamente */}
            <PathLink href={`/${category}`}>{category}</PathLink>
          </>
        )}

        {/* 3. Título Actual */}
        {title && (
          <>
            <PathSlash>/</PathSlash>
            <CurrentPage>{title}</CurrentPage>
          </>
        )}
        {/* <PathLink href={`/${pathSplit[1]}`}>{pathSplit[1]}</PathLink>
        <PathSlash>/</PathSlash>
        {params.title ? params.title : ""} */}
      </PathBlock>
    </>
  );
};

export default ShowPath;
