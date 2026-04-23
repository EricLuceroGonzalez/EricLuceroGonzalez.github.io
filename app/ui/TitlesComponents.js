"use client";
// import { motion } from "framer-motion";
import styled from "styled-components";

export const TitlePage = styled.h1`
  display: flex;
  flex-direction: row;
  @media (max-width: 728px) {
    text-align: justify;
  }
  padding: 1rem 0;
`;

export const SubTitle = styled.h2`
  color: var(--heading-3);

  @media (max-width: 728px) {
    text-align: justify;
  }
  color: var(--fg);
  margin-top: 2rem;
`;

export const SubSubTitle = styled.h3`
  color: var(--heading-3);
  /* color: var(--fg); */
  margin-top: 1rem;
  text-align: left;
`;

export const NotFoundTitle = styled.h1`
  padding: 2rem 0;
`;
