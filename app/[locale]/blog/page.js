// import React from "react";
import {
  MainPageBg,
  PageContainer,
  TitlePage,
} from "../../ui/ComponentsStyled";
import { getPostsByType } from "../../lib/api";
import { notFound } from "next/navigation";
import HomeBoxes from "../../components/HomeBoxes";
import { Layout } from "../../ui/lugs";
import {
  MdParagraph,
  MdListItem,
  MdUnorderedList,
} from "../../ui/MarkDownComponents";
import ShowPath from "../../components/showPath";
import ScrollDiv from "../../components/navigation/ScrollDiv";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BackgroundDots from "@/app/components/BgMovingDots";

const BlogPage = async ({ params }) => {
  // 1. Obtener idioma
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });
  // const blogPosts = getBlogPosts();
  const blogPosts = getPostsByType(["blog"], 0, locale);
  if (!blogPosts.posts) {
    return notFound();
  }
  return (
    <Layout>
      <PageContainer>
        <ScrollDiv />
        <BackgroundDots numDots={90} />
        <MainPageBg>
          <ShowPath title={""} />
          <TitlePage>{t("title")}</TitlePage>
          <MdParagraph>{t("copy_text")}</MdParagraph>
          <HomeBoxes props={blogPosts.posts} locale={locale} />
        </MainPageBg>
      </PageContainer>
    </Layout>
  );
};

export default BlogPage;

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
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("description"),
      image: t("thumbnailImage"),
    },
  };
}
