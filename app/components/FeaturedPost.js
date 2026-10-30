"use client";
import styled from "styled-components";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { AccentBar, SectionTitle, TitleWrap } from "./HomeSectionBlock";

const Label = styled.h2`
  margin: 0 0 1rem;
  font-size: var(--text-h2);
  color: var(--muted);
  font-weight: 800;
  letter-spacing: 0.02em;
`;

const Card = styled.article`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--primary-border);
  border-radius: 18px;
  overflow: hidden;
  background: var(--card-bg);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
`;

const Media = styled.div`
  position: relative;
  flex: 1 1 420px;
  min-height: 260px;
  background: var(--quote-bg);
`;

const Body = styled.div`
  flex: 1 1 360px;
  padding: clamp(1.25rem, 3vw, 2rem);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

const Badges = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const InteractiveBadge = styled.span`
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--primary);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
`;

const Title = styled.h3`
  margin: 0;
  font-size: clamp(1.4rem, 1.1rem + 1.2vw, 1.8rem);
  line-height: 1.2;
  font-weight: 800;
  color: var(--heading);
  text-wrap: balance;
`;

const Excerpt = styled.p`
  margin: 0;
  line-height: 1.6;
  color: var(--subheading);
`;

const Meta = styled.p`
  margin: 0;
  font-size: var(--text-small);
  color: var(--muted);
`;

const Cta = styled(Link)`
  align-self: flex-start;
  margin-top: 0.4rem;
  padding: 0.8rem 1.3rem;
  border-radius: 10px;
  background: var(--fg);
  color: var(--bg);
  font-weight: 700;
  &:hover { opacity: 0.88; }
`;

export default function FeaturedPost({ post, labels }) {
  if (!post) return null;
  const href = `/${post.doctype[0]}/${post.slug}`;
  return (
    <section aria-labelledby="featured-label" style={{ paddingBottom: "3.5rem" }}>
      <Label id="featured-label">{labels.featured}</Label>
      <Card>
        <Media>
          {post.coverImage && (
            <Image
              src={post.coverImage}
              alt={post.coverImageAlt || ""}
              fill
              sizes="(max-width: 800px) 100vw, 560px"
              style={{ objectFit: "cover" }}
              priority
            />
          )}
        </Media>
        <Body>
          <Badges>
            {post.interactive && <InteractiveBadge>{labels.interactive}</InteractiveBadge>}
            {post.topic && (
              <span style={{ padding: "4px 10px", borderRadius: 6, background: "var(--quote-bg)", fontSize: "0.75rem", fontWeight: 600 }}>
                {labels.topics[post.topic]}
              </span>
            )}
          </Badges>
          <Title>{post.title}</Title>
          <Excerpt>{post.excerpt}</Excerpt>
          <Meta>{labels.minRead.replace("{n}", post.readingTime)} · {post.date.formatted}</Meta>
          <Cta href={href}>{labels.cta}</Cta>
        </Body>
      </Card>
    </section>
  );
}