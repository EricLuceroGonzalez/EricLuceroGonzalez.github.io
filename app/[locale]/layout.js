import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  setRequestLocale,
  getTranslations,
} from "next-intl/server";
import React, { Suspense } from "react";
import Footer from "../components/navigation/footer";
import Providers from "../Providers.js";
// import { Alexandria, Parkinsans } from "next/font/google";
import { parkisans } from "../ui/fonts.js";
// import { MathJaxContext } from "better-react-mathjax";
// import NaviBar from "./components/navigation/navbar/NaviBar";

import nextDynamic from "next/dynamic";

export const dynamic = "force-static";
export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Obtenemos las traducciones del servidor para la sección "Metadata"
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucerogonzalez.github.io";

  return {
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
      title: t("templateTitle"),
      description: t("description"),
      url: `${URLbase}/${locale}`, // URL canónica para compartir
      siteName: "Eric Lucero González",
      images: [
        {
          url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
          width: 1200,
          height: 630,
          alt: t("templateTitle"), // Texto alternativo traducido
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("templateTitle"),
      description: t("description"),
      image:
        "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
    },
  };
}

const NaviBar = nextDynamic(() =>
  import("../components/navigation/navbar/NaviBar")
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
  // Siempre en primera línea dentro de la función
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${parkisans.className}`}
      suppressHydrationWarning
    >
      <body style={{ width: "100%" }} antialiased="true">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <NaviBar />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
