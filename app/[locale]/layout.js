import { NextIntlClientProvider } from "next-intl";
import "katex/dist/katex.min.css";
import {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import React from "react";
import Footer from "../components/navigation/footer";
import Providers from "../Providers.js";
import { parkinsans } from "../ui/fonts.js";
// import { MathJaxContext } from "better-react-mathjax";
// import NaviBar from "./components/navigation/navbar/NaviBar";
import { Analytics } from "@vercel/analytics/next";
import nextDynamic from "next/dynamic";
import ViewportSize from "../components/viewPortViewer";

export const dynamic = "force-static";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Obtenemos las traducciones del servidor para la sección "Metadata"
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucero.dev";

  return {
    metadataBase: new URL("https://ericlucero.dev"), // IMPORTANTE para SEO
    title: t("defaultTitle"),
    description: t("description"),
    keywords: t("keywords"),
    // Configuración vital para SEO Multilingüe
    alternates: {
      canonical: `${URLbase}/${locale}`,
      languages: {
        es: `${URLbase}/es`,
        en: `${URLbase}/en`,
      },
    },
    openGraph: {
      title: t("defaultTitle"),
      description: t("description"),
      url: `${URLbase}/${locale}`, // URL canónica para compartir
      siteName: "Eric Lucero González",
      images: [
        {
          url: t("thumbnailImage"),
          width: 1200,
          height: 630,
          alt: t("defaultTitle"), // Texto alternativo traducido
        },
      ],
      locale: locale,
      type: "website",
      logo: t("metaLogo"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("description"),
      image: t("thumbnailImage"),
    },
    verification: {
      google: "eVlOcpMqZW3--b3rPPmcJRQ4FHLq6o0flgliTMuWNsk",
    },
  };
}

const NaviBar = nextDynamic(
  () => import("../components/navigation/navbar/NaviBar"),
);

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0077FF" }, // Blanco o gris claro
    { media: "(prefers-color-scheme: dark)", color: "#FF3366" }, // Negro o tu gris oscuro
  ],
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${parkinsans.className}`}
      suppressHydrationWarning
    >
      <body style={{ width: "100%" }} antialiased="true">
        <Analytics />
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <NaviBar />
            {/* <ViewportSize /> */}
            <main>{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
