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
  margin: 1rem auto;
`;
export const MdUnorderedList = styled.ul`
  /* list-style-position: inside;
  margin: auto;
  width: 95%;
  li {
    &::before {
      content: "0";
      color: red;
    }
  } */

  list-style: none; /* Elimina los bullets predeterminados */
  list-style-position: inside;
  margin: auto;
  width: 95%;
  padding: 0;

  li {
    position: relative;
    padding-left: 1.5em; /* Ajusta el espaciado para el nuevo bullet */

    &::before {
      content: "●"; /* Puedes cambiar esto a cualquier símbolo o emoji */
      color: var(--accent);
      font-size: 1em;
      position: absolute;
      left: 0;
      top: 0.1em; /* Ajusta para alinear con el texto */
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
  padding-top: 1rem;
  margin-top: 2rem;
  color: var(--accent);
  font-size: x-large;
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
  color: var(--quote-fg);
  margin-top: 2rem;
  font-size: larger;
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
  font-size: medium;
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
  padding: 0 3px;
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
  width: 95%;
  height: auto;
  position: relative;
  /* border: 2px solid blue; */
  @media (min-width: 860px) {
    width: 90%;
    /* border: 2px solid red; */
  }
  background-color: var(--fg);
`;
export const MdImageCaption = styled.p`
  color: var(--bg);
  margin: 5px 0;
  text-align: justify;
  max-width: 98%;
  font-size: smaller;
  @media (min-width: 860px) {
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

export const MdCode = styled.code`
  background-color: var(--code-bg);
  color: var(--code-fg);
  padding: 2px 4px;
  font-weight: bold;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace;
`;
