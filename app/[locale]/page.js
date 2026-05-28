import {
  HomePageCover,
  HomePageCoverText,
  HeroCTAPrimary,
  HeroCTASecondary,
  HeroCTARow,
  HeroTagline,
  MainPageBg,
  PageContainer,
} from "../ui/ComponentsStyled";
import HomeSectionBlock from "../components/HomeSectionBlock";
import ResourcesPreviewBlock from "../components/ResourcesPreviewBlock";

import { TitlePage, SubTitle, SubSubTitle } from "../ui/TitlesComponents";
import HomeBoxes from "../components/HomeBoxes";
import GeneticSimulation from "../components/algorithms/GeneticSimulation";
import { MdParagraph } from "../ui/MarkDownComponents";
import ScrollDiv from "../components/navigation/ScrollDiv";
import { getPostsByType } from "../lib/api";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BackgroundDots from "../components/BgMovingDots";
import HomeGreeting from "../components/HomeGreetings";
import EmojiContainer from "../ui/EmojiContainer";
import { Link } from "@/i18n/navigation";

export default async function Home({ params }) {
  // 1. Obtener idioma
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });
  // const allPostsData = getAllPosts([], locale);
  const allPostsData = getPostsByType(["blog"], 0, locale);
  const allLatexPosts = getPostsByType(["latex"], 0, locale);

  return (
    <PageContainer>
      <ScrollDiv />
      {/* <BackgroundDots numDots={90} /> */}
      <MainPageBg>

       {/* ── Hero ─────────────────────────────────────────────────── */}
        <HomePageCover>
          <HomePageCoverText>
            <TitlePage>
              <span
                className="sr-only"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                {t("title")}
              </span>
              <span aria-hidden="true" style={{ display: "flex", gap: "2px" }}>
                <EmojiContainer />
                <HomeGreeting defaultGreeting={t("title")} />
              </span>
            </TitlePage>

            <HeroTagline>{t("about_role")}</HeroTagline>

            <HeroCTARow>
              <Link href="/blog">
                <HeroCTAPrimary>Blog</HeroCTAPrimary>
              </Link>
              <Link href="/recursos">
                <HeroCTASecondary>{t("resources_preview_title")}</HeroCTASecondary>
              </Link>
              <Link href="/about">
                <HeroCTASecondary>{t("about_cta")}</HeroCTASecondary>
              </Link>
            </HeroCTARow>
          </HomePageCoverText>
          <BackgroundDots numDots={40} />
        </HomePageCover>

        {/* ── Blog section ─────────────────────────────────────────── */}
        <HomeSectionBlock
          title="Blog"
          seeAllHref="/blog"
          seeAllLabel={t("see_all_blog")}
          posts={allPostsData.posts}
          accentColor="var(--accent)"
          locale={locale}
        />

        {/* ── LaTeX section ────────────────────────────────────────── */}
        {allLatexPosts.posts.length > 0 && (
          <HomeSectionBlock
            title="LaTeX"
            seeAllHref="/latex"
            seeAllLabel={t("see_all_latex")}
            posts={allLatexPosts.posts}
            accentColor="var(--latex-green)"
            locale={locale}
          />
        )}

        {/* ── Resources preview ────────────────────────────────────── */}
        <ResourcesPreviewBlock
          title={t("resources_preview_title")}
          seeAllHref="/recursos"
          seeAllLabel={t("see_all_resources")}
        />
      </MainPageBg>
    </PageContainer>
  );
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucero.dev";

  return {
    title: t("defaultTitle"),
    description: t("description"),
    keywords: t("keywords"),
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
      url: `${URLbase}/${locale}`,
      siteName: "Eric Lucero González",
      images: [
        {
          url: t("thumbnailImage"),
          width: 1200,
          height: 630,
          alt: t("defaultTitle"),
        },
      ],
      locale,
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