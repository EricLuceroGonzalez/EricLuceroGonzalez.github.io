"use client";
import styled from "styled-components";
import { Link } from "@/i18n/navigation";

const Row = styled.div`
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
`;

const Chip = styled(Link)`
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--primary-border);
  background: var(--card-bg);
  color: var(--fg);
  font-weight: 600;
  font-size: var(--text-small);
  transition: border-color 0.15s, color 0.15s;
  &:hover { border-color: var(--accent-ink); color: var(--accent-ink); }
`;

export default function TopicChips({ label, topics }) {
  return (
    <section aria-labelledby="topics-label" style={{ paddingBottom: "3.5rem" }}>
      <h2
        id="topics-label"
        style={{ margin: "0 0 1rem", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 700 }}
      >
        {label}
      </h2>
      <Row>
        {Object.entries(topics).map(([key, name]) => (
          <Chip key={key} href={key === "latex" ? "/latex" : `/blog?tema=${key}`}>
            {name}
          </Chip>
        ))}
      </Row>
    </section>
  );
}