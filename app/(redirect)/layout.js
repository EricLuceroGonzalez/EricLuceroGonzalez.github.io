// app/(redirect)/layout.js
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
export const metadata = {
  title: "Redirigiendo...",
  robots: "noindex, follow", // No queremos que Google indexe esta página de paso
};
