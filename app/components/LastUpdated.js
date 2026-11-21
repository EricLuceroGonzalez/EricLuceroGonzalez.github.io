"use client";
import styled from "styled-components";
import { FaSyncAlt } from "react-icons/fa";

const Box = styled.aside`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.6rem;
  margin: 3rem 0 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--primary-border);
  border-left: 4px solid var(--accent);
  border-radius: 8px;
  font-size: var(--text-small);
  color: var(--fg);
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 600;
  color: var(--accent);
`;

const Note = styled.span`
  flex-basis: 100%;
  color: var(--quote-fg);
`;

// Aviso de "Última actualización" al final del post.
// El texto de la fecha llega ya formateado desde el servidor, en el idioma de la página.
export default function LastUpdated({ iso, formatted, label, note }) {
  if (!iso) return null;
  return (
    <Box aria-label={label}>
      <Label>
        <FaSyncAlt aria-hidden="true" />
        {label}:
      </Label>
      <time dateTime={iso}>{formatted}</time>
      {note && <Note>{note}</Note>}
    </Box>
  );
}
