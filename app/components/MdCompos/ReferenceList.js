"use client";
import { MdSubHeadA } from "@/app/ui/MarkDownComponents";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IoReturnDownBack } from "react-icons/io5";
import styled from "styled-components";

// Contenedor de la lista
const RefNumbers = styled.ol`
  list-style: none;
  counter-reset: ref-counter;
  padding-left: 0;
  margin-top: 1rem;

  li {
    counter-increment: ref-counter;
    margin-bottom: 0.8rem;
    display: flex; /* Esto crea dos columnas: número y contenido */
    align-items: baseline; /* Alinea el número con la primera línea de texto */
    gap: 0.5rem; /* Espacio entre el [1] y el texto */
    font-size: 1rem;
    line-height: 1.5;
  }

  /* El número [1] */
  li::before {
    content: "[" counter(ref-counter) "]";
    color: var(--link-fg);
    font-weight: bold;
    min-width: 1.8em; /* Ancho fijo para que todos los números se alineen */
    text-align: right; /* Alinea el número a la derecha dentro de su caja */
    flex-shrink: 0; /* Evita que el número se aplaste si hay poco espacio */
  }
`;

// Wrapper para el contenido del texto para que se mantenga junto en la columna derecha
const RefContent = styled.div`
  flex: 1; /* Toma todo el espacio restante */
  word-break: break-word; /* Evita que URLs largas rompan el layout */
`;

const RefTex = styled.a`
  margin-left: 8px;
  color: var(--heading);
  font-size: 0.85em;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  opacity: 0.8;
  transition: opacity 0.2s;
  font-weight: bold;
  &:hover {
    color: var(--emphasis-bg);
    opacity: 1;
  }

  svg {
    font-size: 1.1em;
  }
`;

const RefUrl = styled.a`
  display: inline-flex; /* IMPORTANTE: inline-flex para no romper la línea */
  align-items: center;
  gap: 4px;
  color: var(--quote-fg);

  font-size: 0.9em;
  margin-left: 4px;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: var(--accent);
  }

  svg {
    font-size: 0.8em;
  }
`;

export const ReferenceList = ({ references }) => {
  if (!references || references.length === 0) return null;

  return (
    <div>
      <RefNumbers>
        {references.map(({ id, text, url }) => (
          <li key={id} id={`ref-${id}`}>
            {/* Envolvemos todo el contenido (texto + links) en un div para que sea el segundo hijo del Flex */}
            <RefContent>
              <span>{text}</span>
              {url && (
                <>
                  {", "}
                  <RefUrl href={url} target="_blank" rel="noopener noreferrer">
                    {url}{" "}
                    <FaExternalLinkAlt style={{ color: "var(--primary)" }} />
                  </RefUrl>
                </>
              )}
              <RefTex href={`#cite-${id}`} aria-label="Volver al texto">
                <IoReturnDownBack />
                (volver)
              </RefTex>
            </RefContent>
          </li>
        ))}
      </RefNumbers>
    </div>
  );
};
