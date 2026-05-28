"use client";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import ResourceCard from "./ResourceCard";

const Section = styled.section`
  margin: 2.5rem 0 1rem 0;
`;

const SectionTitle = styled.h2`
  color: var(--heading);
  font-size: var(--text-h2, 1.3rem);
  margin-bottom: 0.25rem;
`;

const SectionSubtitle = styled.p`
  font-size: var(--text-small);
  color: var(--fg);
  opacity: 0.75;
  margin-bottom: 1.25rem;
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1080px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LatexResourcesSection = () => {
  const t = useTranslations("Resources");
  const items = t.raw("items");

  return (
    <Section>
      <SectionTitle>{t("title")}</SectionTitle>
      <SectionSubtitle>{t("subtitle")}</SectionSubtitle>
      <ResourceGrid>
        {items.map((res) => (
          <ResourceCard key={res.id} {...res} />
        ))}
      </ResourceGrid>
    </Section>
  );
};

export default LatexResourcesSection;
