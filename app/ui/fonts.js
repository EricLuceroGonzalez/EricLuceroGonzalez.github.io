import localFont from "next/font/local";

export const parkinsans = localFont({
  src: [
    {
      path: "../fonts/Parkinsans-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-parkinsans",
});
