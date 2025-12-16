import { MainBg } from "@/app/ui/ComponentsStyled";
import { RiNextjsFill } from "react-icons/ri";
import { RiReactjsLine } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiChartdotjs,
  SiI18Next,
  SiLatex,
  SiMdx,
  SiRemark,
  SiStyledcomponents,
  SiVercel,
} from "react-icons/si";
// import styled from "styled-components";
// import Link from "next/link";
import ShowPath from "@/app/components/showPath";
import { Article, Layout } from "@/app/ui/lugs";
import { MdHead } from "@/app/ui/MarkDownComponents";
import { useTranslations } from "next-intl";
import { FaFontAwesome, FaGithub } from "react-icons/fa";
import H2Header from "@/app/components/MdCompos/H2Header";
import {
  LogosBox,
  LogosContainer,
  LogosHead,
  LogosText,
  LogosTitle,
  ReactIcon,
} from "@/app/components/about/AboutStyled";
import { getTranslations } from "next-intl/server";

const AboutThisPage = () => {
  const t = useTranslations("About");

  return (
    <Layout>
      <MainBg>
        <Article>
          <ShowPath title={"this-page"} />
          <MdHead>{t("page_content_title")}</MdHead>
          <p>{t("page_content")}</p>
          <H2Header>{t("stack_title")}</H2Header>
          <LogosContainer>
            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://nextjs.org"}>
                  <RiNextjsFill />
                </ReactIcon>
                <LogosTitle>Next JS</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_Next")}</LogosText>
            </LogosBox>
            <LogosBox>
              <LogosHead>
                <ReactIcon
                  href={"https://simple.wikipedia.org/wiki/JavaScript"}
                >
                  <IoLogoJavascript />
                </ReactIcon>
                <LogosTitle>Javascript (ES6+)</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_javascript")}</LogosText>
            </LogosBox>
            <LogosBox>
              <LogosHead>
                <ReactIcon
                  href={"https://en.wikipedia.org/wiki/React_(software)"}
                >
                  <RiReactjsLine />
                </ReactIcon>
                <LogosTitle>React framework</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_React")}</LogosText>
            </LogosBox>
            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://www.i18next.com"}>
                  <SiI18Next />
                </ReactIcon>
                <LogosTitle>i18n</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_i18n")}</LogosText>
            </LogosBox>

            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://styled-components.com"}>
                  <SiStyledcomponents />
                </ReactIcon>
                <LogosTitle>Styled-components</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_styled")}</LogosText>
            </LogosBox>

            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://github.com/remarkjs/remark"}>
                  <SiRemark />
                </ReactIcon>
                <LogosTitle>Remark-js</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_remark")}</LogosText>
            </LogosBox>
            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://fontawesome.com"}>
                  <FaFontAwesome />
                </ReactIcon>
                <LogosTitle>Font Awesome</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_fontawesome")}</LogosText>
            </LogosBox>
            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://mdxjs.com"}>
                  <SiMdx />
                </ReactIcon>
                <LogosTitle>MDX JS</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_MDX")}</LogosText>
            </LogosBox>
            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://www.latex-project.org"}>
                  <SiLatex />
                </ReactIcon>
                <LogosTitle>LaTeX (vía KaTeX/MathJax)</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_latex")}</LogosText>
            </LogosBox>

            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://www.github.com"}>
                  <FaGithub />
                </ReactIcon>
                <LogosTitle>Github</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_github")}</LogosText>
            </LogosBox>

            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://vercel.com/"}>
                  <SiVercel />
                </ReactIcon>
                <LogosTitle>Vercel</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_vercel")}</LogosText>
            </LogosBox>

            <LogosBox>
              <LogosHead>
                <ReactIcon href={"https://www.chartjs.org/docs/latest/"}>
                  <SiChartdotjs />
                </ReactIcon>
                <LogosTitle>Chart.js</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_chartjs")}</LogosText>
            </LogosBox>
          </LogosContainer>
        </Article>
      </MainBg>
    </Layout>
  );
};

export default AboutThisPage;
export async function generateMetadata({ params }) {
  const { locale } = await params;

  // Obtenemos las traducciones del servidor para la sección "Metadata"
  const t = await getTranslations({ locale, namespace: "About" });
  const URLbase = "https://eric-lucero-gonzalez.vercel.app";

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
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: `${URLbase}/${locale}`, // URL canónica para compartir
      siteName: "Eric Lucero González",
      images: [
        {
          url: t("thumbnailImage"),
          width: 1200,
          height: 630,
          alt: t("metadata.description"), // Texto alternativo traducido
        },
      ],
      locale: locale,
      type: "website",
      logo: t("metaLogo"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      image: t("thumbnailImage"),
    },
  };
}
