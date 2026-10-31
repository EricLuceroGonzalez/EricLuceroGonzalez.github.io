"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styled from "styled-components";
import HomeBoxes from "./HomeBoxes";

const Bar = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1.5rem 0 1.75rem;
`;

const Chip = styled.button`
  min-height: 40px;
  padding: 0 1rem;
  border-radius: 999px;
  font: inherit;
  font-size: var(--text-small);
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid
    ${(p) => (p.$active ? "var(--accent-ink)" : "var(--primary-border)")};
  background: ${(p) => (p.$active ? "var(--accent-ink)" : "var(--card-bg)")};
  color: ${(p) => (p.$active ? "var(--bg)" : "var(--fg)")};
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: var(--accent-ink);
  }
  &:focus-visible {
    outline: 2px solid var(--accent-ink);
    outline-offset: 2px;
  }
`;

const Count = styled.span`
  font-size: 0.75em;
  opacity: 0.7;
`;

const Status = styled.p`
  margin: 0 0 1rem;
  font-size: var(--text-small);
  color: var(--muted);
`;

const Empty = styled.p`
  padding: 2rem 0;
  color: var(--subheading);
`;

export default function BlogTopicFilter({ posts, topics, labels, locale }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // La página es estática: el HTML se genera sin ?tema=. Si se leyera el
  // parámetro en el primer render, el cliente pintaría otra lista y React
  // daría un error de hidratación (#418). Se aplica justo después de montar.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const requested = mounted ? searchParams.get("tema") : null;
  const active = requested && topics[requested] ? requested : null;

  // Solo se muestran los temas que tienen al menos un post.
  const counts = posts.reduce((acc, p) => {
    if (p.topic) acc[p.topic] = (acc[p.topic] ?? 0) + 1;
    return acc;
  }, {});
  const available = Object.keys(topics).filter((key) => counts[key]);

  const visible = active ? posts.filter((p) => p.topic === active) : posts;

  const select = (key) => {
    const params = new URLSearchParams(searchParams);
    if (key) params.set("tema", key);
    else params.delete("tema");
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return (
    <>
      {available.length > 1 && (
        <Bar role="group" aria-label={labels.filterLabel}>
          <Chip
            type="button"
            $active={!active}
            aria-pressed={!active}
            onClick={() => select(null)}
          >
            {labels.all} <Count>{posts.length}</Count>
          </Chip>
          {available.map((key) => (
            <Chip
              type="button"
              key={key}
              $active={active === key}
              aria-pressed={active === key}
              onClick={() => select(key)}
            >
              {topics[key]} <Count>{counts[key]}</Count>
            </Chip>
          ))}
        </Bar>
      )}

      <Status aria-live="polite">
        {active
          ? labels.showing
              .replace("{n}", visible.length)
              .replace("{topic}", topics[active])
          : ""}
      </Status>

      {visible.length > 0 ? (
        <HomeBoxes props={visible} locale={locale} />
      ) : (
        <Empty>{labels.empty}</Empty>
      )}
    </>
  );
}
