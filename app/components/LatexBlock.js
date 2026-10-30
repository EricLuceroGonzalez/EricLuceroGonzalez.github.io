"use client";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "@/i18n/navigation";
import { latexTemplates, overleafUrl } from "@/app/lib/latexTemplates";
import { SiOverleaf } from "react-icons/si";

// ── Contenedor ────────────────────────────────────────────────────────────────

const Panel = styled.section`
  margin: 1rem 0 4rem;
  padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.1rem, 3vw, 2rem);
  border-radius: 22px;
  background: var(--latex-soft);
  border: 1px solid var(--latex-border);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  text-align: left;
`;

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Logo = styled.span`
  font-family: "Latin Modern Roman", "Times New Roman", serif;
  font-size: 1.3rem;
  color: var(--latex-ink);

  sup {
    font-size: 0.7em;
    margin-left: -0.15em;
    vertical-align: 0.3em;
  }
  sub {
    font-size: 0.9em;
    margin-left: -0.1em;
    vertical-align: -0.25em;
  }
`;

const Title = styled.h2`
  margin: 0.3rem 0;
  font-size: clamp(1.6rem, 1.3rem + 1vw, 2rem);
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--heading);
`;

const Sub = styled.p`
  margin: 0;
  max-width: 36rem;
  line-height: 1.55;
  color: var(--subheading);
`;

const AllLink = styled(Link)`
  font-weight: 700;
  color: var(--latex-ink);
  &:hover {
    text-decoration: underline;
  }
`;

// ── Filtros ───────────────────────────────────────────────────────────────────

const Filters = styled.div`
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
`;

const FilterBtn = styled.button`
  flex: 0 0 auto;
  min-height: 40px;
  padding: 0 0.95rem;
  border-radius: 999px;
  font: inherit;
  font-size: var(--text-small);
  font-weight: 600;
  cursor: pointer;
  border: 1px solid
    ${(p) => (p.$active ? "var(--latex-ink)" : "var(--latex-border)")};
  background: ${(p) => (p.$active ? "var(--latex-ink)" : "var(--card-bg)")};
  color: ${(p) => (p.$active ? "var(--bg)" : "var(--fg)")};

  &:focus-visible {
    outline: 2px solid var(--latex-ink);
    outline-offset: 2px;
  }
`;

// ── Tarjetas ──────────────────────────────────────────────────────────────────

const Grid = styled.div`
  display: grid;
  gap: 0.9rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 760px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1.25rem;
  }
`;

const Card = styled.article`
  container-type: inline-size;
  background: var(--card-bg);
  border: 1px solid var(--latex-border);
  border-radius: 14px;
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  outline: ${(p) => (p.$selected ? "2px solid var(--latex-ink)" : "none")};
  outline-offset: 2px;
`;

const PickBtn = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 8px;

  &:hover [data-thumb] {
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16), 0 10px 22px rgba(0, 0, 0, 0.1);
  }
  &:focus-visible {
    outline: 2px solid var(--latex-ink);
    outline-offset: 3px;
  }
`;

// Cada patrón: sus capas de gradiente y el tamaño de cada capa.
// ── Miniaturas ────────────────────────────────────────────────────────────────
// Tamaños en cqw (ancho del contenedor = la tarjeta): la densidad del patrón
// es la misma en móvil y escritorio.
const h = (c) => `linear-gradient(${c} 1px, transparent 1px)`;
const v = (c) => `linear-gradient(90deg, ${c} 1px, transparent 1px)`;
const sq = (n) => `calc(100cqw / ${n}) calc(100cqw / ${n})`;

// Cada línea: 1px de gris y transparente HASTA la siguiente línea.
// (Si el transparente fuera un solo punto, el navegador difuminaría
//  hasta la línea siguiente y saldrían bandas grises.)
const STAFF_Y = [30, 38, 46, 54, 62];
const staffLines = STAFF_Y.map(
  (y, i) =>
    `#555 ${y}% calc(${y}% + 1px), transparent calc(${y}% + 1px) ${STAFF_Y[i + 1] ?? 100}%`,
).join(", ");

