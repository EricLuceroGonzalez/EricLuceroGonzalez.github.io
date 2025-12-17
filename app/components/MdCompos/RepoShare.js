"use client";

import styled from "styled-components";
import { FaGithub, FaCodeBranch } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useTranslations } from "next-intl";

// --- CONTENEDOR PRINCIPAL (Para ubicarlo al final del texto) ---
const Container = styled.div`
  display: flex;
  justify-content: flex-start; /* O 'center' o 'flex-end' según prefieras */
  margin-top: 2rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--gray-light); /* Una línea sutil de separación */
`;

// --- OPCIÓN 1: ESTILO SHIELD (Clásico partido) ---
const ShieldLink = styled.a`
  display: inline-flex;
  align-items: stretch; /* Estira los hijos para que tengan la misma altura */
  text-decoration: none;
  border-radius: 6px;
  overflow: hidden; /* Importante para el border-radius */
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 13px;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 28px; /* Altura fija típica de shields */

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ShieldLabel = styled.div`
  background-color: #24292e; /* Color GitHub Dark */
  color: white;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 6px;
`;

const ShieldValue = styled.div`
  background-color: #0366d6; /* Color GitHub Blue (o usa var(--accent)) */
  color: white;
  display: flex;
  align-items: center;
  padding: 0 10px;
  transition: background-color 0.2s;

  ${ShieldLink}:hover & {
    background-color: #0256b9; /* Un poco más oscuro al hover */
  }
`;

// --- OPCIÓN 2: ESTILO MODERNO (Unificado) ---
const ModernBadge = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--secondary-btn-bg); /* O un color suave de fondo */
  color: var(--fg);
  border: 1px solid var(--gray-medium);
  padding: 6px 12px;
  border-radius: 20px; /* Pill shape */
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--fg);
    color: var(--bg);
    border-color: var(--fg);
  }

  svg {
    font-size: 1.1em;
  }
`;

// --- COMPONENTE ---

export const RepoFooter = ({ url, type = "shield" }) => {
  const t = useTranslations("SmallComponents");
  if (!url) return null;

  return (
    <Container>
      {type === "shield" ? (
        <ShieldLink href={url} target="_blank" rel="noopener noreferrer">
          <ShieldLabel>
            <FaGithub />
            <span>{t("source")}</span>
          </ShieldLabel>
          <ShieldValue>
            {t("instructions")}{" "}
            <FaArrowUpRightFromSquare
              style={{ marginLeft: 5, fontSize: "0.8em" }}
            />
          </ShieldValue>
        </ShieldLink>
      ) : (
        <ModernBadge href={url} target="_blank" rel="noopener noreferrer">
          <FaCodeBranch />
          <span>{t("secondary_mssg")}</span>
        </ModernBadge>
      )}
    </Container>
  );
};
