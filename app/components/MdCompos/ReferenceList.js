"use client";
import { useTranslations } from "next-intl";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa6";
import styled from "styled-components";
// Contenedor de la lista
const RefNumbers = styled.ol`
  list-style: none;
  counter-reset: ref-counter;
  padding-left: 0;
  margin-top: 1rem;
  font-size: var(--text-small);

  li {
    counter-increment: ref-counter;
    margin-bottom: 0.8rem;
    display: flex;
    align-items: baseline; /* Alinea el número con la primera línea de texto */
    gap: 0.5rem; /* Espacio entre el [1] y el texto */
    line-height: 1.5;
  }

  /* El número [1] */
  li::before {
    content: "[" counter(ref-counter) "]";
    color: var(--link-fg);
    font-weight: bold;
    min-width: 1.8em;
    text-align: right;
    flex-shrink: 0;
  }
`;

const RefEntry = styled.li`
  text-align: left;
`;
// Wrapper para el contenido del texto para que se mantenga junto en la columna derecha
const RefContent = styled.div`
  flex: 1;
  word-break: break-word;
`;

const RefTex = styled.a`
  margin-left: 8px;
  color: var(--heading);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  opacity: 0.7;
  transition: opacity 0.2s;
  color: var(--emphasis-bg);
  &:hover {
    opacity: 1;
  }

  svg {
    font-size: 1.2em;
  }
`;

const RefUrl = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--quote-fg);

  font-size: var(--text-small);
  margin-left: 4px;

  &:hover {
    color: var(--accent);
  }

  svg {
    font-size: 1.2em;
  }
`;
// solo envuelve a los hijos
export const ReferenceList = ({ children }) => {
  return (
    <div>
      <RefNumbers>{children}</RefNumbers>
    </div>
  );
};

// recibe strings simples
export const ReferenceItem = ({ id, text, url }) => {
  const t = useTranslations("mdxComponents");

  if (!text) return null; // Seguridad anti-crashes

  return (
    <RefEntry id={`ref-${id}`}>
      <RefContent>
        <span>{text}</span>
        {url && (
          <>
            {", "}
            <RefUrl href={url} target="_blank" rel="noopener noreferrer">
              {url} <FaExternalLinkAlt style={{ color: "var(--primary)" }} />
            </RefUrl>
          </>
        )}
        <RefTex href={`#cite-${id}`} aria-label="Volver al texto">
          ({t("Reference_back")})
          <FaArrowUp />
        </RefTex>
      </RefContent>
    </RefEntry>
  );
};
