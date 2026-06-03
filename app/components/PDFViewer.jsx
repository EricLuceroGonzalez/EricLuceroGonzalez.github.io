// components/PDFViewer.jsx
"use client"; // ¡Importante!

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configura el worker de PDF.js (obligatorio)
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();
export default function PDFViewer({ url }) {
  console.log("================================");
  console.log("PDFViewer cargado con URL:", url);
  return (
    <div className="pdf-container">
      <Document file={url}>
        <Page pageNumber={1} width={400} />
      </Document>
    </div>
  );
}
