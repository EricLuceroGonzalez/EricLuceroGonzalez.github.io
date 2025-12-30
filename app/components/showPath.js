"use client";
import { Link } from "@/i18n/navigation";
import styled from "styled-components";
import { usePathname } from "next/navigation";

const PathBlock = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0.5rem auto 3rem auto;
  text-align: left;
  font-size: small;
  @media (0 <= width <= 410px) {
    font-size: x-small;
  }
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
      <PathBlock>
        <PathLink href={"/"}>home</PathLink>
        {/* 2. Link a la Categoría (Blog, Papers, etc.) */}
        {category && (
          <>
            <PathSlash>/</PathSlash>
            {/* El Link de i18n maneja el prefijo de idioma automáticamente */}
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
