import { MainPageBg, PageContainer } from "../../ui/ComponentsStyled";
import { TitlePage, SubSubTitle } from "../../ui/TitlesComponents";
import { Layout } from "../../ui/BasicDivs";
import LatexResourcesSection from "../../components/LatexResourcesSection";
import ShowPath from "../../components/showPath";
import ScrollDiv from "../../components/navigation/ScrollDiv";
import BackgroundDots from "@/app/components/BgMovingDots";
import { getTranslations, setRequestLocale } from "next-intl/server";

const ResourcesPage = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Resources" });

  return (
    <Layout>
      <PageContainer>
        <ScrollDiv />
        <BackgroundDots numDots={70} />
        <ShowPath />
        <MainPageBg
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.25,
            delay: 0.0,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <TitlePage>{t("landing_title")}</TitlePage>
           <SubSubTitle style={{ opacity: 0.75, marginBottom: "1.5rem" }}>
            {t("subtitle")}
          </SubSubTitle>
          <LatexResourcesSection />
        </MainPageBg>
      </PageContainer>
    </Layout>
  );
};

export default ResourcesPage;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Resources" });
  const meta = await getTranslations({ locale, namespace: "Metadata" });
  const URLbase = "https://ericlucero.dev";

  return {
    title: `${t("title")} | Eric Lucero González`,
    description: t("subtitle"),
    alternates: {
      canonical: `${URLbase}/${locale}/recursos`,
      languages: {
        es: `${URLbase}/es/recursos`,
        en: `${URLbase}/en/recursos`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("subtitle"),
      url: `${URLbase}/${locale}/recursos`,
      siteName: "Eric Lucero González",
      images: [{ url: meta("thumbnailImage"), width: 1200, height: 630 }],
      locale,
      type: "website",
    },
  };
}

// En.json
// {
//                 "id": "pentagram",
//                 "title": "Music Staff Paper",
//                 "description": "Printable pentagram / music staff paper generated entirely with LaTeX. Customise stave count and spacing.",
//                 "tag": "Music",
//                 "previewUrl": "https://www.overleaf.com/latex/templates/blank-manuscript-paper/bkpqvfqnnscx",
//                 "comingSoon": false
//             },
//             {
//                 "id": "graph-square",
//                 "title": "Square Graph Paper",
//                 "description": "Classic square-grid paper for maths and engineering. Adjust grid size, margins and colours in the source.",
//                 "tag": "Graph Paper",
//                 "previewUrl": "https://www.overleaf.com/latex/templates/graph-paper/rftmpvdxzhnx",
//                 "comingSoon": false
//             },
//             {
//                 "id": "graph-iso",
//                 "title": "Isometric Graph Paper",
//                 "description": "Triangular isometric grid paper perfect for 3-D sketching and pixel art planning.",
//                 "tag": "Graph Paper",
//                 "comingSoon": true
//             },
//             {
//                 "id": "tikz-circuits",
//                 "title": "TikZ Circuit Diagrams",
//                 "description": "Sample circuit schematics drawn with TikZ and the circuitikz package — ready to copy into your document.",
//                 "tag": "TikZ",
//                 "previewUrl": "https://www.overleaf.com/gallery/tagged/tikz",
//                 "comingSoon": false
//             },
//             {
//                 "id": "tikz-flowchart",
//                 "title": "TikZ Flowchart Template",
//                 "description": "Flowchart with decision nodes, arrows and custom styles. Ideal for algorithms and process diagrams.",
//                 "tag": "TikZ",
//                 "comingSoon": true
//             },
//             {
//                 "id": "beamer-template",
//                 "title": "Minimal Beamer Slides",
//                 "description": "Clean, minimal Beamer presentation template with a custom colour theme. Works out of the box.",
//                 "tag": "Presentation",
//                 "previewUrl": "https://www.overleaf.com/latex/templates/a-minimal-beamer-theme/cvrkmbbjrjmq",
//                 "comingSoon": false
//             }

// es
// {
//                 "id": "pentagram",
//                 "title": "Papel de Pentagramas",
//                 "description": "Papel de pentagramas / pautado musical generado íntegramente con LaTeX. Personaliza el número de pentagramas y el espaciado.",
//                 "tag": "Música",
//                 "previewUrl": "https://www.overleaf.com/latex/templates/blank-manuscript-paper/bkpqvfqnnscx",
//                 "comingSoon": false
//             },
//             {
//                 "id": "graph-square",
//                 "title": "Papel Cuadriculado",
//                 "description": "Papel cuadriculado clásico para matemáticas e ingeniería. Ajusta el tamaño de la cuadrícula, los márgenes y los colores en el fuente.",
//                 "tag": "Papel cuadriculado",
//                 "previewUrl": "https://www.overleaf.com/latex/templates/graph-paper/rftmpvdxzhnx",
//                 "comingSoon": false
//             },
//             {
//                 "id": "graph-iso",
//                 "title": "Papel Isométrico",
//                 "description": "Cuadrícula isométrica triangular, ideal para bocetos 3D y planificación de pixel art.",
//                 "tag": "Papel cuadriculado",
//                 "comingSoon": true
//             },
//             {
//                 "id": "tikz-circuits",
//                 "title": "Circuitos con TikZ",
//                 "description": "Esquemas de circuitos de ejemplo dibujados con TikZ y el paquete circuitikz — listos para copiar en tu documento.",
//                 "tag": "TikZ",
//                 "previewUrl": "https://www.overleaf.com/gallery/tagged/tikz",
//                 "comingSoon": false
//             },
//             {
//                 "id": "tikz-flowchart",
//                 "title": "Diagrama de Flujo con TikZ",
//                 "description": "Diagrama de flujo con nodos de decisión, flechas y estilos personalizados. Ideal para algoritmos y diagramas de proceso.",
//                 "tag": "TikZ",
//                 "comingSoon": true
//             },
//             {
//                 "id": "beamer-template",
//                 "title": "Presentación Beamer Minimalista",
//                 "description": "Plantilla de presentación Beamer limpia y minimalista con un tema de color personalizado. Lista para usar.",
//                 "tag": "Presentación",
//                 "previewUrl": "https://www.overleaf.com/latex/templates/a-minimal-beamer-theme/cvrkmbbjrjmq",
//                 "comingSoon": false
//             }