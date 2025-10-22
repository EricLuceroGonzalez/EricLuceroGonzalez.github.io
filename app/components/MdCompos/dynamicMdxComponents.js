// components/dynamicMdxComponents.js
import React, { lazy, Suspense } from "react";
import { CitationSup } from "./CitationSup";
import { ReferenceList } from "./ReferenceList";
import { QuotationAndAuthor } from "./Quotation";

const BarChart = lazy(() => import("./BarChartsMDX"));
// const PDFViewer = lazy(() => import("../PDFViewer"));
export const dynamicMdxComponents = {
  SuperIndex: (props) => {
    <sup {...props}>{props.children}</sup>;
  },
  BarChart: (props) => (
    <Suspense fallback={<div>Cargando...</div>}>
      <BarChart {...props} />
    </Suspense>
  ),
  ReferenceList: (props) => <ReferenceList references={props.references} />,
  CitationSup: (props) => <CitationSup id={props.id} />,
  QuoteAndAuthor: (props) => <QuotationAndAuthor quotation={props.quotation} />,
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
