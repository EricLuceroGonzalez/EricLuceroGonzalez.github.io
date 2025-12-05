"use client";
import styled from "styled-components";

const SuperInd = styled.sup`
  color: var(--link-fg);
  :hover {
    color: var(--accent);
  }
`;

export const CitationSup = ({ id }) => (
  <SuperInd>
    <a href={`#ref-${id}`} id={`cite-${id}`} style={{ textDecoration: "none" }}>
      [{id}]
    </a>
  </SuperInd>
);
