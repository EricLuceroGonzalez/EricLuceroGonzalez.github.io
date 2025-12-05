// components/PDFViewer.jsx
"use client"; // ¡Importante!

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configura el worker de PDF.js (obligatorio)
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PDFViewer({ url }) {
  return (
    <div className="pdf-container">
      <Document file={url}>
        <Page pageNumber={1} width={600} />
      </Document>
    </div>
  );
}
