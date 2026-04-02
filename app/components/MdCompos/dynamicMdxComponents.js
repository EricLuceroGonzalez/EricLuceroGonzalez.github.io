// components/dynamicMdxComponents.js
import React, { lazy, Suspense } from "react";
import { CitationSup } from "./CitationSup";
// import { ReferenceList } from "./ReferenceList";
import { QuotationAndAuthor } from "./Quotation";
import { useTranslations } from "next-intl";
import { RepoFooter } from "./RepoShare";

const EventCard = lazy(() => import("../EventCard"));
const LazyManim = lazy(() => import("./Videos"));
const ArtemisLiveTracker = lazy(() => import("./ArtemisLiveTracker"));
const BarChart = lazy(() => import("./BarChartsMDX"));
const SorteoMundial = lazy(() => import("./SorteoMundial"));
// Borra el import viejo de DataCard y pon estos dos:
const LazyDataGrid = lazy(() =>
  import("./DataCards").then((mod) => ({ default: mod.DataGrid })),
);
const LazyDataCard = lazy(() =>
  import("./DataCards").then((mod) => ({ default: mod.DataCard })),
);
const LazyDisclaimer = lazy(() => import("./Disclaimer"));
// Borra el const LazyReferenceList viejo y pon estos dos:
const LazyReferenceList = lazy(() =>
  import("./ReferenceList").then((mod) => ({ default: mod.ReferenceList })),
);
const LazyReferenceItem = lazy(() =>
  import("./ReferenceList").then((mod) => ({ default: mod.ReferenceItem })),
);
const LazyPlotlyCharts = lazy(() => import("../PlotlyChart"));

// Wrapper con traducciones
const SorteoMundialWithTranslations = () => {
  const t = useTranslations("sorteo");

  const translations = {
    title: t("title"),
    subtitle: t("subtitle"),
    buttonGenerate: t("buttonGenerate"),
    buttonExecuting: t("buttonExecuting"),
    generation: t("generation"),
    cost: t("cost"),
    validDraw: t("validDraw"),
    approximation: t("approximation"),
    executionTime: t("executionTime"),
    itinerary: t("itinerary"),
    group: t("group"),
    emptyState: t("emptyState"),
    seconds: t("seconds"),
  };

  return (
    <Suspense fallback={<div>Cargando Sorteo Mundial...</div>}>
      <SorteoMundial translations={translations} />
    </Suspense>
  );
};

export const dynamicMdxComponents = {
  Disclaimer: (props) => (
    <Suspense
      fallback={
        <div style={{ padding: "1rem", color: "gray" }}>Cargando notas...</div>
      }
    >
      <LazyDisclaimer {...props} />
    </Suspense>
  ),

  SuperIndex: (props) => <sup {...props}>{props.children}</sup>,

  BarChart: (props) => (
    <Suspense fallback={<div>Cargando...</div>}>
      <BarChart {...props} />
    </Suspense>
  ),

  SorteoMundial: SorteoMundialWithTranslations,
  CitationSup: (props) => <CitationSup id={props.id} />,
  QuoteAndAuthor: (props) => <QuotationAndAuthor {...props} />,
  RepoBadge: (props) => (
    <RepoFooter url={props.url} type={props.type} message={props.message} />
  ),
  Videos: (props) => (
    <LazyManim publicId={props.publicId} caption={props.caption} />
  ),
  // Artemis: (props) => <Artemis {...props} />,
  ArtemisLiveTracker: (props) => <ArtemisLiveTracker {...props} />,
  EventCard: (props) => <EventCard {...props} />,
  PlotlyCharts: (props) => (
    <Suspense fallback={<div>Cargando gráfica interactiva...</div>}>
      <LazyPlotlyCharts {...props} />
    </Suspense>
  ),
  DataGrid: (props) => <LazyDataGrid {...props} />,

  DataCard: (props) => (
    <Suspense
      fallback={
        <div style={{ padding: "2rem", textAlign: "center" }}>
          Cargando dato...
        </div>
      }
    >
      <LazyDataCard {...props} />
    </Suspense>
  ),
  ReferenceList: (props) => (
    <Suspense
      fallback={
        <div style={{ padding: "1rem", color: "gray" }}>
          Cargando lista de referencias...
        </div>
      }
    >
      <LazyReferenceList {...props} />
    </Suspense>
  ),

  ReferenceItem: (props) => (
    <Suspense fallback={<span>Cargando referencia...</span>}>
      <LazyReferenceItem {...props} />
    </Suspense>
  ),
  // PDFViewer: (props) => (
  //   <Suspense fallback={<div>Cargando PDF...</div>}>
  //     <PDFViewer {...props} />
  //   </Suspense>
  // ),
  //   props // Fixed: Added return and Suspense
  // ) => (
  // (
  // <Suspense fallback={<div>Cargando...</div>}>
  // </Suspense>
  // )
  // <Suspense fallback={<div>Cargando...</div>}>
  // </Suspense>;
  //   AnotherComponent: (props) => (
  //     <Suspense fallback={<div>Cargando...</div>}>
  //       <AnotherComponent {...props} />
  //     </Suspense>
  //   ),
};
