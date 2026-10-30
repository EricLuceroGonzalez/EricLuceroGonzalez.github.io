"use client";
import styled from "styled-components";
import { useLocale } from "next-intl";

const Box = styled.section`
  margin-bottom: 5rem;
  padding: 2.2rem 1.75rem;
  border-radius: 18px;
  background: var(--fg);
  color: var(--bg);
  display: flex;
  gap: 1.25rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Rss = styled.a`
  min-height: 46px;
  padding: 0 1.2rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 10px;
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 700;
  &:hover { opacity: 0.9; }
`;

export default function FollowBlock({ labels }) {
  const locale = useLocale();
  return (
    <Box aria-labelledby="follow-title">
      <div style={{ flex: "1 1 340px", display: "flex", flexDirection: "column", gap: 6 }}>
        <h2 id="follow-title" style={{ margin: 0, fontSize: "1.5rem", fontWeight: 800, color: "inherit" }}>{labels.title}</h2>
        <p style={{ margin: 0, opacity: 0.8 }}>{labels.text}</p>
      </div>
      <Rss href={`/${locale}/feed.xml`}>
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 11a9 9 0 0 1 9 9" /><path d="M4 4a16 16 0 0 1 16 16" /><circle cx="5" cy="19" r="1" />
        </svg>
        {labels.rss}
      </Rss>
    </Box>
  );
}