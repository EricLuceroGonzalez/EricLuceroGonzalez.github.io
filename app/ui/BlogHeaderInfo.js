// BlogHeaderInfo.js;
"use client";
import styled from "styled-components";
import { TAG_STYLES } from "../lib/constants";

export const MetaInfo = styled.div`
  border-bottom: 1px solid var(--secondary-btn-hover);
  font-size: small;
  color: var(--accent);
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 75%;
  @media (0px <= width <=398px) {
    width: 99%;
    flex-direction: row;
    font-size: small;
  }
`;

export const Date = styled.div`
  font-size: small;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SideInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SectionType = styled.div`
  font-weight: bold;
  color: var(--bg);
  padding: 1px 6px;
  border-radius: 2px;
  display: inline-block;
  margin-left: 10px;
  font-size: xx-small;
  font-family: monospace;
  ${(props) => {
    // tag a minúsculas
    const tagKey = props.$tag ? props.$tag.toLowerCase() : "default";
    // Filtro de estilo
    const style = TAG_STYLES[tagKey] || TAG_STYLES.default;
    return `
      background-color: ${style.bg};
      color: ${style.text};
      border: 1px solid ${style.bg}; 
    `;
  }}

  @media (0px <= width <= 396px) {
    display: none;
  }
`;