const PATTERNS = {
  grid: {
    layers: [h("#B9D2EE"), v("#B9D2EE")],
    sizes: [sq(16), sq(16)],
  },
  mm: {
    layers: [h("#E8958B"), v("#E8958B"), h("#F6D3CE"), v("#F6D3CE")],
    sizes: [sq(9), sq(9), sq(45), sq(45)],
  },
  staff: {
    layers: [`linear-gradient(180deg, transparent 0 30%, ${staffLines})`],
    sizes: ["100% calc(100cqw / 4)"],
  },
  figure: {
    layers: [
      "linear-gradient(transparent calc(50% - 1px), #555 calc(50% - 1px) calc(50% + 1px), transparent calc(50% + 1px))",
    ],
    sizes: ["100% 100%"],
  },
};

// Arriba la miniatura real (si existe); debajo el patrón como respaldo.
// La miniatura ocupa toda la hoja porque ya incluye sus márgenes;
// el patrón se dibuja dentro del padding, que hace de margen.
const thumbStyle = (t) => {
  const p = PATTERNS[t.pattern] ?? PATTERNS.grid;
  const each = (value) => p.layers.map(() => value);
  const list = (thumbValue, patternValues) =>
    (t.thumb ? [thumbValue, ...patternValues] : patternValues).join(", ");

  return {
    backgroundColor: "#fff",
    backgroundImage: list(`url("${t.thumb}")`, p.layers),
    backgroundSize: list(t.fit === "contain" ? "contain" : "100% 100%", p.sizes),
    backgroundRepeat: list("no-repeat", each("repeat")),
    backgroundPosition: list("center", each("left top")),
    backgroundOrigin: list("border-box", each("content-box")),
    backgroundClip: list("border-box", each("content-box")),
  };
};

const Thumb = styled.div`
  aspect-ratio: 1 / 1.414;
  padding: 7%;
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.14), 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.18s, box-shadow 0.18s;
  opacity: ${(p) => (p.$muted ? 0.55 : 1)};
`;

const SoonBadge = styled.span`
  align-self: flex-start;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--latex-ink);
  border: 1px dashed var(--latex-ink);
`;

const isReady = (t) => Boolean(t.pdf || t.source);

const CardTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--heading);
`;

const CardMeta = styled.p`
  margin: 0;
  font-size: 0.78rem;
  color: var(--muted);
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(${(p) => p.$count}, minmax(0, 1fr));
  gap: 0.4rem;
`;

const Action = styled.a`
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid var(--latex-ink);
  color: ${(p) => (p.$primary ? "var(--bg)" : "var(--latex-ink)")};
  background: ${(p) => (p.$primary ? "var(--latex-ink)" : "transparent")};

  &:hover {
    opacity: 0.85;
  }
`;

const DesktopOnly = styled.div`
  display: none;
  @media (min-width: 760px) {
    display: block;
  }
`;

const Detail = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--latex-border);
  border-radius: 14px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;

  @media (min-width: 760px) {
    display: none;
  }
`;

const Soon = styled.article`
  border: 1px dashed var(--latex-border);
  border-radius: 14px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 0.4rem;
  color: var(--subheading);
`;

// ── Posts de LaTeX ────────────────────────────────────────────────────────────

const FromBlog = styled.div`
  border-top: 1px solid var(--latex-border);
  padding-top: 1.3rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const FromBlogLabel = styled.h3`
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--latex-ink);
`;

const PostLink = styled(Link)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1.5rem;
  align-items: baseline;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-radius: 12px;
  background: var(--card-bg);
  border: 1px solid var(--latex-border);
  color: var(--fg);

  &:hover {
    border-color: var(--latex-ink);
  }
`;

// ── Componentes ───────────────────────────────────────────────────────────────

