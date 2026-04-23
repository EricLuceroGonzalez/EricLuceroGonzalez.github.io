"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useTranslations } from "next-intl";
import Link from "next/link";

// --- STYLED COMPONENTS ---
const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.6; }
  100% { opacity: 1; }
`;

const BannerContainer = styled.div`
  position: sticky;
  /* Ajusta este 'top' según la altura real de tu navbar (ej. top: 60px) si quieres que vaya debajo. 
     Si va encima de todo, déjalo en 0 */
  top: 0;
  z-index: 50;
  background: #3b82f6;
  color: #f8fafc;
  padding: 10px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-family: "Inter", system-ui, sans-serif;
  font-size: var(--text-base);
  animation: ${slideDown} 0.4s ease-out;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: var(--text-small);
    padding: 12px;
    flex-wrap: wrap; /* Permite que el botón baje en pantallas muy estrechas */
  }
`;

const LiveIndicator = styled.span`
  color: #fbbf24;
  /* font-family: "JetBrains Mono", monospace; */
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const LiveDot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: ${(props) => (props.$isPre ? "#f59e0b" : "#ef4444")};
  border-radius: 50%;
  margin-right: 6px;
  animation: ${pulse} 1.5s infinite;
`;

const CTAButton = styled(Link)`
  background-color: #ff3366;
  color: white;
  text-decoration: none;
  padding: 4px 6px;
  border-radius: 4px;
  font-weight: 600;
  font-size: var(--text-small);
  transition: background-color 0.2s;

  &:hover {
    background-color: #c5234b;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: var(--text-base);
  cursor: pointer;
  position: absolute;
  right: 16px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #f8fafc;
  }

  @media (max-width: 480px) {
    right: 8px;
    top: 8px;
  }
`;

// --- MAIN COMPONENT ---
export default function ArtemisBanner() {
  const t = useTranslations("ArtemisTracker");
  const [isVisible, setIsVisible] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  // La misma hora oficial en UTC que tu tracker principal
  const officialLaunchUTC = new Date("2026-04-01T22:35:12Z").getTime();
  // Asumimos que la misión termina unos 10 días después (aprox) para ocultar el banner
  const missionEndUTC = officialLaunchUTC + 10 * 24 * 60 * 60 * 1000;

  useEffect(() => {
    const isDismissed = localStorage.getItem("artemisBannerDismissed");

    if (isDismissed === "true" || Date.now() > missionEndUTC) {
      return;
    }

    setIsVisible(true);
    const timer = setInterval(() => {
      setElapsedMs(Date.now() - officialLaunchUTC);
    }, 1000);

    // Forzamos un cálculo inicial
    setElapsedMs(Date.now() - officialLaunchUTC);

    return () => clearInterval(timer);
  }, [officialLaunchUTC, missionEndUTC]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("artemisBannerDismissed", "true");
  };

  if (!isVisible) return null;

  const isPreLaunch = elapsedMs < 0;

  // Formateador de tiempo (reutilizado)
  const formatTime = (ms) => {
    const absMs = Math.abs(ms);
    const d = Math.floor(absMs / (1000 * 60 * 60 * 24));
    const h = Math.floor((absMs / (1000 * 60 * 60)) % 24);
    const m = Math.floor((absMs / 1000 / 60) % 60);
    const s = Math.floor((absMs / 1000) % 60);

    const dayStr = isPreLaunch && d === 0 ? "" : `${d}d `;
    return `${isPreLaunch ? "T- " : "MET "}${dayStr}${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <BannerContainer>
      <div>
        <span>{isPreLaunch ? t("bannerTextPre") : t("bannerTextActive")}</span>
        <LiveIndicator>
          <LiveDot $isPre={isPreLaunch} />
          {formatTime(elapsedMs)}
        </LiveIndicator>
      </div>

      <CTAButton href="/artemis">{t("bannerCTA")}</CTAButton>

      <CloseButton onClick={handleClose} aria-label="Close banner">
        ✕
      </CloseButton>
    </BannerContainer>
  );
}
