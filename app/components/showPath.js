"use client";

import Link from "next/link";
import styled from "styled-components";
const { usePathname } = require("next/navigation");

const PathBlock = styled.div`
  display: flex;
  flex-direction: row;
  font-size: medium;
  margin: 0.5rem auto 3rem auto;
`;
const PathSlash = styled.div`
  color: var(--fg);
  margin: 0 2px;
`;
const PathLink = styled(Link)`
  color: var(--accent);
`;

const ShowPath = (params) => {
  const thisPath = usePathname();

  return (
    <>
      <PathBlock>
        <PathLink href={"/"}>home</PathLink>
        <PathSlash>/</PathSlash>
        <PathLink href={`/${thisPath.split("/")[1]}`}>
          {thisPath.split("/")[1]}
        </PathLink>
        <PathSlash>/</PathSlash>
        {params.title}
      </PathBlock>
    </>
  );
};

export default ShowPath;
