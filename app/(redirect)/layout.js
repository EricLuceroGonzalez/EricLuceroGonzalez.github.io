// app/(redirect)/layout.js
import { Analytics } from "@vercel/analytics/next";
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
export const metadata = {
  title: "Redirigiendo...",
  robots: "noindex, follow", // No queremos que Google indexe esta página de paso
};
