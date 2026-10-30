import { Suspense } from "react";
import BlogTopicFilter from "@/app/components/BlogTopicFilter";
import { MainPageBg, PageContainer } from "../../ui/ComponentsStyled";
import { TitlePage } from "../../ui/TitlesComponents";
import { getPostsByType } from "../../lib/api";
import { notFound } from "next/navigation";
import HomeBoxes from "../../components/HomeBoxes";
import { Layout } from "../../ui/BasicDivs";
import {
  MdParagraph,
  MdListItem,
  MdUnorderedList,
} from "../../ui/MarkDownComponents";
import ShowPath from "../../components/showPath";
import ScrollDiv from "../../components/navigation/ScrollDiv";
import { getTranslations, setRequestLocale } from "next-intl/server";
import BackgroundDots from "@/app/components/BgMovingDots";
import ViewportSize from "@/app/components/viewPortViewer";
import TableOfContentsAside from "../../components/ToCAside";
import { alternatesFor, pageUrl, SITE_NAME } from "@/app/lib/seo";

const toCard = ({ content, ...post }) => post;
const BlogPage = async ({ params }) => {
  // 1. Obtener idioma
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const home = await getTranslations({ locale, namespace: "HomePage" });
  // const blogPosts = getBlogPosts();
  const blogPosts = getPostsByType(["blog"], 1, locale);
  if (!blogPosts.posts) {
    return notFound();
  }
  const posts = blogPosts.posts.map(toCard);
  const topics = home.raw("topics");

  const tocItems = blogPosts.posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    href: `/blog/${post.slug}`,
  }));
  return (
    <Layout>
      <PageContainer>
        {/* <ViewportSize /> */}
        <ScrollDiv />
        <BackgroundDots numDots={90} />
        <ShowPath />
        <MainPageBg
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.35,
            delay: 0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <TitlePage>{t("title")}</TitlePage>
          <MdParagraph style={{ opacity: 0.75 }}>
            {t("copy_text.p1")}
          </MdParagraph>
          <Suspense fallback={<HomeBoxes props={posts} locale={locale} />}>
            <BlogTopicFilter
              posts={posts}
              topics={topics}
              locale={locale}
              labels={{
                filterLabel: t("filter_label"),
                all: t("filter_all"),
                showing: t.raw("filter_showing"),
                empty: t("filter_empty"),
              }}
            />
          </Suspense>
        </MainPageBg>
        <TableOfContentsAside items={tocItems} label="Posts" />
      </PageContainer>
    </Layout>
  );
};

export default BlogPage;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const meta = await getTranslations({ locale, namespace: "Metadata" });

  const title = `${t("title")} | ${SITE_NAME}`;
  const description = t("copy_text.p1");

  return {
    title,
    description,
    keywords: meta("keywords"),
    alternates: alternatesFor(locale, "/blog"),
    openGraph: {
      title,
      description,
      url: pageUrl(locale, "/blog"),
      siteName: SITE_NAME,
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
