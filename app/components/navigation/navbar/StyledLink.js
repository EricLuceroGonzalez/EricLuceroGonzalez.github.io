// StyledLink.js
// import Link from "next/link";
import { Link } from "@/i18n/navigation";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Define the styled component for the anchor tag
const StyledAnchor = styled.div`
  color: var(--fg);
  text-decoration: none;
  transition: background-color 0.3s ease;
  padding: 8px 6px;
  margin: 2px 2px;
  font-size: large;
  font-weight: bold;

  font-size: medium;
  @media (min-width: 660px) {
    /* border: 1px solid red; */
    font-size: large;
  }
  &:hover {
    background-color: var(--fg);
    color: var(--bg);
  }
  background-color: ${(props) =>
    props.$activePath ? "var(--accent)" : "var(--bg)"};
  border-radius: 8px;
  /* border-bottom: 2px solid
    ${(props) => (props.$activePath ? "var(--accent)" : "var(--bg)")}; */
`;

const StyledLink = ({ actualPath, pathName, href, children }) => {
  const currentPath = usePathname();
  const thePath = currentPath.split("/");

  return (
    <Link href={href} passHref>
      <StyledAnchor $activePath={actualPath === pathName ? true : false}>
        {children}
      </StyledAnchor>
    </Link>
  );
};

export default StyledLink;