function TemplateActions({ t }) {
  const count = [t.pdf, t.source, t.source].filter(Boolean).length;
  const ext = t.sourceType === "zip" ? ".zip" : ".tex";
  if (!count) return null;
  return (
    <Actions $count={count}>
      {t.pdf && (
        <Action
          $primary
          href={t.pdf}
          target="_blank"
          rel="noopener"
          aria-label={`PDF: ${t.title}`}
        >
          PDF
        </Action>
      )}
      {t.source && (
        <Action href={t.source} download aria-label={`${ext}: ${t.title}`}>
          {ext}
        </Action>
      )}
      {t.source && (
        <Action
          href={overleafUrl(t.source)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Overleaf: ${t.title}`}
        >
          <SiOverleaf/>
        </Action>
      )}
    </Actions>
  );
}

export default function LatexBlock({ locale, labels, posts = [] }) {
  const templates = latexTemplates.map((t) => ({
    ...t,
    title: t.title[locale] ?? t.title.es,
    description: t.description[locale] ?? t.description.es,
  })).sort((a, b) => isReady(b) - isReady(a));
  const categories = [...new Set(templates.map((t) => t.category))];

  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(templates[0]?.id);

  const visible =
    filter === "all" ? templates : templates.filter((t) => t.category === filter);
  const current = visible.find((t) => t.id === selected) ?? visible[0];

  return (
    <Panel aria-labelledby="latex-title">
      <Head>
        <div>
          <Logo aria-hidden="true">
            L<sup>A</sup>T<sub>E</sub>X
          </Logo>
          <Title id="latex-title">{labels.title}</Title>
          <Sub>{labels.subtitle}</Sub>
        </div>
        <AllLink href="/recursos">{labels.all}</AllLink>
      </Head>

      {categories.length > 1 && (
        <Filters role="group" aria-label={labels.filterAll}>
          <FilterBtn
            type="button"
            $active={filter === "all"}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            {labels.filterAll}
          </FilterBtn>
          {categories.map((c) => (
            <FilterBtn
              type="button"
              key={c}
              $active={filter === c}
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
            >
              {labels.categories?.[c] ?? c}
            </FilterBtn>
          ))}
        </Filters>
      )}

      <Grid>
        {visible.map((t) => (
          <Card key={t.id} $selected={t.id === current?.id}>
            <PickBtn
              type="button"
              onClick={() => setSelected(t.id)}
              aria-pressed={t.id === current?.id}
            >
              <Thumb data-thumb aria-hidden="true" $muted={!isReady(t)} style={thumbStyle(t)} />
              <CardTitle>{t.title}</CardTitle>
              <CardMeta>{t.meta}</CardMeta>
              {!isReady(t) && <SoonBadge>{labels.soonTitle}</SoonBadge>}
            </PickBtn>
            <DesktopOnly>
              <TemplateActions t={t} />
            </DesktopOnly>
          </Card>
        ))}
        <Soon>
          <strong style={{ color: "var(--latex-ink)" }}>{labels.soonTitle}</strong>
          <span style={{ fontSize: "0.8rem", lineHeight: 1.45 }}>
            {labels.soonText}
          </span>
        </Soon>
      </Grid>

      {current && (
        <Detail aria-live="polite">
          <CardTitle as="p" style={{ fontSize: "1.1rem" }}>
            {current.title}
          </CardTitle>
          <p style={{ margin: 0, lineHeight: 1.5, color: "var(--subheading)" }}>
            {current.description}
          </p>
          <TemplateActions t={current} />
        </Detail>
      )}

      {posts.length > 0 && (
        <FromBlog>
          <FromBlogLabel>{labels.fromBlog}</FromBlogLabel>
          {posts.slice(0, 2).map((p) => (
            <PostLink key={p.slug} href={`/latex/${p.slug}`}>
              <span
                style={{ display: "flex", flexDirection: "column", gap: 4, flex: "1 1 320px" }}
              >
                <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--latex-ink)" }}>
                  {p.title}
                </span>
                <span style={{ lineHeight: 1.5, color: "var(--subheading)" }}>
                  {p.excerpt}
                </span>
              </span>
              <span style={{ fontSize: "0.8rem", color: "var(--muted)", whiteSpace: "nowrap" }}>
                {labels.minRead.replace("{n}", p.readingTime)} · {p.date.formatted}
              </span>
            </PostLink>
          ))}
        </FromBlog>
      )}
    </Panel>
  );
}
