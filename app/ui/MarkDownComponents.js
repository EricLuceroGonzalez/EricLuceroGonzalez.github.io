"use client";
import styled from "styled-components";

export const MdParagraph = styled.div`
  margin: 1.15rem 0;
  font-size: var(--text-base);
  background-color: var(--bg);
  text-align: left;
  z-index: 100;
`;

export const MdListItem = styled.li`
  font-size: var(--text-base);
`;
export const MdUnorderedList = styled.ul`
  list-style: none; /* Elimina los bullets predeterminados */
  list-style-position: inside;
  margin: 0px auto;
  padding: 2px 2px;

  li {
    position: relative;
    padding-left: 1.5em;
    list-style-type: none;
    &::before {
      content: "✅"; /*● */
      color: var(--accent);
      font-size: var(--text-base);
      position: absolute;
      left: 0;
    }
  }
`;

export const MdOrderedList = styled.ol`
  /* list-style-position: inside; */
  /* margin: auto; */
  margin-left: 1rem;
`;

export const MdBlockQuote = styled.blockquote`
  background-color: var(--quote-bg);
  color: var(--quote-fg);
  padding: 6px 12px;
  margin: 12px auto;
  border-radius: 12px;
  min-width: 85%;
`;

export const MdHead = styled.h1`
  text-align: left;
  line-height: 0.9;
  margin: 1em 0;
`;

export const MdSubHeadA = styled.h2`
  padding-top: 1rem;
  margin-top: 2rem;
  color: var(--accent);
  a {
    color: var(--bg);
  }
  &:hover {
    a {
      color: var(--accent);
      opacity: 0.7;
    }
  }
`;
export const MdSubHeadB = styled.h3`
  color: var(--heading-3);
  margin-top: 2rem;
  a {
    color: var(--bg);
  }
  &:hover {
    a {
      color: var(--accent);
      opacity: 0.7;
    }
  }
`;
export const MdSubHeadC = styled.h4`
  color: var(--heading);
  margin: 15px 0;
`;

export const MdHeadAnchor = styled.a`
  color: var(--bg);
  &:hover {
    color: var(--accent);
  }
`;
export const MdLink = styled.a`
  background-color: var(--link-bg);
  color: var(--link-fg);
  font-weight: 500;
  padding: 2px 5px;
  &:hover {
    color: var(--emphasis-fg);
  }
`;

export const MdStrong = styled.strong`
  /* background- */
  color: var(--strong-fg);
  background-color: var(--strong-bg);
  /* color: var(--bg); */
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 6px;
`;
export const MdEmph = styled.em`
  color: var(--emphasis-fg);
  background-color: var(--emphasis-bg);
  /* var(--emphasis-bg); */
  padding: 0 5px;
  border-radius: 5px;
  /* font-style: normal; */
  font-weight: 500;
`;

export const MdImage = styled.div`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.71);
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem auto;
  width: 98%;
  height: auto;
  position: relative;
  /* border: 2px solid blue; */
  @media (min-width: 860px) {
    width: 90%;
  }

  @media (min-width: 1080px) {
    width: 70%;
  }
  @media (min-width: 1680px) {
    width: 50%;
  }
  background-color: var(--fg);
`;
export const MdImageCaption = styled.p`
  color: var(--bg);
  padding: 12px 0;
  text-align: justify;
  max-width: 95%;
  font-size: var(--text-small);
`;
export const MdImageCaptionNumber = styled.span`
  color: var(--accent);
  font-weight: bold;
  /* margin: 5px 0;
  text-align: justify;
  max-width: 98%;
  @media (min-width: 860px) {
    max-width: 80%;
  } */
`;

export const MdCite = styled.sup`
  color: red;
`;

export const HeroImage = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem auto;
  width: 60%;
  height: auto;
  position: relative;
  @media (max-width: 660px) {
    width: 100%;
  }
`;

export const MdTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px auto;
  @media (max-width: 660px) {
    width: 95%;
  }
`;

export const MdTableHead = styled.th`
  background-color: var(--strong-fg);
  color: var(--bg);
  /* text-align: left; */
  padding: 5px 2px;
`;

export const MdTableD = styled.td`
  font-size: var(--text-small);
  color: var(--fg);
  padding: 2px 2px;
  border: 1px solid var(--gray-light);
`;

export const MdCode = styled.code`
  background-color: var(--code-bg);
  color: var(--code-fg);
  padding: 2px 6px;
  font-weight: 500;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace;
`;
export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-size: var(--text-h1);
  width: 50%;
  align-items: center;
  justify-content: space-around;
  margin: 10px auto;
  @media (0 <= width <= 660px) {
    width: 100%;
    flex-wrap: wrap;
  }

  @media (660px < width <= 960px) {
    width: 100%;
  }
`;

export const MermaidContainer = styled.div`
  width: 100%;
  margin: 1rem auto;
  /* background-color: var(--fg); */
`;
