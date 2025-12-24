"use client";
import { Link } from "@/i18n/navigation";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import styled from "styled-components";

const Excerpt = styled.p`
  margin: 5px 0 0;
  font-size: small;
  font-weight: 300;
`;
const NavCard = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  margin: 12px 0;
  border-radius: 10px;
  background: var(--bg);
  color: var(--accent);
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  svg {
    color: var(--accent);
    font-size: larger;
    margin: 2px 5px;
    padding: 1px 1px;
    /* width: 14px;
    height: 14px; */
  }
  border: 1px solid var(--fg);
  width: 35%;
  @media (max-width: 620px) {
    width: 49%;
  }
  &:hover {
    background: var(--fg);
    transform: translateY(-2px);
    color: var(--bg);
  }
`;

const PostInfo = styled.div`
  flex: 1;
  margin: 0 2px;
  &:hover {
    color: var(--bg);
  }
`;

const Title = styled.h4`
  margin: 0;
  padding: 0.3rem 0;
  font-size: small;
  text-align: left;
  @media (min-width: 660px) {
    font-size: large;
    text-align: left;
  }
`;

const PostNavigationCard = ({ post, type }) => {
  if (!post) return null;
  // TODO: Rendering todos aunque no tengan el mismo tag
  return (
    <NavCard
      href={
        `/${post.doctype[0]}/${post.slug}`
        // post.doctype.includes("curso")
        //   ? `/latex/curso/${post.slug}`  // Si es parte del curso
        //   : `/${post.doctype[0]}/${post.slug}`  // Para otros casos
      }
    >
      {type === "prev" && <FaArrowAltCircleLeft />}
      <PostInfo>
        <Excerpt>{type == "prev" ? "Anterior" : "Siguiente"}</Excerpt>
        <Title>{post.title}</Title>
      </PostInfo>
      {type === "next" && <FaArrowAltCircleRight />}
    </NavCard>
  );
};

export default PostNavigationCard;
