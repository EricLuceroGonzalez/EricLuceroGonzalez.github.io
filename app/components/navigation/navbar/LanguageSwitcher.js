"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "../../../../i18n/navigation"; // Importa desde TU archivo creado en Paso 1

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale) => {
    // Reemplaza la URL actual con el nuevo idioma
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "5px",
      }}
    >
      <button
        disabled={locale === "es"}
        onClick={() => handleChange("es")}
        style={{
          fontWeight: locale === "es" ? "bold" : "normal",
          cursor: "pointer",
          padding: "8px",
          fontSize: "11px",
          backgroundColor:
            locale === "es" ? "var(--accent)" : "var(--gray-medium)",
          color: locale === "en" ? "var(--fg)" : "var(--bg)",
          borderRadius: "8px",
          borderColor: "none",
        }}
      >
        ES
      </button>
      {/* <span style={{ fontSize: "17px" }}>|</span> */}
      <button
        disabled={locale === "en"}
        onClick={() => handleChange("en")}
        style={{
          fontWeight: locale === "en" ? "bold" : "normal",
          cursor: "pointer",
          padding: "8px",
          fontSize: locale === "en" ? "10px" : "11px",
          backgroundColor:
            locale === "en" ? "var(--accent)" : "var(--gray-medium)",
          color: locale === "en" ? "var(--bg)" : "var(--fg)",
          borderRadius: "8px",
          borderColor: "none",
        }}
      >
        EN
      </button>
    </div>
  );
}
