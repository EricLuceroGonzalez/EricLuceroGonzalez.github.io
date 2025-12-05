import { Parkinsans } from "next/font/google";
// import localFont from "next/font/local";

// define your variable fonts
// const inter = Inter({ subsets: ["latin"], display: "swap" });
// const lora = Lora({ subsets: ["latin"], display: "swap" });
const parkisans = Parkinsans({
  display: "swap",
  adjustFontFallback: false,
  subsets: ["latin"],
});
// const alexandria = Alexandria({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-alexandria",
// });

export { parkisans };
