"use client";
import { setRequestLocale } from "next-intl/server";
import { useEffect, useState } from "react";

const DateDisplay = ({ isoDate, defaultFormatted, locale }) => {
  const [formattedDate, setFormattedDate] = useState(defaultFormatted);

  useEffect(() => {
    const updateDate = () => {
      try {
        // TODO: Habilitar en internacionalización
        // const userLocale = navigator.language || "es";
        // setRequestLocale(locale);
        const userLocale = locale || "es";
        const formatter = new Intl.DateTimeFormat(userLocale, {
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "UTC",
        });

        setFormattedDate(formatter.format(new Date(isoDate)));
      } catch {
        setFormattedDate(defaultFormatted);
      }
    };

    updateDate();
    window.addEventListener("languagechange", updateDate); // Detecta cambios de idioma

    return () => window.removeEventListener("languagechange", updateDate);
  }, [isoDate, defaultFormatted]);

  return (
    <time
      dateTime={isoDate}
      className="date-display"
      suppressHydrationWarning // Solo si es absolutamente necesario
    >
      {formattedDate}
    </time>
  );
};

export default DateDisplay;
