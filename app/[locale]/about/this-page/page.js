import { MainBg } from "@/app/ui/ComponentsStyled";
import { RiEmotionUnhappyFill, RiNextjsFill } from "react-icons/ri";
import { RiReactjsLine } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiChartdotjs,
  SiI18Next,
  SiLatex,
  SiMdx,
  SiMermaid,
  SiRemark,
  SiStyledcomponents,
  SiVercel,
  SiYaml,
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
import ScrollDiv from "@/app/components/navigation/ScrollDiv";

// Configuración para el contenedor padre
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // delay automático entre hijos
      delayChildren: 0.1, // delay inicial
    },
  },
};

// Configuración para cada ítem (LogosBox)
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 50, // Empieza un poco más abajo
    scale: 0.2, // Empieza un poco más pequeño
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring", // Mantenemos tu efecto rebote
      stiffness: 100,
      damping: 10,
      visualDuration: 0.3,
      bounce: 0.5,
    },
  },
};
const AboutThisPage = () => {
  const t = useTranslations("About");

  return (
    <Layout>
      <MainBg>
        <ScrollDiv />
        <Article>
          <ShowPath title={"this-page"} />
          <MdHead>{t("page_content_title")}</MdHead>
          <p>{t("page_content")}</p>
          <H2Header>{t("stack_title")}</H2Header>
          <LogosContainer
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }} // Para que no se repita al hacer scroll arriba/abajo
          >
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://nextjs.org"}>
                  <RiNextjsFill />
                </ReactIcon>
                <LogosTitle>Next JS</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_Next")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
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
            <LogosBox variants={itemVariants}>
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

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://www.github.com"}>
                  <FaGithub />
                </ReactIcon>
                <LogosTitle>Github</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_github")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://vercel.com/"}>
                  <SiVercel />
                </ReactIcon>
                <LogosTitle>Vercel</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_vercel")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://www.i18next.com"}>
                  <SiI18Next />
                </ReactIcon>
                <LogosTitle>i18n</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_i18n")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://styled-components.com"}>
                  <SiStyledcomponents />
                </ReactIcon>
                <LogosTitle>Styled-components</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_styled")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://remark.js.org"}>
                  <SiRemark />
                </ReactIcon>
                <LogosTitle>Remark-js</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_remark")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon
                  href={"https://unifiedjs.com/explore/package/rehype-raw/"}
                >
                  <SiRemark />
                </ReactIcon>
                <LogosTitle>rehype</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_rehype")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon
                  href={"https://github.com/jonschlinkert/gray-matter"}
                >
                  <SiMdx />
                </ReactIcon>
                <LogosTitle>gray-matter</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_graymatter")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://mdxjs.com"}>
                  <SiMdx />
                </ReactIcon>
                <LogosTitle>MDX JS</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_MDX")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://www.latex-project.org"}>
                  <SiLatex />
                </ReactIcon>
                <LogosTitle>LaTeX (vía KaTeX/MathJax)</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_latex")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://motion.dev"}>
                  <RiEmotionUnhappyFill />
                </ReactIcon>
                <LogosTitle>motion</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_motion")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://mermaid.js.org"}>
                  <SiMermaid />
                </ReactIcon>
                <LogosTitle>Mermaid JS</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_mermaid")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://fontawesome.com"}>
                  <FaFontAwesome />
                </ReactIcon>
                <LogosTitle>Font Awesome</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_fontawesome")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
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
