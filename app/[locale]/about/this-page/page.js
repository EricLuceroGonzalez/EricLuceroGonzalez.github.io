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
import { Article, Layout } from "@/app/ui/BasicDivs";
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
import { getTranslations, setRequestLocale } from "next-intl/server";
import ScrollDiv from "@/app/components/navigation/ScrollDiv";
import { alternatesFor, pageUrl } from "@/app/lib/seo";

// Configuración para el contenedor padre
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // delay automático entre hijos
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
      visualDuration: 0.2,
      bounce: 0.3,
    },
  },
};
const AboutThisPage = async ({ params }) => {
  // const t = useTranslations("About");
  const { locale } = await params;
  setRequestLocale(locale);

  // const t = useTranslations("About");
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <Layout>
      <MainBg>
        <ScrollDiv />
        <ShowPath title={"this-page"} />
        <Article>
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
                <ReactIcon href={"https://nextjs.org"} aria-label="Next JS" target="_blank" rel="noopener noreferrer">
                  <RiNextjsFill aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>Next JS</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_Next")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon
                  href={"https://simple.wikipedia.org/wiki/JavaScript"}
                  aria-label="Javascript (ES6+)"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoJavascript aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>Javascript (ES6+)</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_javascript")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon
                  href={"https://en.wikipedia.org/wiki/React_(software)"}
                  aria-label="React framework"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <RiReactjsLine aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>React framework</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_React")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://www.github.com"} aria-label="Github" target="_blank" rel="noopener noreferrer">
                  <FaGithub aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>Github</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_github")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://vercel.com/"} aria-label="Vercel" target="_blank" rel="noopener noreferrer">
                  <SiVercel aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>Vercel</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_vercel")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://www.i18next.com"} aria-label="i18n" target="_blank" rel="noopener noreferrer">
                  <SiI18Next aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>i18n</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_i18n")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://styled-components.com"} aria-label="Styled-components" target="_blank" rel="noopener noreferrer">
                  <SiStyledcomponents aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>Styled-components</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_styled")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://remark.js.org"} aria-label="Remark-js" target="_blank" rel="noopener noreferrer">
                  <SiRemark aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>Remark-js</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_remark")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon
                  href={"https://unifiedjs.com/explore/package/rehype-raw/"}
                  aria-label="rehype"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiRemark aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>rehype</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_rehype")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon
                  href={"https://github.com/jonschlinkert/gray-matter"}
                  aria-label="gray-matter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiMdx aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>gray-matter</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_graymatter")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://mdxjs.com"} aria-label="MDX JS" target="_blank" rel="noopener noreferrer">
                  <SiMdx aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>MDX JS</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_MDX")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://www.latex-project.org"} aria-label="LaTeX (vía KaTeX/MathJax)" target="_blank" rel="noopener noreferrer">
                  <SiLatex aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>LaTeX (vía KaTeX/MathJax)</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_latex")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://motion.dev"} aria-label="motion" target="_blank" rel="noopener noreferrer">
                  <RiEmotionUnhappyFill aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>motion</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_motion")}</LogosText>
            </LogosBox>
            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://mermaid.js.org"} aria-label="Mermaid JS" target="_blank" rel="noopener noreferrer">
                  <SiMermaid aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>Mermaid JS</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_mermaid")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://fontawesome.com"} aria-label="Font Awesome" target="_blank" rel="noopener noreferrer">
                  <FaFontAwesome aria-hidden="true" focusable="false" />
                </ReactIcon>
                <LogosTitle>Font Awesome</LogosTitle>
              </LogosHead>
              <LogosText>{t("stack_fontawesome")}</LogosText>
            </LogosBox>

            <LogosBox variants={itemVariants}>
              <LogosHead>
                <ReactIcon href={"https://www.chartjs.org/docs/latest/"} aria-label="Chart.js" target="_blank" rel="noopener noreferrer">
                  <SiChartdotjs aria-hidden="true" focusable="false" />
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
  const URLbase = "https://ericlucero.dev";

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
    keywords: t("metadata.keywords"),
    // Configuración vital para SEO Multilingüe
    alternates: alternatesFor(locale, "/about/this-page"),
    robots: {
      index: false,
      follow: true,
    },
    openGraph: {
      title: t("metadata.title"),
      description: t("metadata.description"),
      url: pageUrl(locale, "/about/this-page"),
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
      images: [t("thumbnailImage")],
    },
  };
}
