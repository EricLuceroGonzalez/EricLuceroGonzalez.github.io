import { getTranslations } from "next-intl/server";
import ArtemisLiveTracker from "../../components/MdCompos/ArtemisLiveTracker";
import LikeButton from "../../components/Likes"; // Ajusta tu ruta
export async function generateMetadata({ params }) {
  // Esperamos a que se resuelvan los params (requerido en las últimas versiones de Next.js)
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const t = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucero.dev";

  return {
    title: t("artemisTitle"),
    description: t("artemisDesc"),
    openGraph: {
      title: t("artemisTitle"),
      description: t("artemisDesc"),
      url: `https://ericlucero.dev/${locale}/artemis`,
      siteName: "Eric Lucero González",
      locale: locale,
      type: "website",
      images: [
        {
          url: t("artemisThumbnail"),
          width: 1200,
          height: 630,
          alt: t("artemisDesc"), // Texto alternativo traducido
        },
      ],
    },
    alternates: {
      canonical: `https://ericlucero.dev/${locale}/artemis`,
      languages: {
        es: "https://ericlucero.dev/es/artemis",
        en: "https://ericlucero.dev/en/artemis",
      },
    },
  };
}

export default function TrackerPage() {
  return (
    <main>
      <ArtemisLiveTracker />
    </main>
  );
}
