"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SectionType } from "../ui/BlogHeaderInfo.js";
import DateDisplay from "./DateDisplay.js";

// ── Styled components ──────────────────────────────────────────────────────────

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid var(--gray-light);
  background: var(--bg);
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.18s, transform 0.18s, border-color 0.18s;
  height: 100%;

  &:hover {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.16);
    transform: translateY(-4px);
    border-color: var(--box-border-hover);
  }
`;

const CardLink = styled(Link)`
  display: flex;
  flex-direction: column;
  height: 100%;
  text-decoration: none;
  color: inherit;
`;

const ImageArea = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: var(--quote-bg);
  flex-shrink: 0;
  overflow: hidden;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.9rem 1rem 1rem;
  gap: 0.45rem;
  flex: 1;
`;

const TagRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  min-height: 1.4rem;
`;

const CardTitle = styled.h3`
  color: var(--accent);
  font-size: var(--text-base);
  font-weight: 700;
  line-height: 1.05;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
`;

const CardExcerpt = styled.p`
  color: var(--fg);
  font-size: var(--text-small);
  opacity: 0.72;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
  flex: 1;
`;

const CardDate = styled.span`
  font-size: var(--text-very-small);
  color: var(--quote-fg);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-top: 0.5rem;
`;

// ── Component ─────────────────────────────────────────────────────────────────

const PostCardVertical = ({
  title,
  slug,
  date,
  excerpt,
  doctype,
  categories,
  coverImage,
  coverImageAlt,
  locale,
}) => {
  return (
    <Wrapper
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CardLink href={`/${doctype[0]}/${slug}`}>
        <ImageArea>
          {coverImage && (
            <Image
              src={coverImage}
              fill
              sizes="(max-width: 660px) 100vw, (max-width: 1080px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              alt={coverImageAlt || title}
              priority={false}
            />
          )}
        </ImageArea>
        <Body>
          <TagRow>
            {categories.slice(0, 2).map((cat) => (
              <SectionType key={cat} $tag={cat}>
                {cat}
              </SectionType>
            ))}
          </TagRow>
          <CardTitle>{title}</CardTitle>
          <CardExcerpt>{excerpt}</CardExcerpt>
          <CardDate>
            <DateDisplay
              isoDate={date.iso}
              defaultFormatted={date.formatted}
              locale={locale}
            />
          </CardDate>
        </Body>
      </CardLink>
    </Wrapper>
  );
};

export default PostCardVertical;
