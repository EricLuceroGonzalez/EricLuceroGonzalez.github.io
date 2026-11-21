"use client";
import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const TocWrapper = styled.nav`
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

const linkStyles = css`
  font-size: 0.78rem;
  color: var(--fg);
  text-decoration: none;
  padding: 3px 6px;
  border-radius: 5px;
  line-height: 1.4;
  transition: background-color 0.15s, color 0.15s;

  /* Los h3 van sangrados bajo su h2 */
  margin-left: ${({ $depth }) => ($depth > 2 ? `${($depth - 2) * 0.75}rem` : 0)};
  font-size: ${({ $depth }) => ($depth > 2 ? "0.74rem" : "0.78rem")};

  /* Sección que se está leyendo */
  ${({ $active }) =>
    $active &&
    css`
      color: var(--accent);
      background-color: var(--quote-bg);
      font-weight: 600;
    `}

  &:hover {
    background-color: var(--quote-bg);
    color: var(--accent);
  }
`;

// Enlace a otra página (listados del blog y de LaTeX)
const TocLink = styled(Link)`
  ${linkStyles}
`;

// Enlace a una sección de la misma página (#slug): un <a> normal, sin navegación de Next
const TocAnchor = styled.a`
  ${linkStyles}
`;

const TocCount = styled.span`
  font-size: 0.7rem;
  color: var(--accent);
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--primary-border);
`;

// Devuelve el slug de la sección visible: la última cuyo encabezado ya ha pasado
// por la parte superior de la pantalla.
function useActiveSection(slugs, enabled) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!enabled || !slugs.length) return;
    const headings = slugs.map((s) => document.getElementById(s)).filter(Boolean);
    if (!headings.length) return;

    const update = () => {
      const limit = 120; // px desde arriba: algo por debajo de la barra de navegación
      let current = headings[0].id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= limit) current = h.id;
        else break;
      }
      setActive(current);
    };

    // El observer solo avisa de que algo cambió; el cálculo de arriba decide cuál está activo
    const observer = new IntersectionObserver(update, {
      rootMargin: "0px 0px -60% 0px",
      threshold: [0, 1],
    });
    headings.forEach((h) => observer.observe(h));
    update();
    return () => observer.disconnect();
  }, [slugs, enabled]);

  return active;
}

/**
 * Índice lateral fijo, visible a partir de 1280 px de ancho.
 *
 * items: [{ slug, title, href?, depth? }]
 *   - con href: enlace a otra página (listados);
 *   - sin href: enlace a #slug dentro de la página (encabezados de un post).
 *   - depth: 2 para h2, 3 para h3 (sangría). Por defecto, 2.
 * label: título del recuadro; si no se pasa, "Contenido" / "Contents".
 * showCount: muestra "N entradas" al pie (listados). En los posts, false.
 * trackActive: resalta la sección que se está leyendo (posts).
 */
export default function TableOfContentsAside({
  items = [],
  label,
  showCount = true,
  trackActive = false,
}) {
  const t = useTranslations("TableOfContents");
  const anchors = items.filter((item) => !item.href).map((item) => item.slug);
  const [slugs] = useState(anchors); // estable entre renders
  const active = useActiveSection(slugs, trackActive);

  if (!items.length) return null;
  const title = label || t("label");

  return (
    <TocWrapper aria-label={title}>
      <TocTitle>{title}</TocTitle>
      {items.map(({ slug, title: text, href, depth = 2 }) =>
        href ? (
          <TocLink key={slug} href={href} $depth={depth}>
            {text}
          </TocLink>
        ) : (
          <TocAnchor
            key={slug}
            href={`#${slug}`}
            $depth={depth}
            $active={active === slug}
            aria-current={active === slug ? "location" : undefined}
          >
            {text}
          </TocAnchor>
        ),
      )}
      {showCount && (
        <TocCount>
          {items.length} {t("entries")}
        </TocCount>
      )}
    </TocWrapper>
  );
}
