// dateUtils.js
export const parseMarkdownDate = (dateString) => {
  if (!dateString) {
    console.warn(
      "\nFecha no definida, usando fecha actual como fallback.(!!)\n"
    );
    return new Date(); // Retorna fecha actual como fallback
  }

  const [year, month, day] = dateString.split("-");
  return new Date(Date.UTC(year, month - 1, day)); // Usar UTC para consistencia
};

export const formatDateForSSR = (dateString, locale = "es") => {
  const date = parseMarkdownDate(dateString);

  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC", // Crucial para consistencia
  });
};
