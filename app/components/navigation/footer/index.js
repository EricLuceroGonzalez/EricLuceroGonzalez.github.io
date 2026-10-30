"use client";
import styled from "styled-components";
import { useLocale, useTranslations } from "next-intl";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaRss, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiI18Next } from "react-icons/si";
import { IoLogoJavascript } from "react-icons/io5";
import { Link } from "@/i18n/navigation";

const SOCIAL = [
  { key: "github", href: "https://github.com/EricLuceroGonzalez", Icon: FaGithub },
  { key: "linkedin", href: "https://www.linkedin.com/in/ericlucerog/", Icon: FaLinkedin },
  { key: "instagram", href: "https://www.instagram.com/ericlucerog/", Icon: FaInstagram },
  { key: "email", href: "mailto:ericlucerogonzalez@gmail.com", Icon: FaEnvelope },
];

const CC_URL = "https://creativecommons.org/licenses/by-nc-sa/4.0/deed";
const MIT_URL = "https://opensource.org/license/mit";

// ── Estilos ───────────────────────────────────────────────────────────────────
// El footer tiene sus propios tokens (--footer-*): es oscuro en los dos temas,
// en vez de invertirse con --fg/--bg.

const Wrap = styled.footer`
  background: var(--footer-bg);
  color: var(--footer-fg);
  border-top: 3px solid var(--accent);
  font-size: var(--text-small);
  padding: 2.75rem 1.25rem 1.5rem;

  a {
    color: inherit;
    text-decoration: none;
  }
  a:hover,
  a:focus-visible {
    color: var(--footer-accent);
  }
  a:focus-visible {
    outline: 2px solid var(--footer-accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

const Grid = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: grid;
  gap: 2rem 2.5rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 760px) {
    grid-template-columns: minmax(0, 1.6fr) repeat(2, minmax(0, 1fr));
  }
`;

const Brand = styled.div`
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  max-width: 26rem;

  @media (min-width: 760px) {
    grid-column: auto;
  }
`;

const Name = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  letter-spacing: -0.01em;
`;

const Tagline = styled.p`
  margin: 0;
  line-height: 1.55;
  color: var(--footer-muted);
`;

const Social = styled.ul`
  list-style: none;
  margin: 0.4rem 0 0 -10px;
  padding: 0;
  display: flex;
  gap: 0.25rem;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  font-size: 1.25rem;
  transition: background-color 0.15s, color 0.15s;

  &:hover {
    background: var(--footer-hover-bg);
  }
`;

const ColTitle = styled.h2`
  margin: 0 0 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--footer-muted);
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const Item = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 40px;
`;

const Bottom = styled.div`
  max-width: 1120px;
  margin: 2.25rem auto 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--footer-line);
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1.5rem;
  justify-content: space-between;
  align-items: center;
  color: var(--footer-muted);
  font-size: 0.85rem;

  p {
    margin: 0;
  }
  a {
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

const Stack = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  svg {
    font-size: 1rem;
  }
`;

// ── Componente ────────────────────────────────────────────────────────────────

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <Wrap>
      <Grid>
        <Brand>
          <Name>Eric Lucero González</Name>
          <Tagline>{t("tagline")}</Tagline>
          <Social aria-label={t("social_label")}>
            {SOCIAL.map(({ key, href, Icon }) => {
              const external = href.startsWith("http");
              return (
                <li key={key}>
                  <SocialLink
                    href={href}
                    aria-label={t(`social.${key}`)}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    <Icon aria-hidden="true" focusable="false" />
                  </SocialLink>
                </li>
              );
            })}
          </Social>
        </Brand>

        <nav aria-labelledby="footer-explore">
          <ColTitle id="footer-explore">{t("explore")}</ColTitle>
          <List>
            <li><Item href="/blog">Blog</Item></li>
            <li><Item href="/latex">LaTeX</Item></li>
            <li><Item href="/about">{t("about")}</Item></li>
            <li>
              {/* El feed no es una ruta de next-intl: enlace normal con el idioma */}
              <Item as="a" href={`/${locale}/feed.xml`}>
                <FaRss aria-hidden="true" focusable="false" /> RSS
              </Item>
            </li>
          </List>
        </nav>

        <nav aria-labelledby="footer-site">
          <ColTitle id="footer-site">{t("site")}</ColTitle>
          <List>
            <li><Item href="/about/this-page">{t("about_page")}</Item></li>
            <li><Item href="/about/terminos-legales">{t("licenses")}</Item></li>
          </List>
        </nav>
      </Grid>

      <Bottom>
        <p>
          © {year} Eric Lucero González · {t("content")}{" "}
          <a href={CC_URL} target="_blank" rel="license noopener noreferrer">CC BY-NC-SA 4.0</a>
          {" · "}
          {t("code")}{" "}
          <a href={MIT_URL} target="_blank" rel="license noopener noreferrer">MIT</a>
        </p>
        <Stack>
          {t("made_with")}
          <span role="img" aria-label="JavaScript, React, Next.js, next-intl" style={{ display: "inline-flex", gap: "0.35rem" }}>
            <IoLogoJavascript aria-hidden="true" focusable="false" />
            <FaReact aria-hidden="true" focusable="false" />
            <SiNextdotjs aria-hidden="true" focusable="false" />
            <SiI18Next aria-hidden="true" focusable="false" />
          </span>
        </Stack>
      </Bottom>
    </Wrap>
  );
};

export default Footer;
