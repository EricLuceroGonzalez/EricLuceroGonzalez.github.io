// components/dynamicMdxComponents.js
import React, { lazy, Suspense } from "react";
import { CitationSup } from "./CitationSup";
import { ReferenceList } from "./ReferenceList";

const BarChart = lazy(() => import("./BarChartsMDX"));

export const dynamicMdxComponents = {
  SuperIndex: (props) => {
    <sup {...props}>{props.children}</sup>;
  },
  BarChart: (props) => (
    <Suspense fallback={<div>Cargando...</div>}>
      <BarChart {...props} />
    </Suspense>
  ),
  CitationSup: (props) => <CitationSup id={props.id} />,
  // <Suspense fallback={<div>Cargando...</div>}>
  // </Suspense>;
  ReferenceList: (props) => <ReferenceList references={props.references} />,
  //   AnotherComponent: (props) => (
  //     <Suspense fallback={<div>Cargando...</div>}>
  //       <AnotherComponent {...props} />
  //     </Suspense>
  //   ),
};
