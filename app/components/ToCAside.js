"use client";
import styled from "styled-components";
import { Link } from "@/i18n/navigation";

const TocWrapper = styled.aside`
  display: none;

  @media (min-width: 1280px) {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 80px;
    right: 1.5rem;
    width: 200px;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    background-color: var(--bg);
    border: 1px solid var(--primary-border);
    border-radius: 10px;
    padding: 1rem;
    gap: 0.25rem;
    z-index: 50;
    scrollbar-width: thin;
  }

  @media (min-width: 1600px) {
    width: 230px;
    right: 2rem;
  }
`;

const TocTitle = styled.h4`
  font-size: var(--text-small);
  color: var(--heading);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--primary-border);
`;

const TocLink = styled(Link)`
  font-size: 0.78rem;
  color: var(--fg);
  text-decoration: none;
  padding: 3px 6px;
  border-radius: 5px;
  line-height: 1.4;
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    background-color: var(--quote-bg);
    color: var(--accent);
  }
`;

const TocCount = styled.span`
  font-size: 0.7rem;
  color: var(--accent);
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--primary-border);
`;

export default function TableOfContentsAside({ items = [], label = "Contents" }) {
  if (!items.length) return null;

  return (
    <TocWrapper aria-label="Table of contents">
      <TocTitle>{label}</TocTitle>
      {items.map(({ slug, title, href }) => (
        <TocLink key={slug} href={href || `#${slug}`}>
          {title}
        </TocLink>
      ))}
      <TocCount>{items.length} entries</TocCount>
    </TocWrapper>
  );
}
