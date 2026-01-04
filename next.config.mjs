// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";

// Inicializa el plugin de internacionalización
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activa la compresión Gzip/Brotli para los archivos generados
  compress: true,
  // output: "export", // No necesario al usar Vercel y no GithubPages
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
    unoptimized: false,
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

// Envolvemos la configuración con el plugin de i18n
export default withNextIntl(nextConfig);
