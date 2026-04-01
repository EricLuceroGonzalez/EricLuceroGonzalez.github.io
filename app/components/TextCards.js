"use client"; // ¡Súper importante en Next.js para styled-components!

import React from "react";
import styled from "styled-components";

// --- ESTILOS ---
const CardContainer = styled.article`
  background-color: #ffffff;
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.04);
  max-width: 600px;
  font-family:
    system-ui,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    sans-serif;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
  }
`;

const TuitTexto = styled.p`
  font-size: 1.15rem;
  color: #0f1419;
  line-height: 1.5;
  margin: 0 0 16px 0;
  white-space: pre-wrap; /* Respeta los saltos de línea de tu bot */
`;

const MetadatosFuente = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  color: #536471;
  background-color: #f7f9f9;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const DatoDestacado = styled.span`
  font-weight: 600;
  color: #0f1419;
`;

const FooterTuit = styled.div`
  font-size: 0.85rem;
  color: #8b98a5;
  border-top: 1px solid #eff3f4;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
`;

// --- COMPONENTE REACT ---
export default function TextCard({ tuit }) {
  // Formateamos la fecha para que se lea: "19 de marzo de 2026, 21:53"
  const fechaFormateada = tuit.fecha_ultimo_post
    ? new Date(tuit.fecha_ultimo_post).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Fecha de publicación desconocida";

  return (
    <CardContainer>
      {/* El texto principal del tuit */}
      <TuitTexto>{tuit.texto}</TuitTexto>

      {/* Los datos de la hemeroteca */}
      <MetadatosFuente>
        <span>
          📚 <DatoDestacado>{tuit.libro}</DatoDestacado>
        </span>
        {tuit.autor && <span>| ✍️ {tuit.autor}</span>}
        {tuit["año"] && <span>| 🗓️ {tuit["año"]}</span>}
      </MetadatosFuente>

      {/* Fecha en la que el bot lo publicó */}
      <FooterTuit>
        <span>🤖 Publicado por el Bot</span>
        <span>{fechaFormateada}</span>
      </FooterTuit>
    </CardContainer>
  );
}
