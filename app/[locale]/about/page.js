import React from "react";
import { MainBg } from "../../ui/ComponentsStyled";
import {
  AboutMePanel,
  AboutMeParaph,
  AboutWrapper,
  IconLink,
  Layout,
  LinkList,
  PhotoAvatar,
} from "../../ui/lugs";
import Image from "next/image";
import ShowPath from "../../components/showPath";
import { FaSquareXTwitter } from "react-icons/fa6";

import { getTranslations, setRequestLocale } from "next-intl/server";
import BackgroundDots from "@/app/components/BgMovingDots";

export default async function About({ params }) {
  const { locale } = await params;
  setRequestLocale(locale);
  // const t = useTranslations("About");
  const t = await getTranslations({ locale, namespace: "About" });
  return (
    <Layout>
      <MainBg>
        <BackgroundDots numDots={90} />
        <AboutWrapper>
          <ShowPath title={""} />
          <AboutMePanel>
            <PhotoAvatar
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.5 },
              }}
            >
              <Image
                src={
                  "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1765059827/elCronopio/pots-12_h4swi6.jpg"
                  //   "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732922346/elCronopio/owsftbzp6mn5iuvkogrl.jpg"
                }
                alt={"A portrait photos of Eric Lucero"} // Texto alternativo
                width={150} // Ancho de la imagen
                height={150} // Alto de la imagen
                priority
                style={{
                  width: "100%",
                  height: "auto",
                }}
              />
            </PhotoAvatar>

            <AboutMeParaph
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                scale: { type: "spring", visualDuration: 0.5, bounce: 0.3 },
              }}
            >
              {t("content")}
            </AboutMeParaph>
          </AboutMePanel>
          <LinkList>
            <IconLink
              href="https://github.com/EricLuceroGonzalez"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="18"
                height="18"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path>
              </svg>{" "}
              GitHub
            </IconLink>
            <IconLink
              href="https://www.linkedin.com/in/ericlucerog/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="18"
                height="18"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
              LinkedIn
            </IconLink>
            <IconLink href="mailto:ericlucerogonzalez@gmail.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="18"
                height="18"
              >
                <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z" />
              </svg>{" "}
              Email
            </IconLink>
            <IconLink
              href="https://x.com/EricLuceroG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareXTwitter />
              Twitter / X
            </IconLink>
          </LinkList>
        </AboutWrapper>
      </MainBg>
    </Layout>
  );
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Obtenemos las traducciones del servidor para la sección "Metadata"
  const t = await getTranslations({ locale, namespace: "About" });
  const URLbase = "https://ericlucerogonzalez.github.io";

  return {
    title: t("title"),
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
      title: t("title"),
      description: t("description"),
      url: `${URLbase}/${locale}`, // URL canónica para compartir
      siteName: "Eric Lucero González",
      images: [
        {
          url: "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
          width: 1200,
          height: 630,
          alt: t("description"), // Texto alternativo traducido
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      image:
        "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732970163/elCronopio/elcronopio_eewxj0.png",
    },
  };
}
