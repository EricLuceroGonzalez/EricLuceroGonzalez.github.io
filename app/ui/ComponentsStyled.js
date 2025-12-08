"use client";
import styled from "styled-components";

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
`;
export const MainPageBg = styled.div`
  flex: 1;
  padding: 0 1.5rem;
  background-color: var(--bg);
  min-height: 100vh;
  max-width: 100%;
  text-align: justify;
  padding: 1rem 1rem;
  @media (min-width: 660px) {
    font-size: large;
    max-width: 70%;
    margin: 0 auto;
    /* border: 1px solid orange; */
  }
  @media (min-width: 1300px) {
    font-size: large;
    width: 50%;
    margin: 0 auto;
    /* border: 1px solid var(--accent); */
  }
`;

export const HomePageCover = styled.div`
  height: 15vh;
  display: flex;
  flex-direction: row;
  @media (max-width: 660px) {
    height: 65vh;
  }
`;
export const HomePageCoverText = styled.div`
  /* border: 1px dashed var(--accent); */
  width: 50%;
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
    /* padding: 1rem 1rem; */
  }
`;
export const TitlePage = styled.h1`
  color: var(--fg);
  @media (max-width: 728px) {
    text-align: justify;
    /* padding: 1rem 1rem; */
  }
  font-size: x-large;
  @media (min-width: 660px) {
    font-size: xx-large;
  }
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
