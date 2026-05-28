"use client";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const TeaserBox = styled(motion.div)`
  margin: 2.5rem 0 1rem;
  padding: 1.5rem 1.75rem;
  border-radius: 14px;
  border: 1px solid var(--accent);
  background-color: var(--quote-bg);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const TeaserTitle = styled.h3`
  color: var(--accent);
  margin: 0;
  font-size: var(--text-h3, 1.1rem);
`;

const TeaserText = styled.p`
  color: var(--fg);
  font-size: var(--text-small);
  margin: 0;
  opacity: 0.85;
  line-height: 1.6;
`;

const TeaserButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  margin-top: 0.4rem;
  padding: 0.5rem 1.1rem;
  border-radius: 8px;
  background-color: var(--accent);
  color: var(--bg);
  font-weight: 700;
  font-size: var(--text-small);
  text-decoration: none;
  transition: opacity 0.15s, transform 0.15s;

  &:hover {
    opacity: 0.88;
    transform: translateY(-1px);
  }
`;

const ResourcesTeaser = () => {
  const t = useTranslations("Resources");

  return (
    <TeaserBox
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <TeaserTitle>{t("latex_cta_title")}</TeaserTitle>
      <TeaserText>{t("latex_cta_text")}</TeaserText>
      <TeaserButton href="/recursos">{t("latex_cta_button")}</TeaserButton>
    </TeaserBox>
  );
};

export default ResourcesTeaser;
