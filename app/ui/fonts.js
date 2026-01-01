// import { Parkinsans } from "next/font/google";
// // import localFont from "next/font/local";

// // define your variable fonts
// // const inter = Inter({ subsets: ["latin"], display: "swap" });
// // const lora = Lora({ subsets: ["latin"], display: "swap" });
// const parkisans = Parkinsans({
//   display: "swap",
//   subsets: ["latin"],
//   // adjustFontFallback: false,
// });
// // const alexandria = Alexandria({
// //   subsets: ["latin"],
// //   display: "swap",
// //   variable: "--font-alexandria",
// // });

// export { parkisans };
// // En lugar de importar desde 'next/font/google'
import localFont from "next/font/local";

export const parkinsans = localFont({
  src: [
    {
      path: "../public/fonts/Parkinsans-VariableFont_wght.ttf", // Ajusta la ruta según donde guardaste el archivo
      style: "normal",
    },
    // Si tuvieras un archivo separado para italic, lo agregarías aquí
  ],
  display: "swap",
  variable: "--font-parkinsans", // Si usas variables CSS
});
