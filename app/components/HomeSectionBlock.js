"use client";
import styled from "styled-components";
import { Link } from "@/i18n/navigation";
import PostCardVertical from "./PostCardVertical";

// ── Styled components ──────────────────────────────────────────────────────────

const Section = styled.section`
  margin: 3rem 0 1rem;
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.4rem;
  gap: 1rem;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 0.65rem;
`;

const AccentBar = styled.span`
  display: inline-block;
  width: 4px;
  height: 1.4em;
  border-radius: 3px;
  background: ${(props) => props.$color || "var(--accent)"};
  flex-shrink: 0;
`;

const SectionTitle = styled.h2`
  font-size: var(--text-h2);
  font-weight: 800;
  margin: 0;
  color: var(--heading);
  letter-spacing: -0.02em;
`;

const SeeAll = styled(Link)`
  font-size: var(--text-small);
  color: ${(props) => props.$color || "var(--accent)"};
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
  padding: 5px 12px;
  border-radius: 7px;
  border: 1px solid ${(props) => props.$color || "var(--accent)"};
  transition: background-color 0.15s, color 0.15s;
  flex-shrink: 0;

  &:hover {
    background-color: ${(props) => props.$color || "var(--accent)"};
    color: var(--bg);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--primary-border);
  margin-bottom: 1.4rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  align-items: start;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

const HomeSectionBlock = ({
  title,
  seeAllHref,
  seeAllLabel,
  posts = [],
  accentColor,
  locale,
}) => {
  if (!posts.length) return null;

  return (
    <Section>
      <Header>
        <TitleWrap>
          <AccentBar $color={accentColor} aria-hidden="true" />
          <SectionTitle>{title}</SectionTitle>
        </TitleWrap>
        <SeeAll href={seeAllHref} $color={accentColor}>
          {seeAllLabel}
        </SeeAll>
      </Header>
      <Divider />
      <Grid>
        {posts.slice(0, 3).map((post) => (
          console.log("Rendering post in HomeSectionBlock:", post),
          <PostCardVertical
            key={post.id || post.slug}
            {...post}
            locale={locale}
          />
        ))}
      </Grid>
    </Section>
  );
};

export default HomeSectionBlock;
