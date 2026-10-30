import localFont from "next/font/local";

export const parkinsans = localFont({
  src: [
    {
      path: "../fonts/Parkinsans-VariableFont_wght.woff2",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  fallback: ["system-ui", "arial"], // fallbacks
  variable: "--font-parkinsans",
});
