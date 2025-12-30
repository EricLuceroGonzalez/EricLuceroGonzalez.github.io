// app/page.js
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainPageBg, PageContainer, TitlePage } from "../ui/ComponentsStyled";
import SpinnerLoad from "../components/SpinnerLoad";
import BackgroundDots from "../components/BgMovingDots";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detección simple del navegador
    const userLang = navigator.language.startsWith("es") ? "es" : "en";
    router.replace(`/${userLang}`);
  }, [router]);

  return (
    <PageContainer>
      <BackgroundDots numDots={90} />
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
          <SpinnerLoad />
          <TitlePage>Redirecting to home...</TitlePage>
          {/* Opcional: Enlaces manuales por si falla JS */}
          <a href="/es">Español</a>
          <a href="/en">English</a>
        </div>
      </MainPageBg>
    </PageContainer>
  );
}
