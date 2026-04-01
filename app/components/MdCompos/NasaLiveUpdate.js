"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

// --- STYLED COMPONENTS ---
const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
`;

const WidgetContainer = styled.div`
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid #3b82f6;
  border-left: 4px solid #ef4444; /* Rojo urgencia */
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  border-bottom: 1px solid #334155;
  padding-bottom: 8px;
`;

const Title = styled.h4`
  margin: 0;
  color: #f8fafc;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const LiveDot = styled.span`
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  display: inline-block;
  animation: ${pulse} 1.5s infinite;
`;

const Timestamp = styled.span`
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: #fbbf24;
  font-weight: bold;
`;

const Content = styled.p`
  margin: 0;
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.6;
  white-space: pre-wrap;
`;

const SourceLink = styled.a`
  display: inline-block;
  margin-top: 12px;
  font-size: 11px;
  color: #38bdf8;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// --- MAIN COMPONENT ---
export default function NasaLiveUpdate() {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNASAUpdate = async () => {
    try {
      const res = await fetch("/api/nasa-update");
      const data = await res.json();
      if (data && !data.error) {
        setNews(data);
      }
    } catch (err) {
      console.error("Error fetching news from our API", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // 1. Obtener los datos apenas carga el componente
    fetchNASAUpdate();

    // 2. Configurar un intervalo (polling) para preguntar por nuevas actualizaciones cada 60 segundos
    const intervalId = setInterval(fetchNASAUpdate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (loading) return null; // O un esqueleto de carga
  if (!news) return null; // Si falló el scraping, simplemente lo ocultamos para no romper el diseño

  return (
    <WidgetContainer>
      <Header>
        <Title>
          <LiveDot /> NASA Live Feed
        </Title>
        <Timestamp>Hora Este: {news.time}</Timestamp>
      </Header>

      <Content>{news.update}</Content>

      <SourceLink href={news.source} target="_blank" rel="noopener noreferrer">
        Leer actualización original en NASA.gov ↗
      </SourceLink>
    </WidgetContainer>
  );
}
