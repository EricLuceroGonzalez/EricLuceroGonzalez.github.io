"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

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
  background: var(--primary, #ff3366);
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
  color: var(--primary, #ff3366);
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
  padding: 5px 12px;
  border-radius: 7px;
  border: 1px solid var(--primary, #ff3366);
  transition: background-color 0.15s, color 0.15s;
  flex-shrink: 0;

  &:hover {
    background-color: var(--primary, #ff3366);
    color: var(--bg);
  }
`;

const Divider = styled.div`
  height: 1px;
  background: var(--primary-border);
  margin-bottom: 1.4rem;
`;

const PreviewBox = styled.div`
  background: var(--quote-bg);
  border-radius: 14px;
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const TagGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

const TAG_ACCENT = {
  Music: "#FF6B9D",
  Música: "#FF6B9D",
  "Graph Paper": "#0acaca",
  "Papel cuadriculado": "#0acaca",
  TikZ: "#45B7D1",
  Presentation: "#96CEB4",
  Presentación: "#96CEB4",
};

const TagPill = styled(motion.span)`
  padding: 0.35rem 0.9rem;
  border-radius: 20px;
  font-size: var(--text-small);
  font-weight: 600;
  font-family: monospace;
  border: 1px solid currentColor;
  cursor: default;
  user-select: none;
`;

const Description = styled.p`
  font-size: var(--text-small);
  color: var(--fg);
  opacity: 0.78;
  margin: 0;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-self: flex-start;
  padding: 0.55rem 1.3rem;
  border-radius: 8px;
  background: var(--primary, #ff3366);
  color: var(--bg);
  font-weight: 700;
  font-size: var(--text-small);
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;

  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

// ── Component ─────────────────────────────────────────────────────────────────

const ResourcesPreviewBlock = ({ seeAllHref, seeAllLabel, title }) => {
  const t = useTranslations("Resources");
  const items = t.raw("items");
  const uniqueTags = [...new Set(items.map((item) => item.tag))];

  return (
    <Section>
      <Header>
        <TitleWrap>
          <AccentBar aria-hidden="true" />
          <SectionTitle>{title}</SectionTitle>
        </TitleWrap>
        <SeeAll href={seeAllHref}>{seeAllLabel}</SeeAll>
      </Header>
      <Divider />
      <PreviewBox>
        <TagGrid>
          {uniqueTags.map((tag, i) => (
            <TagPill
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              style={{
                color: TAG_ACCENT[tag] || "var(--accent)",
                borderColor: TAG_ACCENT[tag] || "var(--accent)",
              }}
            >
              {tag}
            </TagPill>
          ))}
        </TagGrid>
        <Description>{t("subtitle")}</Description>
        <CTAButton href={seeAllHref}>{seeAllLabel}</CTAButton>
      </PreviewBox>
    </Section>
  );
};

export default ResourcesPreviewBlock;
