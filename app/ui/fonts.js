import localFont from "next/font/local";

export const parkinsans = localFont({
  src: [
    {
      path: "../fonts/Parkinsans-VariableFont_wght.ttf",
      style: "normal",
    },
  ],
  preload: true,
  display: "swap",
  fallback: ["system-ui", "arial"], // fallbacks
});
