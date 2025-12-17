"use client";

import { useTranslations } from "next-intl";
import styled, { keyframes } from "styled-components";
import { Link } from "@/i18n/navigation"; // Tu Link inteligente
import { FaRobot, FaArrowLeft } from "react-icons/fa"; // O el icono que prefieras
import Image from "next/image";

// --- STYLES ---

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh; /* Para que quede centrado pero no ocupe toda la pantalla forzosamente */
  text-align: center;
  padding: 2rem;
  color: var(--fg);
  background-color: var(--bg);
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(#ff3366, #0077ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: normal;
  color: var(--accent);
  margin-bottom: 1.5rem;
`;

const Description = styled.p`
  max-width: 500px;
  margin-bottom: 2.5rem;
  opacity: 0.8;
  line-height: 1.6;
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 12px 24px;
  background-color: var(--primary-btn-bg);
  color: var(--primary-btn-fg);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--primary-btn-hover);
    transform: translateY(-2px);
  }
`;

// --- COMPONENT ---

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <Container>
      <Title>404</Title>
      <Image
        src={
          "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1739964163/elCronopio/Web-communication/call_bw_twwfv0.png"
        }
        alt={"A portrait photos of Eric Lucero"} // Texto alternativo
        width={280} // Ancho de la imagen
        height={280} // Alto de la imagen
        priority
        style={{
          height: "auto",
          zIndex: 1000,
        }}
      />
      <Subtitle>{t("title")}</Subtitle>
      <Description>{t("description")}</Description>

      <HomeButton href="/">
        <FaArrowLeft />
        {t("backHome")}
      </HomeButton>
    </Container>
  );
}
