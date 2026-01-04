"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import styled from "styled-components";

export const LogosContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: row wrap;

  justify-content: space-around;
`;

export const LogosBox = styled(motion.div)`
  display: flex;
  flex-direction: row;
  margin: 1rem auto;
  flex-wrap: wrap;
  font-size: small;
  color: var(--accent);
  background-color: var(--quote-bg);

  @media (max-width: 390px) {
    width: 45%;
  }

  @media (600px <= width < 1080px) {
    width: 49%;
  }
  @media (min-width: 1080px) {
    width: 32%;
  }
`;

export const LogosText = styled.div`
  width: 99%;
  padding: 3px 8px;
  /* border: 1px solid red; */
`;

export const LogosTitle = styled.h3`
  font-size: larger;
`;
export const LogosHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 1px 5%;
`;

export const ReactIcon = styled(Link)`
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
