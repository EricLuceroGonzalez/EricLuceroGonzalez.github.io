"use client";
import styled from "styled-components";

export const MdParagraph = styled.div`
  margin: 0.5em 0;
  font-size: medium;
  @media (min-width: 660px) {
    font-size: large;
  }
  /* border: 1px solid red; */
`;

export const MdListItem = styled.li`
  color: var(--fg);
  /* font-size: 0; */
  /* list-style-type: circle; */
  font-size: medium;
  text-align: justify;
  @media (min-width: 660px) {
    font-size: large;
  }
`;
export const MdUnorderedList = styled.ul`
  list-style-position: inside;
  margin: auto;
  width: 95%;
`;

export const MdOrderedList = styled.ol`
  /* list-style-position: inside; */
  /* margin: auto; */
  margin-left: 1rem;
`;

export const MdBlockQuote = styled.blockquote`
  background-color: var(--quote-bg);
  color: var(--quote-fg);
  padding: 2px 8px;
  margin: 3px auto;
  border-radius: 12px;
  min-width: 85%;
`;

export const MdHead = styled.h1`
  /* color: var(--fg); */
  text-align: left;
  font-size: xx-large;
  @media (min-width: 660px) {
    font-size: 2rem;
  }
  line-height: 0.9;
  margin: 1em 0;
`;
export const MdSubHeadA = styled.h2`
  margin-top: 2rem;
  color: var(--accent);
  font-size: x-large;
`;
export const MdSubHeadB = styled.h3`
  color: var(--emphasis-fg);
  margin-top: 2rem;
  font-size: larger;
`;
export const MdSubHeadC = styled.h4`
  color: var(--heading);
  margin: 15px 0;
  font-size: medium;
`;

export const MdLink = styled.a`
  background-color: var(--link-bg);
  color: var(--link-fg);
  font-weight: bold;
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
  padding: 2px 2px;
  border-radius: 6px;
`;
export const MdEmph = styled.em`
  color: var(--emphasis-fg);
  background-color: var(--emphasis-bg);
  /* var(--emphasis-bg); */
  /* padding: 0 1px; */
  /* font-style: normal; */
  font-weight: 500;
`;

export const MdImage = styled.div`
  /* border: 2px solid blue; */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.71);
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem auto;
  width: 50%;
  height: auto;
  position: relative;
  @media (max-width: 660px) {
    width: 100%;
  }
`;
export const MdImageCaption = styled.p`
  color: var(--accent);
  margin: 5px 0;
  text-align: justify;
  max-width: 60%;
  @media (max-width: 660px) {
    max-width: 80%;
  }
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
  width: 80%;
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
  background-color: var(--bg);
  color: var(--strong-fg);
  padding: 2px 2px;
  border: 1px solid var(--gray-light);
`;
