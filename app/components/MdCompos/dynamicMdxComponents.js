// components/dynamicMdxComponents.js
import React, { lazy, Suspense } from "react";
import { CitationSup } from "./CitationSup";
import { ReferenceList } from "./ReferenceList";
import { QuotationAndAuthor } from "./Quotation";
import { useTranslations } from "next-intl";
import { RepoFooter } from "./RepoShare";

const BarChart = lazy(() => import("./BarChartsMDX"));
const SorteoMundial = lazy(() => import("./SorteoMundial"));
// const PDFViewer = lazy(() => import("../PDFViewer"));

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
  SuperIndex: (props) => {
    <sup {...props}>{props.children}</sup>;
  },
  BarChart: (props) => (
    <Suspense fallback={<div>Cargando...</div>}>
      <BarChart {...props} />
    </Suspense>
  ),
  SorteoMundial: SorteoMundialWithTranslations,
  ReferenceList: (props) => <ReferenceList references={props.references} />,
  CitationSup: (props) => <CitationSup id={props.id} />,
  QuoteAndAuthor: (props) => <QuotationAndAuthor quotation={props.quotation} />,
  RepoBadge: (props) => <RepoFooter url={props.url} type={props.type} />,

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
