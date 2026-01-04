"use client";
import { motion } from "framer-motion";
import styled from "styled-components";
export const EmojiContainer = styled(motion.div)`
  font-size: larger;
  width: 50px;
  /* background-color: var(--fg); */
`;
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  min-height: 99vh;
  font-size: xx-small;
  @media (min-width: 1080px) {
    font-size: large;
  }
`;

export const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: var(--bg);
  min-height: 83vh;
`;

export const MainBg = styled.div`
  flex: 1;
  padding: 0 2.5rem;
  background-color: var(--bg);
  min-height: 100vh;
  @media (max-width: 728px) {
    text-align: justify;
    padding: 1rem 5px;
  }
  /* border: 2px solid red; */
`;
export const MainPageBg = styled(motion.div)`
  flex: 1;
  padding: 0 1.5rem;
  background-color: var(--bg);
  min-height: 100vh;
  max-width: 100%;
  text-align: justify;
  padding: 1rem 1rem;
  margin: 0 auto;

  @media (0px <= width < 390px) {
    width: 99%;
  }
  @media (min-width: 390px) {
    width: 95%;
  }

  @media (600px <= width < 780px) {
    min-width: 80%;
    padding: 5px;
    box-shadow: none;
    font-size: small;
  }
  @media (min-width: 1080px) {
    width: 65%;
  }
  @media (min-width: 1280px) {
    width: 65%;
  }
  @media (min-width: 1440px) {
    width: 60%;
  }
`;

export const HomePageCover = styled.div`
  /* height: 15vh; */
  display: flex;
  flex-direction: row;
  color: var(--fg);
  padding: 1rem 0;
`;
export const HomePageCoverText = styled.div`
  width: 100%;
  padding: 0.6rem 0;
  /* border: 1px dashed var(--accent); */
`;
export const HomePageCoverImage = styled.div`
  border-left: 1px solid var(--strong-fg);
  width: 50%;
`;

export const CoverTitle = styled.h1`
  color: var(--fg);
  font-size: 2rem;
  @media (max-width: 728px) {
    text-align: justify;
  }
  border: 1px dashed var(--accent);
`;
export const TitlePage = styled.h1`
  display: flex;
  flex-direction: row;
  font-size: x-large;

  @media (max-width: 728px) {
    text-align: justify;
  }

  @media (min-width: 660px) {
    font-size: xx-large;
  }
`;

export const SubTitlePage = styled.h2`
  color: var(--heading-3);
  font-size: x-large;

  @media (max-width: 728px) {
    text-align: justify;
    /* padding: 1rem 1rem; */
  }

  @media (min-width: 660px) {
    font-size: xx-large;
  }

  /* border: 2px dashed orange; */
  /* background-color: var(--emphasis-bg); */
  color: var(--fg);
  margin-top: 3rem;
  padding-left: 1rem;
`;

export const Section = styled.section`
  color: blue;
`;

export const NotFoundTitle = styled.h1`
  font-size: 6rem;
  padding: 2rem 0;
  /* font-family: var(--font-alexandria); */
  /* font-family: var(--font-parkisans); */
`;
export const NotFoundText = styled.p`
  padding: 0.5rem 0;
  text-align: justify;
`;

export const LatexSection = styled.section`
  margin: 10px auto;
`;
