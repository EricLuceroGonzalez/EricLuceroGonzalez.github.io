// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

// Inicializa el plugin de internacionalización
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Mantenemos tu export estático
  reactStrictMode: true,
  transpilePackages: ["next-mdx-remote", "react-pdf"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
    ],
    unoptimized: true,
  },
  // Configuración de Webpack para evitar errores de librerías de nodo
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  basePath: "",
  assetPrefix: "",
  trailingSlash: false,
};

// Envolvemos tu configuración con el plugin de i18n
export default withNextIntl(nextConfig);

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "export", // <=== enables static exports
//   reactStrictMode: true, // Habilita Strict Mode
//   transpilePackages: ["next-mdx-remote", "react-pdf"],
//   pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
//   compiler: {
//     styledComponents: true, // Habilita el soporte para styled-components
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com", // Permite imágenes de esta fuente remota
//         pathname: "**",
//       },
//     ],
//     // 2. Desactivar optimización de imágenes
//     unoptimized: true,
//   },

//   webpack: (config) => {
//     config.resolve.fallback = { fs: false }; // Evita errores con fs en el navegador
//     config.resolve.alias.canvas = false;
//     config.resolve.alias.encoding = false;
//     return config;
//   }, // 3. ¡ELIMINA o DEJA VACÍOS el basePath y el assetPrefix!
//   basePath: "",
//   assetPrefix: "",

//   trailingSlash: false,
// };

// module.exports = nextConfig;
