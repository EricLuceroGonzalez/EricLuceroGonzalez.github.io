"use client";
import { motion } from "framer-motion";
import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--bg);
  min-height: 99vh;
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
`;
export const MainPageBg = styled(motion.div)`
  /* border: 2px solid blue; */
  flex: 1;
  background-color: var(--bg);
  min-height: 100vh;
  max-width: 100%;
  text-align: justify;
  margin: 0 auto;
  z-index: 10;

  @media (0px <= width < 401px) {
    width: 99%;
    padding: 0.25rem;
  }
  @media (min-width: 390px) {
    width: 95%;
  }

  @media (600px <= width < 780px) {
    min-width: 80%;
    padding: 5px;
    box-shadow: none;
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
  padding: 0.5rem 0;
  background-color: var(--bg);
`;
export const HomePageCoverText = styled.div`
  width: 100%;
  padding: 0.6rem 0;
  z-index: 10;
`;
export const HomePageCoverImage = styled.div`
  border-left: 1px solid var(--strong-fg);
  width: 50%;
`;

export const Section = styled.section`
  color: blue;
`;

export const NotFoundText = styled.p`
  padding: 0.5rem 0;
  text-align: justify;
`;

export const LatexSection = styled.section`
  margin: 10px auto;
`;
