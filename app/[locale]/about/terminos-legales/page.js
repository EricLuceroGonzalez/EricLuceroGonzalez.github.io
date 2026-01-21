import { MainBg } from "@/app/ui/ComponentsStyled";
import ShowPath from "@/app/components/showPath";
import { Article, Layout, MetaInfo } from "@/app/ui/lugs";
import {
  ContainerDiv,
  MdHead,
  MdListItem,
  MdParagraph,
  MdUnorderedList,
} from "@/app/ui/MarkDownComponents";
import { useTranslations } from "next-intl";
import H2Header from "@/app/components/MdCompos/H2Header";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  FaCreativeCommons,
  FaCreativeCommonsBy,
  FaCreativeCommonsNc,
  FaCreativeCommonsNcEu,
  FaCreativeCommonsSa,
} from "react-icons/fa";

const LegalPage = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Legal" });

  function parseText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  }

  return (
    <Layout>
      <MainBg>
        <ShowPath title={"terminos-legales"} />
        <Article>
          <MdHead>{t("title")}</MdHead>
          <MetaInfo>{t("lastUpdated")}</MetaInfo>
          <MdParagraph>{t("sections.intro")}</MdParagraph>
          <H2Header>{t("sections.owner.title")}</H2Header>
          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.owner.content")),
            }}
          />
          <H2Header>{t("sections.data.title")}</H2Header>
          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.data.content")),
            }}
          />

          <H2Header>{t("sections.copyright.title")}</H2Header>
          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.copyright.intro")),
            }}
          />
          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.copyright.content_license")),
            }}
          />
          <MdUnorderedList>
            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(
                  t("sections.copyright.content_license_list.share"),
                ),
              }}
            />
            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(
                  t("sections.copyright.content_license_list.adapt"),
                ),
              }}
            />
            <MdParagraph
              dangerouslySetInnerHTML={{
                __html: parseText(
                  t("sections.copyright.content_license_list.text_slice"),
                ),
              }}
            />

            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(
                  t("sections.copyright.content_license_list.Attribution"),
                ),
              }}
            />
            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(
                  t("sections.copyright.content_license_list.NonCommercial"),
                ),
              }}
            />
            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(
                  t("sections.copyright.content_license_list.ShareAlike"),
                ),
              }}
            />
          </MdUnorderedList>

          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.copyright.code_license")),
            }}
          />

          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.copyright.third_party")),
            }}
          />
          <H2Header>{t("sections.disclaimer.title")}</H2Header>
          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.disclaimer.content")),
            }}
          />
          {/* <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("title")),
            }}
          /> */}
          <H2Header>{t("sections.hosting.title")}</H2Header>
          <MdParagraph>{t("sections.hosting.content")}</MdParagraph>
          <MdUnorderedList>
            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(t("sections.hosting.vercel")),
              }}
            />
            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(t("sections.hosting.github")),
              }}
            />
            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(t("sections.hosting.cloudinary")),
              }}
            />
            <MdListItem
              dangerouslySetInnerHTML={{
                __html: parseText(t("sections.hosting.base_legal")),
              }}
            />
          </MdUnorderedList>
          <H2Header>{t("sections.cookies.title")}</H2Header>
          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.cookies.content")),
            }}
          />
          <MdUnorderedList>
            <MdListItem>{t("sections.cookies.list.0")}</MdListItem>
            <MdListItem>{t("sections.cookies.list.1")}</MdListItem>
          </MdUnorderedList>

          <H2Header>{t("sections.license.title")}</H2Header>
          <MdParagraph
            dangerouslySetInnerHTML={{
              __html: parseText(t("sections.license.content")),
            }}
          />
          <ContainerDiv>
            <FaCreativeCommons />
            <FaCreativeCommonsBy />
            <FaCreativeCommonsNc />
            <FaCreativeCommonsNcEu />
            <FaCreativeCommonsSa />
          </ContainerDiv>
        </Article>
      </MainBg>
    </Layout>
  );
};

export default LegalPage;

export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Obtenemos las traducciones del servidor para la sección "Metadata"
  const t = await getTranslations({ locale, namespace: "Legal" });
  const URLbase = "https://ericlucero.dev";

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t("metadata.keywords"),
    // Configuración vital para SEO Multilingüe
    alternates: {
      canonical: `${URLbase}/${locale}`,
      languages: {
        es: `${URLbase}/es`,
        en: `${URLbase}/en`,
      },
    },
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `${URLbase}/${locale}`, // URL canónica para compartir
      siteName: "Eric Lucero González",
      images: [
        {
          url: t("metadata.thumbnailImage"),
          width: 1200,
          height: 630,
          alt: t("metadata.description"), // Texto alternativo traducido
        },
      ],
      locale: locale,
      type: "website",
      logo: t("metadata.logo"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.title"),
      description: t("metadata.description"),
      image: t("metadata.thumbnailImage"),
    },
  };
}
