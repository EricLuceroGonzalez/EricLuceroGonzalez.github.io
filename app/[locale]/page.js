import {
  MainPageBg,
  PageContainer,
  HomePageCover,
  HeroStack,
  HeroBadge,
  HeroTitle,
  HeroSubtitle,
  HeroRole,
  HeroCTARow,
  HeroCTAPrimary,
  HeroCTASecondary,
  HeroTextLink,
} from "../ui/ComponentsStyled";
import HomeSectionBlock from "../components/HomeSectionBlock";
import FeaturedPost from "../components/FeaturedPost";
import TopicChips from "../components/TopicChips";
import LatexBlock from "../components/LatexBlock";
import AboutStrip from "../components/AboutStrip";
import FollowBlock from "../components/FollowBlock";
import ScrollDiv from "../components/navigation/ScrollDiv";
import BackgroundDots from "../components/BgMovingDots";
import HomeGreeting from "../components/HomeGreetings";
import EmojiContainer from "../ui/EmojiContainer";
import { getTopPosts, getFeaturedPost } from "../lib/api";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PersonJsonLd, WebSiteJsonLd } from "../components/JsonLd";

const PHOTO =
  "https://res.cloudinary.com/dcvnw6hvt/image/upload/v1732922346/elCronopio/Web-communication/owsftbzp6mn5iuvkogrl.jpg";
const toCard = ({ content, ...post }) => post;

export default async function Home({ params }) {
  // Obtener idioma
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const featured = getFeaturedPost(locale);
  const blogPosts = getTopPosts(["blog"], locale)
    .posts.filter((p) => p.slug !== featured?.slug)
    .map(toCard);
  const latexPosts = getTopPosts(["latex"], locale).posts.map(toCard);

  const topics = t.raw("topics");
  const cardLabels = {
    interactive: t("interactive"),
    minRead: t.raw("min_read"),
  };
  return (
    <PageContainer>
      <PersonJsonLd locale={locale} />
      <WebSiteJsonLd locale={locale} />
      <ScrollDiv />
      <MainPageBg>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <HomePageCover>
          <BackgroundDots numDots={25} contained />
          <HeroStack>
            <HeroBadge>
              <EmojiContainer />
              <HomeGreeting/>
            </HeroBadge>
            <HeroTitle>{t("hero_title")}</HeroTitle>
            <HeroSubtitle>{t("hero_subtitle")}</HeroSubtitle>
            <HeroRole>{t("about_role")}</HeroRole>
            <HeroCTARow>
              <Link href="/blog">
                <HeroCTAPrimary>{t("cta_blog")}</HeroCTAPrimary>
              </Link>
              <Link href="/latex#plantillas">
                <HeroCTASecondary>{t("cta_latex")}</HeroCTASecondary>
              </Link>
              <HeroTextLink href="/about">{t("about_cta")} →</HeroTextLink>
            </HeroCTARow>
          </HeroStack>
        </HomePageCover>

        {/* Featured post */}
        <FeaturedPost
          post={featured && toCard(featured)}
          labels={{
            featured: t("featured_label"),
            cta: t("featured_cta"),
            topics,
            ...cardLabels,
          }}
        />

        <TopicChips label={t("topics_label")} topics={topics} />

        {/* ── Blog section ─────────────────────────────────────────── */}
        <HomeSectionBlock
          title={t("latest_title")}
          seeAllHref="/blog"
          seeAllLabel={t("see_all_blog")}
          posts={blogPosts}
          accentColor="var(--accent-ink)"
          locale={locale}
          labels={cardLabels}
        />

        {/* ── LaTeX section ────────────────────────────────────────── */}
        <LatexBlock
          locale={locale}
          posts={latexPosts}
          labels={{
            title: t("latex_title"),
            subtitle: t("latex_subtitle"),
            all: t("latex_all"),
            fromBlog: t("latex_from_blog"),
            filterAll: t("latex_filter_all"),
            soonTitle: t("latex_soon_title"),
            soonText: t("latex_soon_text"),
            categories: t.raw("latex_categories"),
            minRead: t.raw("min_read"),
          }}
        />

        <AboutStrip
          photo={PHOTO}
          labels={{ title: t("about_title"), text: t("about_text"), about: t("about_cta"), research: t("about_research") }}
        />

        <FollowBlock labels={{ title: t("follow_title"), text: t("follow_text"), rss: t("follow_rss") }} />
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
