// StyledLink.js
// import Link from "next/link";
import { Link } from "@/i18n/navigation";
import styled from "styled-components";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Define the styled component for the anchor tag
const StyledAnchor = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration: none;
  color: var(--fg);
  transition: background-color 0.3s ease;
  padding: 8px 6px;
  margin: 2px 2px;
  font-weight: bold;
  /* border: 1px solid red; */

  font-size: medium;
  @media (min-width: 660px) {
    font-size: large;
    margin: 2px 12px;
  }
  &:hover {
    background-color: var(--fg);
    color: var(--bg);
    cursor: pointer;
  }
  background-color: ${(props) =>
    props.$activePath ? "var(--accent)" : "var(--bg)"};
  border-radius: 8px;
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
