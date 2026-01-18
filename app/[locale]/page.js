import {
  HomePageCover,
  HomePageCoverText,
  LatexSection,
  MainPageBg,
  PageContainer,
  SubTitlePage,
  TitlePage,
} from "../ui/ComponentsStyled";
import HomeBoxes from "../components/HomeBoxes";
import { MdParagraph } from "../ui/MarkDownComponents";
import ScrollDiv from "../components/navigation/ScrollDiv";
import { getPostsByType } from "../lib/api";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BackgroundDots from "../components/BgMovingDots";
import EmojiContainer from "../ui/EmojiContainer";

export default async function Home({ params }) {
  // 1. Obtener idioma
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });
  // const allPostsData = getAllPosts([], locale);
  const allPostsData = getPostsByType(["blog"], 0, locale);
  const allLatexPosts = getPostsByType(["latex", "LaTeX"], 0, locale);

  return (
    <PageContainer>
      <ScrollDiv />
      <BackgroundDots numDots={90} />
      <MainPageBg>
        <HomePageCover>
          <HomePageCoverText>
            <TitlePage>
              {t("title")} <EmojiContainer />
            </TitlePage>
            {/* <CoverTitle>Eric Lucero González </CoverTitle> */}
          </HomePageCoverText>
          <BackgroundDots numDots={40} />
        </HomePageCover>
        <MdParagraph>{t("copy_text.p1")}</MdParagraph>
        <MdParagraph>{t("copy_text.p2")}</MdParagraph>

        <SubTitlePage>Blog</SubTitlePage>

        <HomeBoxes props={allPostsData.posts} />
        {allLatexPosts.posts.length > 0 ? (
          <LatexSection>
            <SubTitlePage>LaTeX</SubTitlePage>
            <HomeBoxes props={allLatexPosts.posts} />
          </LatexSection>
        ) : null}
      </MainPageBg>
    </PageContainer>
  );
}

export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Obtenemos las traducciones del servidor para la sección "Metadata"
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucero.dev";

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
      logo: t("metaLogo"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("defaultTitle"),
      description: t("description"),
      image: t("thumbnailImage"),
    },
  };
}
