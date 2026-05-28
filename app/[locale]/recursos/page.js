import { MainPageBg, PageContainer } from "../../ui/ComponentsStyled";
import { TitlePage, SubSubTitle } from "../../ui/TitlesComponents";
import { Layout } from "../../ui/BasicDivs";
import LatexResourcesSection from "../../components/LatexResourcesSection";
import ShowPath from "../../components/showPath";
import ScrollDiv from "../../components/navigation/ScrollDiv";
import BackgroundDots from "@/app/components/BgMovingDots";
import { getTranslations, setRequestLocale } from "next-intl/server";

const ResourcesPage = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Resources" });

  return (
    <Layout>
      <PageContainer>
        <ScrollDiv />
        <BackgroundDots numDots={70} />
        <ShowPath />
        <MainPageBg
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.25,
            delay: 0.0,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <TitlePage>{t("title")}</TitlePage>
           <SubSubTitle style={{ opacity: 0.75, marginBottom: "1.5rem" }}>
            {t("subtitle")}
          </SubSubTitle>
          <LatexResourcesSection />
        </MainPageBg>
      </PageContainer>
    </Layout>
  );
};

export default ResourcesPage;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Resources" });
  const meta = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucero.dev";

  return {
    title: `${t("title")} | Eric Lucero González`,
    description: t("subtitle"),
    alternates: {
      canonical: `${URLbase}/${locale}/recursos`,
      languages: {
        es: `${URLbase}/es/recursos`,
        en: `${URLbase}/en/recursos`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: `${URLbase}/${locale}/recursos`,
      siteName: "Eric Lucero González",
      images: [{ url: meta("thumbnailImage"), width: 1200, height: 630 }],
      locale,
      type: "website",
    },
  };
}
