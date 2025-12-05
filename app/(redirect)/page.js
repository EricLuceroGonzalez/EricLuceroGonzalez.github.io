// app/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainPageBg, PageContainer, TitlePage } from "../ui/ComponentsStyled";
import styled from "styled-components";
import SpinnerLoad from "../components/SpinnerLoad";

const Spinner = styled.svg`
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detección simple del navegador
    const userLang = navigator.language.startsWith("es") ? "es" : "en";
    console.log("Redirecting to locale:", userLang);
    router.replace(`/${userLang}`);
  }, [router]);

  return (
    <PageContainer>
      <MainPageBg>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
            gap: "20px",
          }}
        >
          <TitlePage>Redirecting to home...</TitlePage>
          <SpinnerLoad />
          {/* Opcional: Enlaces manuales por si falla JS */}
          <a href="/es">Español</a>
          <a href="/en">English</a>
        </div>
      </MainPageBg>
    </PageContainer>
  );
}
