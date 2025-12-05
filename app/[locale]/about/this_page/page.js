"use client";
import { MainBg } from "@/app/ui/ComponentsStyled";
import { RiNextjsFill } from "react-icons/ri";
import { RiReactjsLine } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { SiMdx } from "react-icons/si";
import styled from "styled-components";
import ShowPath from "@/app/components/showPath";
import { Article, Layout } from "@/app/ui/lugs";
import { MdHead } from "@/app/ui/MarkDownComponents";
import Link from "next/link";
import { useTranslations } from "next-intl";

const LogosBox = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 90%;
  border: 1px dashed var(--fg);
  margin: 1rem auto;
  @media (min-width: 1080px) {
    width: 60%;

    border: 1px dashed var(--accent);
  }
  @media (max-width: 880px) {
    max-width: 80%;

    border: 1px dashed red;
  }
`;

const ReactIcon = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  margin: 5px;
  svg {
    color: var(--fg);
  }
  svg:hover {
    color: var(--accent);
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
          <LogosBox>
            <ReactIcon href={"https://nextjs.org"}>
              <RiNextjsFill />
            </ReactIcon>
            <div>Some text explaining why and what NExt JS</div>
          </LogosBox>
          <LogosBox>
            <ReactIcon href={"https://simple.wikipedia.org/wiki/JavaScript"}>
              <IoLogoJavascript />
            </ReactIcon>
            <div>Some text explaining why and what NExt JS</div>
          </LogosBox>
          <LogosBox>
            <ReactIcon href={"https://en.wikipedia.org/wiki/React_(software)"}>
              <RiReactjsLine />
            </ReactIcon>
            <div>Some text explaining why and what NExt JS</div>
          </LogosBox>
          <LogosBox>
            <ReactIcon href={"https://mdxjs.com"}>
              <SiMdx />
            </ReactIcon>
            <div>Some text explaining why and what NExt JS</div>
          </LogosBox>
        </Article>
      </MainBg>
    </Layout>
  );
};

export default AboutThisPage;
