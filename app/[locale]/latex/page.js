import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { MainPageBg, PageContainer } from "../../ui/ComponentsStyled";
import { TitlePage } from "../../ui/TitlesComponents";
import { Layout } from "../../ui/BasicDivs";
import {
  MdBlockQuote,
  MdParagraph,
  MdSubHeadA,
} from "../../ui/MarkDownComponents";
import { getPostsByType } from "../../lib/api";
import HomeBoxes from "../../components/HomeBoxes";
import LatexBlock from "../../components/LatexBlock";
import TableOfContentsAside from "../../components/ToCAside";
import ShowPath from "../../components/showPath";
import ScrollDiv from "../../components/navigation/ScrollDiv";
import { alternatesFor } from "@/app/lib/seo";

const URL_BASE = "https://ericlucero.dev";
const toCard = ({ content, ...post }) => post;
const sectionTitle = { color: "var(--heading)", marginTop: "3rem" };

const Latex = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "LatexPage" });
  const home = await getTranslations({ locale, namespace: "HomePage" });

  const { posts } = getPostsByType(["latex"], 0, locale);
  if (!posts) notFound();
  const cards = posts.map(toCard);

  const tocItems = cards.map((post) => ({
    slug: post.slug,
    title: post.title,
    href: `/latex/${post.slug}`,
  }));

  return (
    <Layout>
      <PageContainer>
        <ScrollDiv />
        <ShowPath />
        <MainPageBg
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0, 0.71, 0.2, 1.01] }}
        >
          <TitlePage>{t("title")}</TitlePage>
          <MdParagraph style={{ fontSize: "1.1rem", color: "var(--subheading)", maxWidth: "40rem" }}>
            {t("subtitle")}
          </MdParagraph>

          <MdSubHeadA style={sectionTitle}>
            {t("templates_title")}
          </MdSubHeadA>
          <MdParagraph style={{ color: "var(--subheading)" }}>
            {home("latex_subtitle")}
          </MdParagraph>
          <LatexBlock
            id="plantillas"
            showHead={false}
            locale={locale}
            labels={{
              title: t("templates_title"),
              subtitle: home("latex_subtitle"),
              all: home("latex_all"),
              fromBlog: home("latex_from_blog"),
              filterAll: home("latex_filter_all"),
              soonTitle: home("latex_soon_title"),
              soonText: home("latex_soon_text"),
              categories: home.raw("latex_categories"),
              minRead: home.raw("min_read"),
            }}
          />

          {cards.length > 0 && (
            <>
              <MdSubHeadA style={sectionTitle}>{t("articles_title")}</MdSubHeadA>
              <HomeBoxes props={cards} locale={locale} />
            </>
          )}

          <MdBlockQuote style={{ margin: "3rem 0 1.5rem", padding: "1.25rem 1.5rem" }}>
            <p style={{ margin: 0, fontSize: "1.1rem", lineHeight: 1.6 }}>{t("donald_text")}</p>
            <footer style={{ marginTop: "0.75rem", fontSize: "0.9rem" }}>— Donald E. Knuth</footer>
          </MdBlockQuote>
          <MdParagraph>{t("advanced_text")}</MdParagraph>

          <TableOfContentsAside items={tocItems} label={t("articles_title")} />
        </MainPageBg>
      </PageContainer>
    </Layout>
  );
};

export default Latex;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LatexPage" });
  const meta = await getTranslations({ locale, namespace: "Metadata" });

  const title = `${t("meta_title")} | Eric Lucero González`;
  const description = t("meta_description");
  const url = `${URL_BASE}/${locale}/latex`;

  return {
    title,
    description,
    alternates: alternatesFor(locale, "/latex"),
    openGraph: {
      title,
      description,
      url,
      siteName: "Eric Lucero González",
      images: [{ url: meta("thumbnailImage"), width: 1200, height: 630, alt: title }],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [meta("thumbnailImage")],
    },
  };
}
