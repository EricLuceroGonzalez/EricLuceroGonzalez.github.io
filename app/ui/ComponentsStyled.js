"use client";
import { motion } from "framer-motion";
import styled from "styled-components";
import Link from "next/link";
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
    /* text-align: justify; */
    padding: 1rem 5px;
  }
`;
export const MainPageBg = styled(motion.div)`
  /* border: 2px solid blue; */
  flex: 1;
  background-color: var(--bg);
  min-height: 100vh;
  max-width: 100%;
  /* text-align: justify; */
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
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  color: var(--fg);
  padding: 1.5rem 0 2rem;
  background-color: var(--bg);
`;

export const HomePageCoverText = styled.div`
  width: 100%;
  padding: 0.6rem 0;
  position: relative;
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

export const HeroTagline = styled.p`
  font-size: var(--text-small);
  color: var(--quote-fg);
  margin: 0.25rem 0 1.25rem;
  font-family: monospace;
`;

export const HeroCTARow = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

export const HeroCTAPrimary = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  background: var(--accent-ink);
  color: var(--bg);
  font-weight: 700;
  font-size: var(--text-small);
  transition: opacity 0.15s, transform 0.15s;

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

export const HeroCTASecondary = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.4rem;
  border-radius: 8px;
  background: transparent;
  color: var(--accent-ink);
  font-weight: 700;
  font-size: var(--text-small);
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    background-color: var(--accent-ink);
    color: var(--bg);
  }
`;
export const HeroBadge = styled.span`
  align-self: flex-start;
  padding: 6px 12px;
  border-radius: 999px;
  background: var(--primary-transparent);
  color: var(--accent-ink);
  font-weight: 600;
  font-size: var(--text-small);
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

export const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.1rem, 1.4rem + 3vw, 3.5rem);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--heading);
  max-width: 18ch;
  text-wrap: balance;
`;

export const HeroSubtitle = styled.p`
  margin: 0;
  font-size: clamp(1.05rem, 1rem + 0.4vw, 1.2rem);
  line-height: 1.55;
  color: var(--subheading);
  max-width: 38rem;
`;

export const HeroRole = styled.p`
  margin: 0;
  font-size: var(--text-small);
  color: var(--muted);
`;

export const HeroStack = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 4rem 0 3.5rem;
`;

export const HeroTextLink = styled(Link)`   // Link de "@/i18n/navigation"
  padding: 0.7rem 0.5rem;
  font-weight: 600;
  font-size: var(--text-small);
  color: var(--subheading);
  &:hover { color: var(--accent-ink); }
`;