import { Link } from "@/i18n/navigation";
import styled from "styled-components";
import { usePathname } from "next/navigation";

// El estilo va en el propio <a>. Antes había un motion.div con whileTap dentro
// del enlace: Framer le añadía tabindex="0" y cada pestaña recibía el foco dos veces.
const StyledAnchor = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 8px 6px;
  font-weight: bold;
  font-size: var(--text-base);
  border-radius: 8px;
  color: ${(p) => (p.$active ? "var(--on-accent)" : "var(--fg)")};
  background-color: ${(p) => (p.$active ? "var(--accent)" : "transparent")};
  transition: background-color 0.2s ease, color 0.2s ease, transform 0.1s ease;

  @media (min-width: 660px) {
    margin: 2px 1rem;
  }
  &:hover {
    background-color: var(--fg);
    color: var(--bg);
  }
  &:active {
    transform: scale(0.94);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

const StyledLink = ({ actualPath, pathName, href, children }) => {
  const currentPath = usePathname();
  const [, locale, section] = currentPath.split("/");
  const active = `/${locale}/${section}` === `${actualPath}${pathName}`;

  return (
    <StyledAnchor href={href} $active={active} aria-current={active ? "page" : undefined}>
      {children}
    </StyledAnchor>
  );
};

export default StyledLink;
