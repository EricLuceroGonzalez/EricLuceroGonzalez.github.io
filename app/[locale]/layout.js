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

// export async function generateMetadata({ params }) {
//   const { locale } = await params;

//   // Obtenemos las traducciones del servidor para la sección "Metadata"
//   const t = await getTranslations({ locale, namespace: 'Metadata' });

//   return {
//     title: t('title'),
//     description: t('description'),
//     openGraph: {
//       title: t('title'),
//       description: t('description'),
//       url: `https://ericlucero.com/${locale}`, // URL canónica para compartir
//       siteName: 'Eric Lucero González',
//       images: [
//         {
//           url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
//           width: 1200,
//           height: 630,
//           alt: t('title'), // Texto alternativo traducido
//         },
//       ],
//       locale: locale,
//       type: 'website',
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: t('title'),
//       description: t('description'),
//       image: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
//     },
//   };
// }
export const metadata = {
  title: "Inicio | Eric Lucero González",
  description:
    "Explora el espacio personal de Eric, donde combina su experiencia en Inteligencia Artificial, LaTeX y programación. Descubre su trayectoria, tutoriales y blog.",
  openGraph: {
    title: "Bienvenido a mi página personal",
    description:
      "Una mezcla de blog, tutoriales y un vistazo a mi trayectoria en Inteligencia Artificial, LaTeX y programación. Construyendo y compartiendo conocimientos.",
    images: [
      {
        url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png", // Ruta de la imagen para el home
        width: 1200,
        height: 630,
        alt: "Vista previa del sitio web de Eric",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bienvenido a mi página personal",
    description:
      "Una mezcla de blog, tutoriales y un vistazo a mi trayectoria en Inteligencia Artificial, LaTeX y programación.",
    image:
      "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
  },
};

const NaviBar = nextDynamic(() =>
  import("../components/navigation/navbar/NaviBar")
);

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "en" }];
}

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
