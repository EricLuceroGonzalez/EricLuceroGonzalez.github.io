// const withMDX = require("@next/mdx");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // <=== enables static exports
  reactStrictMode: true, // Habilita Strict Mode
  transpilePackages: ["next-mdx-remote", "react-pdf"],
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  compiler: {
    styledComponents: true, // Habilita el soporte para styled-components
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Permite imágenes de esta fuente remota
        pathname: "**",
      },
    ],
    // 2. Desactivar optimización de imágenes
    unoptimized: true,
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Evita errores con fs en el navegador
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  }, // 3. ¡ELIMINA o DEJA VACÍOS el basePath y el assetPrefix!
  basePath: "",
  assetPrefix: "",

  trailingSlash: false,
};

module.exports = nextConfig;
// module.exports = withMDX()(nextConfig);
// /**
//  * @type {import('next').NextConfig}
//  * */
// const nextConfig = async () => {
//   const rehypeHighlight = (await import("rehype-highlight")).default;

//   return {
//     pageExtensions: ["js", "ts", "tsx", "md", "mdx"], // Soporta archivos MDX

//     compiler: {
//       styledComponents: true, // Habilita el soporte para styled-components
//     },

//     images: {
//       remotePatterns: [
//         {
//           protocol: "https",
//           hostname: "res.cloudinary.com", // Permite imágenes de esta fuente remota
//           pathname: "**",
//         },
//       ],
//     },

//     webpack: (config) => {
//       config.resolve.fallback = { fs: false }; // Evita errores con fs en el navegador
//       return config;
//     },

//     experimental: {
//       mdxRs: true, // Habilita el runtime MDX experimental
//     },

//     // Configura el plugin rehype para resaltar código
//     withMDX: {
//       extension: /\.mdx$/,
//       options: {
//         rehypePlugins: [rehypeHighlight],
//       },
//     },
//   };
// };

// module.exports = nextConfig();
