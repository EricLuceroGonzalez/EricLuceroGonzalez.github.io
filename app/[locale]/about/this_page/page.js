"use client";
import { MainBg } from "@/app/ui/ComponentsStyled";
import { RiNextjsFill } from "react-icons/ri";
import { RiReactjsLine } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import {
  SiI18Next,
  SiLatex,
  SiMdx,
  SiRemark,
  SiStyledcomponents,
} from "react-icons/si";
import styled from "styled-components";
import ShowPath from "@/app/components/showPath";
import { Article, Layout } from "@/app/ui/lugs";
import { MdHead } from "@/app/ui/MarkDownComponents";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaFontAwesome } from "react-icons/fa";
import H2Header from "@/app/components/MdCompos/H2Header";
import H3Header from "@/app/components/MdCompos/H3Header";

const LogosContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;

  justify-content: space-around;
  /* @media (min-width: 2080px) {
    flex-direction: column;
  } */
`;

const LogosBox = styled.div`
  display: flex;
  flex-direction: row;
  /* max-width: 90%; */
  margin: 1rem auto;
  flex-wrap: wrap;
  /* @media (min-width: 1080px) {
    width: 60%;
    border: 1px dashed var(--accent);
    }
    @media (max-width: 880px) {
      max-width: 80%;
      border: 1px dashed red;
      } */

  font-size: small;
  color: var(--accent);
  background-color: var(--quote-bg);
  width: 32%;
  @media (max-width: 729px) {
    width: 45%;
  }
  @media (min-width: 730px) {
    width: 43%;
  }
  @media (min-width: 900px) {
    width: 32%;
  }
`;

const LogosText = styled.div`
  width: 99%;
  padding: 3px 8px;
  /* border: 1px solid red; */
`;

const LogosTitle = styled.h3`
  font-size: larger;
`;
const LogosHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 1px 5%;
`;

const ReactIcon = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  margin: 5px;
  svg {
    color: var(--accent);
  }
  svg:hover {
    color: var(--fg);
  }
`;

const AboutThisPage = () => {
  const t = useTranslations("About");

  return (
    <Layout>
      <MainBg>
        <Article>
          <ShowPath title={"this page"} />
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
          </LogosContainer>
        </Article>
      </MainBg>
    </Layout>
  );
};

export default AboutThisPage;
