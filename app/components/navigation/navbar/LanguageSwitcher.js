"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "../../../../i18n/navigation";
import styled, { keyframes, css } from "styled-components";
import { useTransition } from "react";
import { FaGlobe } from "react-icons/fa";

const LocaleButton = styled.button`
  font-weight: ${(props) => (props.lang == "es" ? "bold" : "normal")};
  background-color: ${(props) =>
    props.lang === "es" ? "var(--accent)" : "var(--gray-medium)"};
  font-size: 11px;
  cursor: pointer;
  padding: 8px;
  border-radius: "8px";
  border: "none";
  color: ${(props) => (props.lang === "en" ? "var(--fg)" : "var(--bg)")};
`;
const SwitchButton = styled.button`
  background-color: transparent;
  color: var(--fg);
  border: 1px solid var(--fg); /* Borde fino del color del texto */
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: monospace; /* Le da un toque técnico/dev */

  &:hover {
    background-color: var(--accent); /* Se llena con tu color acento */
    border-color: var(--accent);
    color: white; /* Texto blanco para contraste */
    transform: translateY(-1px); /* Pequeña elevación */
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    background-color: transparent;
    border-color: var(--gray-medium);
    color: var(--gray-medium);
  }
`;
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const IconWrapper = styled.span`
  display: inline-flex;
  margin-right: 6px;
  ${(props) =>
    props.$isPending &&
    css`
      animation: ${spin} 1s linear infinite;
    `}
  display: ${(props) => (props.$isPending ? "flex" : "none")}
`;
export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const nextLocale = locale === "es" ? "en" : "es";
  const t = useTranslations("Navigation");
  const handleChange = () => {
    // Reemplaza la URL actual con el nuevo idioma
    if (isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <SwitchButton
        onClick={handleChange}
        disabled={isPending}
        title={`${t("language_switch_toggle")} ${
          nextLocale.toUpperCase() == "ES" ? "Español" : "English"
        }`}
      >
        <IconWrapper $isPending={isPending}>
          <FaGlobe />
        </IconWrapper>
        {isPending ? "..." : nextLocale.toUpperCase()}
      </SwitchButton>
    </div>
  );
}
