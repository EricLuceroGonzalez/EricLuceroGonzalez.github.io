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
import ViewportSize from "@/app/components/viewPortViewer";

const BlogPage = async ({ params }) => {
  // 1. Obtener idioma
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  // const blogPosts = getBlogPosts();
  const blogPosts = getPostsByType(["blog"], 0, locale);
  if (!blogPosts.posts) {
    return notFound();
  }
  return (
    <Layout>
      <PageContainer>
        <ViewportSize />
        <ScrollDiv />
        <BackgroundDots numDots={90} />
        <MainPageBg
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.2,
            delay: 0.0,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <ShowPath />
          <TitlePage>{t("title")}</TitlePage>
          <MdParagraph>{t("copy_text.p1")}</MdParagraph>

          <MdParagraph>{t("copy_text.p2")}</MdParagraph>
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
  const metadata = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://eric-lucero-gonzalez.vercel.app";

  return {
    title: metadata("defaultTitle"),
    description: metadata("description"),
    keywords: metadata("keywords"),
    // Configuración vital para SEO Multilingüe
    alternates: {
      canonical: `${URLbase}/${locale}`,
      languages: {
        es: `${URLbase}/es`,
        en: `${URLbase}/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: metadata("defaultTitle"),
      description: metadata("description"),
      url: `${URLbase}/${locale}`, // URL canónica para compartir
      siteName: "Eric Lucero González",
      images: [
        {
          url: metadata("thumbnailImage"),
          width: 1200,
          height: 630,
          alt: metadata("defaultTitle"), // Texto alternativo traducido
        },
      ],
      locale: locale,
      type: "website",
      logo: metadata("metaLogo"),
    },
    twitter: {
      card: "summary_large_image",
      title: metadata("defaultTitle"),
      description: metadata("description"),
      image: metadata("thumbnailImage"),
    },
  };
}
